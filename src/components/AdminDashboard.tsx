import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

interface Lead {
  id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  company_name: string;
  source?: string;
  status: string;
  ai_score?: number;
  ai_qualification_reason?: string;
  icp_fit?: boolean;
  approval_status?: string;
  created_at?: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    if (!supabase) {
      console.error("Supabase client is not initialized.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching leads:", error);
    } else if (data) {
      setLeads(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (leadId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus lead ini?")) return;

    setLoadingId(leadId);
    setMessage(null);

    try {
      if (supabase) {
        const { data, error } = await supabase
          .from("leads")
          .delete()
          .eq("id", leadId)
          .select();

        if (error) throw new Error("Gagal menghapus data: " + error.message);

        if (!data || data.length === 0) {
          throw new Error("Gagal menghapus! Kebijakan Supabase RLS memblokir aksi DELETE.");
        }
      }

      setLeads((prevLeads) => prevLeads.filter((l) => l.id !== leadId));
      setMessage("Lead berhasil dihapus!");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Gagal menghapus data.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleApprove = async (leadId: string) => {
    setLoadingId(leadId);
    setMessage(null);

    try {
      if (supabase) {
        const { error: updateError } = await supabase
          .from("leads")
          .update({ status: "approved", approval_status: "SENT" })
          .eq("id", leadId);

        if (updateError) {
          throw new Error("Gagal mengupdate status: " + updateError.message);
        }
      }

      const webhookUrl = import.meta.env.VITE_N8N_APPROVAL_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lead_id: leadId }),
        });
      }

      await fetchLeads();
      setMessage("Lead successfully approved and outreach email sent!");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "An error occurred while connecting to the server.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full px-4 py-8 max-w-[1500px] mx-auto">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Admin Lead Approval
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and approve incoming leads before triggering outreach emails.
          </p>
        </div>
        <a
          href="/"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1"
        >
          ← Back to Main Site
        </a>
      </div>

      {/* Alert Notification */}
      {message && (
        <div className="mb-6 p-4 text-sm rounded-lg bg-blue-50 text-blue-700 border border-blue-200 shadow-sm flex items-center justify-between">
          <span>{message}</span>
          <button 
            onClick={() => setMessage(null)} 
            className="text-blue-500 hover:text-blue-700 font-bold ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* Table Container */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-4 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">AI Score</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Reason</th>
                <th className="px-4 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">ICP Fit</th>
                <th className="px-4 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Approval</th>
                <th className="px-4 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[130px]">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={10} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-indigo-600 border-t-transparent rounded-full"></span>
                      Loading data from Supabase...
                    </div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-8 text-center text-gray-500">
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Name */}
                    <td className="px-4 py-4 whitespace-nowrap font-semibold text-gray-900">
                      {`${lead.first_name || ''} ${lead.last_name || ''}`.trim() || '-'}
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                      {lead.email}
                    </td>

                    {/* Company */}
                    <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-800">
                      {lead.company_name || '-'}
                    </td>

                    {/* Source */}
                    <td className="px-4 py-4 whitespace-nowrap text-gray-500 capitalize">
                      {lead.source || '-'}
                    </td>

                    {/* AI Score */}
                    <td className="px-4 py-4 whitespace-nowrap text-center font-bold text-indigo-600">
                      {lead.ai_score ?? '-'}
                    </td>

                    {/* AI Qualification Reason */}
                    <td className="px-4 py-4 text-xs text-gray-600 min-w-[280px] max-w-[360px] whitespace-normal leading-relaxed">
                      {lead.ai_qualification_reason || '-'}
                    </td>

                    {/* ICP Fit */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      {lead.icp_fit === true ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          True
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                          False
                        </span>
                      )}
                    </td>

                    {/* Approval Status */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {lead.approval_status || '-'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        lead.status === "approved" || lead.status === "APPROVED" || lead.status === "SENT"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      }`}>
                        {lead.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        {lead.status === "PENDING" || lead.status === "NEW" || lead.status === "new" ? (
                          <button
                            onClick={() => handleApprove(lead.id)}
                            disabled={loadingId === lead.id}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition disabled:opacity-50 shadow-sm"
                          >
                            {loadingId === lead.id ? "..." : "Approve"}
                          </button>
                        ) : (
                          <span className="text-gray-400 italic text-xs mr-1 font-medium">Completed</span>
                        )}

                        <button
                          onClick={() => handleDelete(lead.id)}
                          disabled={loadingId === lead.id}
                          className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition disabled:opacity-50 shadow-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}