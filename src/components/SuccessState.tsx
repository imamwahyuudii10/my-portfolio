import { CheckCircle2 } from "lucide-react";

interface SuccessStateProps {
  firstName: string;
  onReset: () => void;
}

/**
 * High-trust confirmation shown after a successful submission.
 * Intentionally shows nothing about internal backend fields (lead_id,
 * ai_score, etc.) -- only a warm, specific acknowledgement.
 */
export default function SuccessState({ firstName, onReset }: SuccessStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center text-center py-12 px-6 sm:px-10"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-100">
        <CheckCircle2 className="h-7 w-7 text-emerald-600" strokeWidth={2} />
      </div>

      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-[#0F172A]">
        Thank you, {firstName}!
      </h3>

      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#64748B]">
        Your request has been received. Our team will review your information
        and get back to you shortly.
      </p>

      <div className="mt-8 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-[#64748B]">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Typical response time: within 1 business day
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 text-sm font-medium text-[#1E3A8A] underline underline-offset-4 hover:text-[#1E293B] transition-colors"
      >
        Submit another request
      </button>
    </div>
  );
}
