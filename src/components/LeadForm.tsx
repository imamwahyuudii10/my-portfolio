import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { createClient } from "@supabase/supabase-js";

import {
  AlertCircle,
  ArrowLeft,
  BrainCircuit,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  Filter,
  Loader2,
  Mail,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  Trash2,
  UserCheck,
  Users,
  Workflow,
  X,
} from "lucide-react";

/* ===============================================================
   SUPABASE
================================================================ */

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(
        supabaseUrl,
        supabaseAnonKey
      )
    : null;

/* ===============================================================
   TYPES
================================================================ */

interface Lead {
  id: string;

  first_name?: string;
  last_name?: string;

  email: string;

  company_name?: string;
  company_domain?: string;

  source?: string;

  status?: string;

  ai_score?: number;

  ai_qualification_reason?: string;

  icp_fit?: boolean;

  approval_status?: string;

  personalized_email_body?: string;

  created_at?: string;
}

type Notice = {
  type: "success" | "error";
  message: string;
};

/* ===============================================================
   HELPERS
================================================================ */

function normalizeStatus(
  lead: Lead
): string {
  return (
    lead.approval_status ||
    lead.status ||
    "UNKNOWN"
  ).toUpperCase();
}

function isLeadPending(
  lead: Lead
): boolean {
  const approvalStatus =
    lead.approval_status?.toUpperCase();

  if (approvalStatus) {
    return approvalStatus === "PENDING";
  }

  const status =
    lead.status?.toUpperCase();

  return (
    status === "PENDING" ||
    status === "NEW"
  );
}

function isLeadApproved(
  lead: Lead
): boolean {
  const status =
    normalizeStatus(lead);

  return (
    status === "APPROVED" ||
    status === "SENT"
  );
}

function getLeadName(
  lead: Lead
): string {
  const name =
    `${lead.first_name || ""} ${
      lead.last_name || ""
    }`.trim();

  return name || "Unnamed lead";
}

