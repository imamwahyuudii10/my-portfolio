import { ArrowRight, PlayCircle, FileInput, Sparkles, Database, UserCheck, Send } from "lucide-react";

const PIPELINE_STEPS = [
  { icon: FileInput, label: "Lead Form" },
  { icon: Sparkles, label: "AI Qualification" },
  { icon: Database, label: "CRM Sync" },
  { icon: UserCheck, label: "Human Approval" },
  { icon: Send, label: "Automated Outreach" },
];

const LOGOS = ["Acme", "TechCorp", "Nexus", "Fluent", "Orbital"];

export default function Hero() {
  function scrollToForm() {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToHowItWorks() {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="top" className="relative overflow-hidden bg-white pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Ambient background gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(30,58,138,0.08),transparent)]"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-[#334155]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            AI-qualified. Human-approved.
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl">
            Turn Every Lead Into a{" "}
            <span className="text-[#1E3A8A]">Meaningful Conversation</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#64748B]">
            Capture, qualify, and follow up with every potential customer
            using an intelligent, automated lead management system.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={scrollToForm}
              className="group inline-flex items-center gap-2 rounded-lg bg-[#0F172A] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#1E293B] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0F172A]/20"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={scrollToHowItWorks}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-[15px] font-medium text-[#0F172A] transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
            >
              <PlayCircle className="h-4 w-4" />
              See How It Works
            </button>
          </div>
        </div>

        {/* Pipeline diagram */}
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="relative rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-10">
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
              {PIPELINE_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === PIPELINE_STEPS.length - 1;
                return (
                  <div key={step.label} className="flex items-center gap-4 sm:flex-col sm:gap-0">
                    <div className="flex flex-col items-center gap-3 sm:flex-1">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm shadow-slate-900/5 ring-1 ring-slate-200"
                        style={{
                          animation: `pipelinePulse 2.4s ease-in-out ${index * 0.35}s infinite`,
                        }}
                      >
                        <Icon className="h-5 w-5 text-[#1E3A8A]" strokeWidth={2} />
                      </div>
                      <span className="text-center text-xs font-medium text-[#334155] sm:mt-1">
                        {step.label}
                      </span>
                    </div>
                    {!isLast && (
                      <div
                        aria-hidden="true"
                        className="hidden h-px flex-1 self-start bg-gradient-to-r from-slate-300 to-slate-200 sm:mt-6 sm:block"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <style>{`
            @keyframes pipelinePulse {
              0%, 100% { transform: scale(1); box-shadow: 0 1px 2px rgba(15,23,42,0.05); }
              50% { transform: scale(1.06); box-shadow: 0 4px 12px rgba(30,58,138,0.15); }
            }
            @media (prefers-reduced-motion: reduce) {
              [style*="pipelinePulse"] { animation: none !important; }
            }
          `}</style>
        </div>

        {/* Social proof */}
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
            Built for modern sales &amp; revenue teams
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {LOGOS.map((logo) => (
              <span
                key={logo}
                className="text-lg font-semibold tracking-tight text-[#CBD5E1]"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
