import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Clock3,
  Database,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Workflow,
  X,
  Zap,
} from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import LeadForm from "./components/LeadForm";
import AdminDashboard from "./components/AdminDashboard";

const FRICTION_POINTS = [
  "Leads sit unanswered for hours or days",
  "Manual qualification consumes your team's time",
  "Follow-ups are easy to miss",
  "No clear visibility from lead to outreach",
];

const SOLUTION_POINTS = [
  "Leads are qualified automatically within seconds",
  "Your team reviews recommendations instead of researching every lead",
  "Qualified leads are routed into a consistent follow-up process",
  "Every lead has a clear status and activity trail",
];

const LEAD_ROWS = [
  {
    name: "Budi Santoso",
    company: "TechCorp Indonesia",
    score: 88,
    status: "PENDING",
    source: "Website",
    time: "2m ago",
  },
  {
    name: "Sarah Miller",
    company: "Nexus Labs",
    score: 94,
    status: "APPROVED",
    source: "Website",
    time: "5m ago",
  },
  {
    name: "Daniel Carter",
    company: "Northstar",
    score: 76,
    status: "REVIEW",
    source: "Landing page",
    time: "11m ago",
  },
];

const FOOTER_LINKS: { heading: string; links: string[] }[] = [
  {
    heading: "Product",
    links: ["Overview", "How It Works", "Pricing", "Security"],
  },
  {
    heading: "Solutions",
    links: ["Sales Teams", "Revenue Operations", "Agencies"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "Guides", "API Reference", "Status"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Contact"],
  },
];

function StatusBadge({
  status,
}: {
  status: "PENDING" | "APPROVED" | "REVIEW";
}) {
  const styles = {
    PENDING:
      "border-amber-500/20 bg-amber-500/10 text-amber-300",
    APPROVED:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    REVIEW:
      "border-blue-500/20 bg-blue-500/10 text-blue-300",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-1 text-[10px] font-semibold tracking-wide ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function App() {
  if (window.location.pathname === "/admin") {
    return (
      <div className="min-h-screen bg-slate-950 py-10 text-slate-100">
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div
      id="top"
      className="min-h-screen bg-[#090D16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white"
    >
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Global ambient lighting */}
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden">
          <div className="mx-auto h-[850px] max-w-7xl bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.14),transparent_55%)]" />
        </div>

        {/* =========================================================
            HERO
        ========================================================= */}
        <Hero />

        {/* =========================================================
            TRUST / METRICS
        ========================================================= */}
        <section className="border-y border-slate-800/70 bg-[#0B101B]">
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
            <div className="grid grid-cols-2 divide-x divide-slate-800/70 md:grid-cols-4">
              <div className="px-5 text-center md:px-8">
                <p className="text-2xl font-bold tracking-tight text-white">
                  Seconds
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  From submission to qualification
                </p>
              </div>

              <div className="px-5 text-center md:px-8">
                <p className="text-2xl font-bold tracking-tight text-white">
                  AI-powered
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Lead qualification & drafting
                </p>
              </div>

              <div className="px-5 text-center md:px-8">
                <p className="text-2xl font-bold tracking-tight text-white">
                  Human-led
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Approval before outreach
                </p>
              </div>

              <div className="px-5 text-center md:px-8">
                <p className="text-2xl font-bold tracking-tight text-white">
                  24/7
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Automated workflow availability
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PROBLEM
        ========================================================= */}
        <section
          id="product"
          className="relative scroll-mt-20 overflow-hidden bg-[#090D16] py-28 sm:py-36"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>The revenue gap</span>
              </div>

              <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Your leads
                <span className="text-slate-500"> shouldn't have to wait.</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                Every hour between a lead submission and a meaningful
                follow-up creates another opportunity for interest to fade.
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-2">
              {/* Problem */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#0D131F] p-8 sm:p-10">
                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-red-500/5 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
                      <X className="h-5 w-5" strokeWidth={2.5} />
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-widest text-red-400/80">
                        Without automation
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-white">
                        Revenue leaks between steps
                      </h3>
                    </div>
                  </div>

                  <div className="mt-10 space-y-5">
                    {FRICTION_POINTS.map((point, index) => (
                      <div
                        key={point}
                        className="flex items-start gap-4 border-b border-slate-800/70 pb-5 last:border-0 last:pb-0"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-semibold text-red-400">
                          0{index + 1}
                        </span>

                        <p className="text-sm leading-6 text-slate-400">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Solution */}
              <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/50 via-[#101628] to-[#0D131F] p-8 shadow-2xl shadow-indigo-950/30 sm:p-10">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                      <Check className="h-5 w-5" strokeWidth={2.5} />
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-widest text-emerald-400/80">
                        With automation
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-white">
                        Every step stays connected
                      </h3>
                    </div>
                  </div>

                  <div className="mt-10 space-y-5">
                    {SOLUTION_POINTS.map((point, index) => (
                      <div
                        key={point}
                        className="flex items-start gap-4 border-b border-indigo-500/10 pb-5 last:border-0 last:pb-0"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                          <Check className="h-3.5 w-3.5" />
                        </span>

                        <p className="text-sm leading-6 text-slate-300">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            AI + HUMAN APPROVAL
        ========================================================= */}
        <section className="relative overflow-hidden border-y border-slate-800/70 bg-[#060A12] py-28 sm:py-36">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Copy */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-300">
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>Human-in-the-loop</span>
                </div>

                <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  AI does the work.
                  <span className="block text-slate-500">
                    Your team stays in control.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
                  Automation handles the repetitive work while your team keeps
                  the final say before anything reaches a prospect.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                      <Bot className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        AI qualification
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Evaluate fit, priority, and intent automatically.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                      <UserCheck className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Human approval
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Review the recommendation before outreach happens.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Approval UI */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-indigo-500/5 blur-2xl" />

                <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[#0D131F] shadow-2xl">
                  {/* Window header */}
                  <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    </div>

                    <span className="text-[11px] font-medium text-slate-500">
                      Lead review
                    </span>
                  </div>

                  <div className="p-6 sm:p-8">
                    {/* Lead header */}
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
                            <Workflow className="h-5 w-5" />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-white">
                              Budi Santoso
                            </p>
                            <p className="text-xs text-slate-500">
                              TechCorp Indonesia
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-right">
                        <p className="text-[10px] uppercase tracking-wider text-emerald-400/70">
                          AI score
                        </p>
                        <p className="mt-0.5 text-xl font-bold text-emerald-300">
                          88
                        </p>
                      </div>
                    </div>

                    {/* Qualification */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                        <p className="text-[10px] uppercase tracking-wider text-slate-500">
                          ICP fit
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          High
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                        <p className="text-[10px] uppercase tracking-wider text-slate-500">
                          Priority
                        </p>
                        <p className="mt-1 text-sm font-semibold text-amber-300">
                          Hot
                        </p>
                      </div>
                    </div>

                    {/* Email draft */}
                    <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-300">
                          Personalized email draft
                        </p>

                        <span className="inline-flex items-center gap-1.5 text-[10px] text-indigo-300">
                          <Sparkles className="h-3 w-3" />
                          AI generated
                        </span>
                      </div>

                      <div className="mt-4 space-y-2 text-xs leading-5 text-slate-500">
                        <p>Hi Budi,</p>

                        <p>
                          I noticed TechCorp is exploring ways to improve its
                          lead workflow...
                        </p>

                        <p>
                          I thought this might be relevant to your team.
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        className="flex-1 rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800"
                      >
                        Edit draft
                      </button>

                      <button
                        type="button"
                        className="flex-1 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
                      >
                        Approve & Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PRODUCT DASHBOARD PREVIEW
        ========================================================= */}
        <section className="relative overflow-hidden bg-[#090D16] py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                One source of truth
              </p>

              <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Your entire lead workflow.
                <span className="block text-slate-500">
                  One intelligent system.
                </span>
              </h2>

              <p className="mt-6 text-base leading-7 text-slate-400 sm:text-lg">
                See every lead, score, status, and activity in one place —
                from the moment a form is submitted to the moment outreach is
                sent.
              </p>
            </div>

            {/* Dashboard mockup */}
            <div className="relative mx-auto mt-16 max-w-6xl">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-indigo-500/5 blur-3xl" />

              <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-800 bg-[#0D131F] shadow-2xl">
                {/* Top bar */}
                <div className="flex flex-col gap-4 border-b border-slate-800 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Lead pipeline
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Monitor and review incoming opportunities
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <div className="rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 text-xs text-slate-400">
                      All leads
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 text-xs text-slate-400">
                      This week
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 divide-x divide-y divide-slate-800 border-b border-slate-800 sm:grid-cols-4 sm:divide-y-0">
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Database className="h-3.5 w-3.5" />
                      <span className="text-[11px] uppercase tracking-wider">
                        Total leads
                      </span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-white">128</p>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Zap className="h-3.5 w-3.5" />
                      <span className="text-[11px] uppercase tracking-wider">
                        Qualified
                      </span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-white">76</p>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-slate-500">
                      <UserCheck className="h-3.5 w-3.5" />
                      <span className="text-[11px] uppercase tracking-wider">
                        Pending
                      </span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-white">14</p>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Mail className="h-3.5 w-3.5" />
                      <span className="text-[11px] uppercase tracking-wider">
                        Contacted
                      </span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-white">62</p>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left">
                    <thead className="border-b border-slate-800 bg-slate-950/30">
                      <tr className="text-[10px] uppercase tracking-wider text-slate-500">
                        <th className="px-6 py-4 font-medium">Lead</th>
                        <th className="px-6 py-4 font-medium">Score</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Source</th>
                        <th className="px-6 py-4 font-medium">Activity</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-800/80">
                      {LEAD_ROWS.map((lead) => (
                        <tr
                          key={lead.name}
                          className="transition hover:bg-slate-800/20"
                        >
                          <td className="px-6 py-5">
                            <div>
                              <p className="text-sm font-medium text-white">
                                {lead.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {lead.company}
                              </p>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <span className="text-sm font-semibold text-white">
                              {lead.score}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <StatusBadge status={lead.status as any} />
                          </td>

                          <td className="px-6 py-5 text-xs text-slate-400">
                            {lead.source}
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Clock3 className="h-3.5 w-3.5" />
                              {lead.time}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bottom bar */}
                <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4">
                  <p className="text-xs text-slate-500">
                    Showing a preview of your lead pipeline
                  </p>

                  <a
                    href="/admin"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 transition hover:text-indigo-300"
                  >
                    Open dashboard
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            HOW IT WORKS
        ========================================================= */}
        <HowItWorks />

        {/* =========================================================
            LEAD FORM
        ========================================================= */}
        <section
          id="lead-form"
          className="relative scroll-mt-20 overflow-hidden border-t border-slate-800/70 bg-[#060A12] py-28 sm:py-36"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Get started
              </p>

              <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Ready to stop losing leads?
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                Tell us a little about your team and see how an automated
                lead workflow could fit your process.
              </p>
            </div>

            <div className="relative mx-auto mt-14 max-w-4xl">
              <div className="absolute -inset-4 rounded-[2rem] bg-indigo-500/5 blur-2xl" />

              <div className="relative rounded-[2rem] border border-slate-800 bg-[#0D131F] p-6 shadow-2xl sm:p-10 lg:p-12">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA
        ========================================================= */}
        <section className="relative overflow-hidden border-t border-slate-800/70 bg-[#090D16] py-24 sm:py-32">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />

          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 shadow-lg shadow-indigo-950/30">
              <Workflow className="h-6 w-6" />
            </div>

            <h2 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Your next lead is already waiting.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              Build a faster, more consistent path from first touch to
              meaningful conversation.
            </p>

            <a
              href="#lead-form"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer
        id="resources"
        className="border-t border-slate-800/80 bg-[#050810] text-slate-400"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-2">
              <a
                href="#top"
                className="inline-flex items-center gap-2.5 text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-500/20">
                  <Workflow
                    className="h-5 w-5 text-white"
                    strokeWidth={2.25}
                  />
                </span>

                <span className="text-lg font-bold tracking-tight">
                  Meridian
                </span>
              </a>

              <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
                Intelligent lead qualification and outreach for modern
                revenue teams — with a human always in the loop.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-[10px] font-medium text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Security-conscious by design
              </div>
            </div>

            {/* Links */}
            {FOOTER_LINKS.map((column) => (
              <div key={column.heading}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                  {column.heading}
                </h4>

                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-slate-500 transition-colors hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800/70 pt-8 text-xs text-slate-600 sm:flex-row">
            <p>
              © {new Date().getFullYear()} Meridian. All rights reserved.
            </p>

            <div className="flex items-center gap-2">
              <span>Privacy-conscious architecture</span>
              <span className="text-slate-800">•</span>
              <span>Built for modern teams</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}