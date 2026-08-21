import {
  ArrowRight,
  PlayCircle,
  FileInput,
  Sparkles,
  Database,
  UserCheck,
  Send,
  CheckCircle2,
  Activity,
  ShieldCheck,
  Zap,
} from "lucide-react";

const PIPELINE_STEPS = [
  {
    icon: FileInput,
    label: "Lead Capture",
    description: "New lead received",
  },
  {
    icon: Sparkles,
    label: "AI Qualification",
    description: "Lead scored & enriched",
  },
  {
    icon: Database,
    label: "Supabase",
    description: "Data securely stored",
  },
  {
    icon: UserCheck,
    label: "Human Approval",
    description: "Team reviews lead",
  },
  {
    icon: Send,
    label: "Outreach",
    description: "Personalized email sent",
  },
];

const METRICS = [
  {
    icon: Zap,
    value: "<10s",
    label: "Lead processing",
  },
  {
    icon: Activity,
    value: "24/7",
    label: "Automation",
  },
  {
    icon: ShieldCheck,
    value: "Human",
    label: "Approval control",
  },
];

export default function Hero() {
  function scrollToForm() {
    document
      .getElementById("lead-form")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToHowItWorks() {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[#080C14] pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32"
    >
      {/* =========================================================
          BACKGROUND EFFECTS
      ========================================================= */}

      {/* Main radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-280px] -z-10 h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-indigo-600/[0.14] blur-[140px]"
      />

      {/* Secondary glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-300px] top-[250px] -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/[0.07] blur-[120px]"
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-indigo-500/[0.05] to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* =========================================================
            HERO CONTENT
        ========================================================= */}

        <div className="mx-auto max-w-4xl text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-300 shadow-lg shadow-black/10 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <span>AI-qualified</span>

            <span className="text-slate-600">•</span>

            <span>Human-approved</span>

            <span className="text-slate-600">•</span>

            <span>Automated outreach</span>
          </div>

          {/* Headline */}
          <h1 className="mt-8 text-5xl font-bold tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-[80px]">
            Turn every lead into
            <span className="block bg-gradient-to-r from-indigo-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              a meaningful conversation.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            Capture, qualify, enrich, and follow up with every potential
            customer through one intelligent automation pipeline — while your
            team stays in control.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={scrollToForm}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-xl shadow-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-2xl hover:shadow-white/[0.12] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
            >
              <span className="relative z-10">Get Started</span>

              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={scrollToHowItWorks}
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.035] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.07] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/10"
            >
              <PlayCircle className="h-4 w-4 text-slate-300 transition-colors group-hover:text-white" />

              See How It Works
            </button>
          </div>

          {/* Trust line */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              No manual data entry
            </span>

            <span className="hidden text-slate-700 sm:inline">•</span>

            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Human approval included
            </span>

            <span className="hidden text-slate-700 sm:inline">•</span>

            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Built for B2B teams
            </span>
          </div>
        </div>

        {/* =========================================================
            AUTOMATION PIPELINE
        ========================================================= */}

        <div className="mx-auto mt-20 max-w-6xl sm:mt-24">
          {/* Outer glow */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-indigo-500/[0.06] blur-3xl"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-white/[0.035] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-6 lg:p-8">
              {/* Header */}
              <div className="mb-7 flex flex-col gap-4 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300">
                      <Activity className="h-4 w-4" />
                    </div>

                    <span className="text-sm font-semibold text-white">
                      Lead automation pipeline
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs text-slate-500">
                    From submission to personalized outreach
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-3 py-1.5 text-xs text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Workflow active
                </div>
              </div>

              {/* Pipeline */}
              <div className="relative">
                {/* Desktop connection line */}
                <div
                  aria-hidden="true"
                  className="absolute left-[8%] right-[8%] top-[31px] hidden h-px bg-gradient-to-r from-indigo-500/10 via-indigo-400/50 to-indigo-500/10 lg:block"
                />

                {/* Animated line */}
                <div
                  aria-hidden="true"
                  className="absolute left-[8%] top-[31px] hidden h-px w-[18%] bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-80 blur-[1px] lg:block"
                  style={{
                    animation: "pipelineFlow 3s linear infinite",
                  }}
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-2">
                  {PIPELINE_STEPS.map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.label}
                        className="group relative"
                        style={{
                          animation: `pipelineEnter 0.7s ease-out ${
                            index * 0.12
                          }s both`,
                        }}
                      >
                        <div className="relative flex h-full flex-col items-center rounded-2xl border border-white/[0.07] bg-[#0D1320]/80 px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/25 hover:bg-[#11182A]">
                          {/* Icon */}
                          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] shadow-lg shadow-black/20 transition-all duration-300 group-hover:border-indigo-400/30 group-hover:bg-indigo-500/10 group-hover:shadow-indigo-500/10">
                            <Icon
                              className="h-5 w-5 text-indigo-300 transition-transform duration-300 group-hover:scale-110"
                              strokeWidth={1.8}
                            />

                            {/* Number */}
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#0D1320] bg-slate-800 text-[9px] font-bold text-slate-400">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <h3 className="mt-4 text-xs font-semibold text-white">
                            {step.label}
                          </h3>

                          <p className="mt-1.5 text-[11px] leading-4 text-slate-500">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pipeline footer */}
              <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                  AI handles repetitive work
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Your team controls the final decision
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            METRICS
        ========================================================= */}

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] sm:grid-cols-3">
            {METRICS.map((metric, index) => {
              const Icon = metric.icon;

              return (
                <div
                  key={metric.label}
                  className={`flex items-center gap-4 px-6 py-5 ${
                    index !== METRICS.length - 1
                      ? "border-b border-white/[0.07] sm:border-b-0 sm:border-r"
                      : ""
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/[0.08] text-indigo-300">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-white">
                      {metric.value}
                    </div>

                    <div className="mt-0.5 text-xs text-slate-500">
                      {metric.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            BOTTOM TRUST STATEMENT
        ========================================================= */}

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-600">
            Built for modern sales &amp; revenue teams
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span className="text-sm font-medium text-slate-600">
              Lead Capture
            </span>

            <span className="text-slate-800">•</span>

            <span className="text-sm font-medium text-slate-600">
              AI Qualification
            </span>

            <span className="text-slate-800">•</span>

            <span className="text-sm font-medium text-slate-600">
              Human Approval
            </span>

            <span className="text-slate-800">•</span>

            <span className="text-sm font-medium text-slate-600">
              Automated Outreach
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style>{`
        @keyframes pipelineFlow {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          85% {
            opacity: 1;
          }

          100% {
            transform: translateX(500%);
            opacity: 0;
          }
        }

        @keyframes pipelineEnter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}