function formatDate(
  value?: string
): string {
  if (!value) {
    return "—";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en",
    {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
}

/* ===============================================================
   MAIN COMPONENT
================================================================ */

export default function AdminDashboard() {
  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [loadingId, setLoadingId] =
    useState<string | null>(null);

  const [notice, setNotice] =
    useState<Notice | null>(null);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [selectedLead, setSelectedLead] =
    useState<Lead | null>(null);

  /* =============================================================
     FETCH LEADS
  ============================================================= */

  async function fetchLeads() {
    setLoading(true);

    try {
      if (!supabase) {
        throw new Error(
          "Supabase is not configured."
        );
      }

      const {
        data,
        error,
      } = await supabase
        .from("leads")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (error) {
        throw error;
      }

      setLeads(
        data || []
      );
    } catch (error) {
      console.error(
        "Error fetching leads:",
        error
      );

      setNotice({
        type: "error",
        message:
          "Unable to load leads. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  /* =============================================================
     APPROVE
  ============================================================= */

  async function handleApprove(
    leadId: string
  ) {
    setLoadingId(leadId);
    setNotice(null);

    try {
      const webhookUrl =
        import.meta.env
          .VITE_N8N_APPROVAL_WEBHOOK_URL;

      if (!webhookUrl) {
        throw new Error(
          "Approval webhook is not configured."
        );
      }

      /*
       * IMPORTANT:
       *
       * Frontend tidak mengubah Supabase menjadi SENT.
       *
       * Alurnya:
       *
       * Admin
       *   ↓
       * n8n Approval Webhook
       *   ↓
       * Get Lead
       *   ↓
       * Validate PENDING
       *   ↓
       * Gmail Send
       *   ↓
       * Update Supabase = SENT
       */

      const response =
        await fetch(
          webhookUrl,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                lead_id:
                  leadId,
              }),
          }
        );

      let result:
        | {
            success?: boolean;
            message?: string;
          }
        | undefined;

      try {
        result =
          await response.json();
      } catch {
        result =
          undefined;
      }

      if (!response.ok) {
        throw new Error(
          result?.message ||
            `Approval failed (${response.status}).`
        );
      }

      if (
        result &&
        result.success === false
      ) {
        throw new Error(
          result.message ||
            "Approval failed."
        );
      }

      setNotice({
        type: "success",
        message:
          result?.message ||
          "Lead approved and email sent successfully.",
      });

      await fetchLeads();

      setSelectedLead(null);
    } catch (error) {
      console.error(
        "Approval error:",
        error
      );

      setNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to approve this lead.",
      });
    } finally {
      setLoadingId(null);
    }
  }

  /* =============================================================
     DELETE
  ============================================================= */

  async function handleDelete(
    leadId: string
  ) {
    const confirmed =
      window.confirm(
        "Delete this lead permanently?"
      );

    if (!confirmed) {
      return;
    }

    setLoadingId(leadId);
    setNotice(null);

    try {
      if (!supabase) {
        throw new Error(
          "Supabase is not configured."
        );
      }

      const {
        data,
        error,
      } = await supabase
        .from("leads")
        .delete()
        .eq(
          "id",
          leadId
        )
        .select("id");

      if (error) {
        throw error;
      }

      if (!data?.length) {
        throw new Error(
          "Delete was blocked. Check your Supabase RLS policy."
        );
      }

      setLeads(
        (current) =>
          current.filter(
            (lead) =>
              lead.id !==
              leadId
          )
      );

      if (
        selectedLead?.id ===
        leadId
      ) {
        setSelectedLead(null);
      }

      setNotice({
        type: "success",
        message:
          "Lead deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Delete error:",
        error
      );

      setNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to delete lead.",
      });
    } finally {
      setLoadingId(null);
    }
  }

  /* =============================================================
     FILTER
  ============================================================= */

  const filteredLeads =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return leads.filter(
        (lead) => {
          const status =
            normalizeStatus(
              lead
            );

          const matchesStatus =
            statusFilter ===
              "ALL" ||
            status ===
              statusFilter;

          if (!matchesStatus) {
            return false;
          }

          if (!query) {
            return true;
          }

          const haystack = [
            getLeadName(
              lead
            ),
            lead.email,
            lead.company_name,
            lead.company_domain,
            lead.source,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return haystack.includes(
            query
          );
        }
      );
    }, [
      leads,
      search,
      statusFilter,
    ]);

  /* =============================================================
     STATS
  ============================================================= */

  const stats =
    useMemo(() => {
      const pending =
        leads.filter(
          (lead) =>
            isLeadPending(
              lead
            )
        ).length;

      const sent =
        leads.filter(
          (lead) =>
            isLeadApproved(
              lead
            )
        ).length;

      const qualified =
        leads.filter(
          (lead) =>
            lead.icp_fit === true
        ).length;

      const averageScore =
        leads.length
          ? Math.round(
              leads.reduce(
                (
                  total,
                  lead
                ) =>
                  total +
                  (lead.ai_score ||
                    0),
                0
              ) /
                leads.length
            )
          : 0;

      return {
        total:
          leads.length,
        pending,
        sent,
        qualified,
        averageScore,
      };
    }, [leads]);

  /* =============================================================
     UI
  ============================================================= */

  return (
    <div className="min-h-screen bg-[#070B12] text-white">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(79,70,229,0.10),transparent_35%)]"
      />

      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <header className="relative border-b border-white/10 bg-[#070B12]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/20">
              <Workflow className="h-4.5 w-4.5 text-white" />
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight text-white">
                Meridian
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/50">
                Revenue operations
              </p>
            </div>
          </div>

          <a
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/80 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />

            Back to website
          </a>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1500px] px-5 py-8 lg:px-8 lg:py-10">
        {/* =========================================================
            HEADING
        ========================================================= */}

        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.17em] text-indigo-300">
              <UserCheck className="h-3 w-3" />

              Human approval center
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Lead review &amp; outreach control
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
              Review AI-qualified opportunities and approve outreach before any message reaches a prospect.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchLeads}
            disabled={loading}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.08] disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${
                loading
                  ? "animate-spin"
                  : ""
              }`}
            />

            Refresh leads
          </button>
        </div>

        {/* =========================================================
            METRICS
        ========================================================= */}

        <div className="mt-9 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard
            icon={Users}
            label="Total leads"
            value={stats.total}
          />

          <MetricCard
            icon={Clock3}
            label="Awaiting approval"
            value={stats.pending}
            accent="amber"
          />

          <MetricCard
            icon={BrainCircuit}
            label="ICP qualified"
            value={stats.qualified}
            accent="indigo"
          />

          <MetricCard
            icon={Send}
            label="Outreach sent"
            value={stats.sent}
            accent="emerald"
          />
        </div>

        {/* =========================================================
            NOTICE
        ========================================================= */}

        {notice && (
          <div
            role="alert"
            className={`mt-6 flex items-start justify-between gap-4 rounded-xl border px-4 py-3.5 text-sm ${
              notice.type ===
              "success"
                ? "border-emerald-400/30 bg-emerald-500/10 text-white"
                : "border-red-400/30 bg-red-500/10 text-white"
            }`}
          >
            <div className="flex items-start gap-3">
              {notice.type ===
              "success" ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              )}

              <span className="font-medium">
                {notice.message}
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                setNotice(null)
              }
              aria-label="Dismiss notification"
              className="text-white/60 transition hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* =========================================================
            SEARCH + FILTER
        ========================================================= */}

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search name, email or company..."
              className="w-full rounded-xl border border-white/10 bg-[#080D16] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <div className="relative">
            <Filter className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
              className="appearance-none rounded-xl border border-white/10 bg-[#080D16] py-2.5 pl-9 pr-9 text-sm text-white outline-none focus:border-indigo-400/50"
            >
              <option value="ALL">
                All statuses
              </option>

              <option value="PENDING">
                Pending
              </option>

              <option value="APPROVED">
                Approved
              </option>

              <option value="SENT">
                Sent
              </option>

              <option value="REJECTED">
                Rejected
              </option>
            </select>
          </div>
        </div>

        {/* =========================================================
            TABLE
        ========================================================= */}

        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1019] shadow-2xl shadow-black/20">
          {loading ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />

              <p className="mt-4 text-sm font-medium text-white/80">
                Loading lead pipeline...
              </p>

              <p className="mt-1 text-xs text-white/45">
                Syncing latest data
              </p>
            </div>
          ) : filteredLeads.length ===
            0 ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <Users className="h-5 w-5 text-white/50" />
              </div>

              <p className="mt-4 text-sm font-semibold text-white">
                No leads found
              </p>

              <p className="mt-2 max-w-sm text-xs leading-5 text-white/50">
                Try adjusting your search or status filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left">
                <thead className="border-b border-white/10 bg-white/[0.025]">
                  <tr className="text-[10px] font-bold uppercase tracking-[0.13em] text-white/65">
                    <th className="px-5 py-4">
                      Lead
                    </th>

                    <th className="px-5 py-4">
                      Company
                    </th>

                    <th className="px-5 py-4 text-center">
                      Score
                    </th>

                    <th className="px-5 py-4 text-center">
                      ICP Fit
                    </th>

                    <th className="px-5 py-4">
                      Status
                    </th>

                    <th className="px-5 py-4">
                      Source
                    </th>

                    <th className="px-5 py-4">
                      Created
                    </th>

                    <th className="px-5 py-4 text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.07]">
                  {filteredLeads.map(
                    (lead) => {
                      const status =
                        normalizeStatus(
                          lead
                        );

                      const pending =
                        isLeadPending(
                          lead
                        );

                      const approved =
                        isLeadApproved(
                          lead
                        );

                      return (
                        <tr
                          key={lead.id}
                          onClick={() =>
                            setSelectedLead(
                              lead
                            )
                          }
                          className="group cursor-pointer transition-colors hover:bg-white/[0.035]"
                        >
                          {/* Lead */}
                          <td className="px-5 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xs font-bold text-indigo-300">
                                {(
                                  lead.first_name?.[0] ||
                                  lead.email[0]
                                ).toUpperCase()}
                              </div>

                              <div>
                                <p className="whitespace-nowrap text-sm font-semibold text-white">
                                  {getLeadName(
                                    lead
                                  )}
                                </p>

                                <p className="mt-1 whitespace-nowrap text-xs text-white/55">
                                  {lead.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Company */}
                          <td className="px-5 py-5">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-3.5 w-3.5 text-white/40" />

                              <span className="whitespace-nowrap text-sm font-medium text-white/80">
                                {lead.company_name ||
                                  "—"}
                              </span>
                            </div>
                          </td>

                          {/* Score */}
                          <td className="px-5 py-5 text-center">
                            <ScoreBadge
                              score={
                                lead.ai_score
                              }
                            />
                          </td>

                          {/* ICP */}
                          <td className="px-5 py-5 text-center">
                            {lead.icp_fit ===
                            true ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                                <Check className="h-3 w-3 text-emerald-400" />

                                Match
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white/70">
                                No fit
                              </span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="px-5 py-5">
                            <StatusBadge
                              status={
                                status
                              }
                            />
                          </td>

                          {/* Source */}
                          <td className="px-5 py-5">
                            <span className="text-xs font-medium capitalize text-white/70">
                              {lead.source ||
                                "—"}
                            </span>
                          </td>

                          {/* Created */}
                          <td className="px-5 py-5">
                            <div className="flex items-center gap-2 whitespace-nowrap text-xs text-white/60">
                              <Clock3 className="h-3.5 w-3.5" />

                              {formatDate(
                                lead.created_at
                              )}
                            </div>
                          </td>

                          {/* Action */}
                          <td
                            className="px-5 py-5"
                            onClick={(
                              event
                            ) =>
                              event.stopPropagation()
                            }
                          >
                            <div className="flex items-center justify-end gap-2">
                              {pending ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleApprove(
                                      lead.id
                                    )
                                  }
                                  disabled={
                                    loadingId ===
                                    lead.id
                                  }
                                  className="inline-flex min-w-[105px] items-center justify-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {loadingId ===
                                  lead.id ? (
                                    <>
                                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                      Processing
                                    </>
                                  ) : (
                                    <>
                                      <UserCheck className="h-3.5 w-3.5" />
                                      Approve
                                    </>
                                  )}
                                </button>
                              ) : approved ? (
                                <div className="inline-flex min-w-[105px] items-center justify-center gap-1.5 rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-white">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />

                                  Approved
                                </div>
                              ) : (
                                <div className="inline-flex min-w-[105px] items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white">
                                  {status}
                                </div>
                              )}

                              <button
                                type="button"
                                aria-label={`Delete ${getLeadName(
                                  lead
                                )}`}
                                onClick={() =>
                                  handleDelete(
                                    lead.id
                                  )
                                }
                                disabled={
                                  loadingId ===
                                  lead.id
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}

          {!loading && (
            <div className="flex flex-col gap-2 border-t border-white/10 bg-white/[0.02] px-5 py-4 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Showing{" "}
                {
                  filteredLeads.length
                }{" "}
                of {leads.length} leads
              </span>

              <span>
                Average AI score:{" "}
                <strong className="font-semibold text-white">
                  {
                    stats.averageScore
                  }
                </strong>
              </span>
            </div>
          )}
        </div>
      </main>

      {/* =========================================================
          LEAD DRAWER
      ========================================================= */}

      {selectedLead && (
        <LeadDrawer
          lead={selectedLead}
          loading={
            loadingId ===
            selectedLead.id
          }
          onClose={() =>
            setSelectedLead(null)
          }
          onApprove={() =>
            handleApprove(
              selectedLead.id
            )
          }
        />
      )}
    </div>
  );
}

/* ===============================================================
   METRIC CARD
================================================================ */

function MetricCard({
  icon: Icon,
  label,
  value,
  accent = "default",
}: {
  icon: typeof Users;
  label: string;
  value: number;
  accent?:
    | "default"
    | "amber"
    | "indigo"
    | "emerald";
}) {
  const iconStyles = {
    default:
      "bg-white/[0.05] text-white",
    amber:
      "bg-amber-500/10 text-amber-300",
    indigo:
      "bg-indigo-500/10 text-indigo-300",
    emerald:
      "bg-emerald-500/10 text-emerald-300",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconStyles[accent]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <Sparkles className="h-3.5 w-3.5 text-white/20" />
      </div>

      <p className="mt-5 text-2xl font-bold tracking-tight text-white">
        {value}
      </p>

      <p className="mt-1 text-xs font-medium text-white/65">
        {label}
      </p>
    </div>
  );
}

/* ===============================================================
   SCORE BADGE
================================================================ */

function ScoreBadge({
  score,
}: {
  score?: number;
}) {
  if (
    score === undefined ||
    score === null
  ) {
    return (
      <span className="text-xs text-white/50">
        —
      </span>
    );
  }

  let style =
    "border-white/10 bg-white/[0.04] text-white";

  if (score >= 80) {
    style =
      "border-emerald-400/25 bg-emerald-500/10 text-emerald-300";
  } else if (score >= 60) {
    style =
      "border-amber-400/25 bg-amber-500/10 text-amber-300";
  } else {
    style =
      "border-red-400/25 bg-red-500/10 text-red-300";
  }

  return (
    <span
      className={`inline-flex min-w-[44px] items-center justify-center rounded-lg border px-2.5 py-1.5 text-xs font-bold ${style}`}
    >
      {score}
    </span>
  );
}

/* ===============================================================
   STATUS BADGE
================================================================ */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  let style =
    "border-white/10 bg-white/[0.04] text-white";

  let dot =
    "bg-white/50";

  if (
    status === "PENDING" ||
    status === "NEW"
  ) {
    style =
      "border-amber-400/25 bg-amber-500/10 text-white";

    dot =
      "bg-amber-400";
  }

  if (
    status === "APPROVED"
  ) {
    style =
      "border-indigo-400/25 bg-indigo-500/10 text-white";

    dot =
      "bg-indigo-400";
  }

  if (
    status === "SENT"
  ) {
    style =
      "border-emerald-400/25 bg-emerald-500/10 text-white";

    dot =
      "bg-emerald-400";
  }

  if (
    status === "REJECTED"
  ) {
    style =
      "border-red-400/25 bg-red-500/10 text-white";

    dot =
      "bg-red-400";
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide ${style}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dot}`}
      />

      {status}
    </span>
  );
}

