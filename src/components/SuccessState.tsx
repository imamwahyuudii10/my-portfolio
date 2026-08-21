import { CheckCircle2 } from "lucide-react";

interface SuccessStateProps {
  firstName: string;
  onReset: () => void;
}

/**
 * High-trust confirmation shown after a successful submission.
 * Internal backend fields such as lead_id and ai_score
 * are intentionally not displayed to the visitor.
 */
export default function SuccessState({
  firstName,
  onReset,
}: SuccessStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center px-6 py-12 text-center sm:px-10"
    >
      {/* Success Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500/10 shadow-lg shadow-emerald-950/20">
        <CheckCircle2
          className="h-7 w-7 text-emerald-400"
          strokeWidth={2}
        />
      </div>

      {/* Title */}
      <h3 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Thank you, {firstName}!
      </h3>

      {/* Description */}
      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/70">
        Your request has been received. Our team will review your information
        and get back to you shortly.
      </p>

      {/* Response Time */}
      <div className="mt-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium text-white/70">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

        Typical response time: within 1 business day
      </div>

      {/* Reset */}
      <button
        type="button"
        onClick={onReset}
        className="mt-8 text-sm font-semibold text-indigo-300 underline decoration-indigo-400/40 underline-offset-4 transition-colors hover:text-white"
      >
        Submit another request
      </button>
    </div>
  );
}