/* ===============================================================
   LEAD DRAWER
================================================================ */

function LeadDrawer({
  lead,
  loading,
  onClose,
  onApprove,
}: {
  lead: Lead;
  loading: boolean;
  onClose: () => void;
  onApprove: () => void;
}) {
  const status =
    normalizeStatus(
      lead
    );

  const pending =
    isLeadPending(
      lead
    );

  const approved =
    isLeadApproved(
      lead
    );

  return (
    <>
      <button
        type="button"
        aria-label="Close lead details"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
      />

      <aside className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#0A0F18] shadow-2xl shadow-black/60">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0A0F18]/95 px-6 py-5 backdrop-blur-xl">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-400">
              Lead review
            </p>

            <h2 className="mt-1 text-lg font-bold text-white">
              {getLeadName(
                lead
              )}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-3">
            <DetailMetric
              label="AI score"
              value={
                lead.ai_score?.toString() ||
                "—"
              }
            />

            <DetailMetric
              label="ICP fit"
              value={
                lead.icp_fit
                  ? "High fit"
                  : "Not matched"
              }
            />

            <DetailMetric
              label="Status"
              value={
                status
              }
            />

            <DetailMetric
              label="Source"
              value={
                lead.source ||
                "—"
              }
            />
          </div>

          {/* Contact */}
          <DrawerSection
            title="Contact"
            icon={Mail}
          >
            <InfoRow
              label="Email"
              value={
                lead.email
              }
            />

            <InfoRow
              label="Company"
              value={
                lead.company_name ||
                "—"
              }
            />

            <InfoRow
              label="Domain"
              value={
                lead.company_domain ||
                "—"
              }
            />
          </DrawerSection>

          {/* AI */}
          <DrawerSection
            title="AI qualification"
            icon={BrainCircuit}
          >
            <p className="text-sm leading-6 text-white/75">
              {lead.ai_qualification_reason ||
                "No AI qualification explanation available."}
            </p>
          </DrawerSection>

          {/* Draft */}
          <DrawerSection
            title="Personalized outreach"
            icon={Sparkles}
          >
            <div className="rounded-xl border border-white/10 bg-[#070B12] p-4">
              <p className="whitespace-pre-wrap text-sm leading-6 text-white/75">
                {lead.personalized_email_body ||
                  "No outreach draft available."}
              </p>
            </div>
          </DrawerSection>

          {/* Decision */}
          <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/[0.06] p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
                <UserCheck className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Human checkpoint
                </p>

                <p className="mt-1 text-xs leading-5 text-white/60">
                  Outreach is only triggered after your approval.
                </p>
              </div>
            </div>

            {pending ? (
              <button
                type="button"
                onClick={
                  onApprove
                }
                disabled={
                  loading
                }
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />

                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />

                    Approve &amp; Send
                  </>
                )}
              </button>
            ) : approved ? (
              <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-500/10 py-3 text-sm font-semibold text-white">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                Approved
              </div>
            ) : (
              <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-semibold text-white">
                {status}
              </div>
            )}
          </div>

          <p className="text-center text-[10px] leading-5 text-white/35">
            Lead ID:{" "}
            {lead.id}
          </p>
        </div>
      </aside>
    </>
  );
}

/* ===============================================================
   DRAWER HELPERS
================================================================ */

function DetailMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function DrawerSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Mail;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-indigo-400" />

        <h3 className="text-xs font-semibold uppercase tracking-[0.13em] text-white/70">
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-white/[0.07] py-3 first:pt-0 last:border-0 last:pb-0">
      <span className="text-xs text-white/50">
        {label}
      </span>

      <span className="max-w-[70%] break-all text-right text-xs font-medium text-white/80">
        {value}
      </span>
    </div>
  );
}