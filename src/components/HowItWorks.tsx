import {
  FileInput,
  Cog,
  BrainCircuit,
  UserCheck,
  MailCheck,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  highlight?: boolean;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Capture",
    description:
      "Every new lead enters through your website and is validated instantly.",
    detail: "Clean data enters the pipeline",
    icon: FileInput,
  },
  {
    number: "02",
    title: "Process",
    description:
      "n8n normalizes the submission, applies business rules, and checks for duplicates.",
    detail: "Validated and structured automatically",
    icon: Cog,
  },
  {
    number: "03",
    title: "Qualify",
    description:
      "AI evaluates lead quality, determines fit, and prepares a personalized outreach draft.",
    detail: "Scored, enriched, and prioritized",
    icon: BrainCircuit,
  },
  {
    number: "04",
    title: "Approve",
    description:
      "Your team reviews the recommendation before anything is sent to the prospect.",
    detail: "Human control stays in the loop",
    icon: UserCheck,
    highlight: true,
  },
  {
    number: "05",
    title: "Engage",
    description:
      "Approved outreach is delivered automatically and the lead status is updated.",
    detail: "Consistent follow-up, automatically",
    icon: MailCheck,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-20 overflow-hidden bg-[#F8FAFC] py-28 sm:py-36"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-100/60 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            How it works
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            From first touch to follow-up.
            <span className="block text-slate-400">
              One connected workflow.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Five coordinated stages handle the repetitive work while keeping
            your team in control of every important decision.
          </p>
        </div>

        {/* Desktop journey */}
        <div className="relative mx-auto mt-20 hidden max-w-6xl lg:block">
          {/* Main connection line */}
          <div
            aria-hidden="true"
            className="absolute left-[9%] right-[9%] top-[46px] h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
          />

          <div className="grid grid-cols-5 gap-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="group relative">
                  {/* Connector arrow */}
                  {index < STEPS.length - 1 && (
                    <ArrowRight
                      aria-hidden="true"
                      className="absolute -right-[14px] top-[38px] z-20 h-4 w-4 text-slate-300"
                    />
                  )}

                  <div
                    className={`relative flex h-full flex-col rounded-3xl border p-6 transition-all duration-300 ${
                      step.highlight
                        ? "border-indigo-300 bg-gradient-to-b from-indigo-50 to-white shadow-xl shadow-indigo-100/60"
                        : "border-slate-200 bg-white hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50"
                    }`}
                  >
                    {/* Step number */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                          step.highlight
                            ? "border-indigo-200 bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                            : "border-slate-200 bg-slate-50 text-indigo-700"
                        }`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </div>

                      <span
                        className={`text-xs font-bold tracking-[0.15em] ${
                          step.highlight ? "text-indigo-400" : "text-slate-300"
                        }`}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Highlight tag */}
                    {step.highlight && (
                      <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-indigo-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                        <UserCheck className="h-3 w-3" />
                        Human checkpoint
                      </div>
                    )}

                    <h3
                      className={`text-lg font-bold text-slate-950 ${
                        step.highlight ? "mt-4" : "mt-7"
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>

                    <div className="mt-auto pt-6">
                      <div className="border-t border-slate-100 pt-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle2
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                              step.highlight
                                ? "text-indigo-600"
                                : "text-emerald-500"
                            }`}
                          />

                          <span className="text-xs font-medium leading-5 text-slate-500">
                            {step.detail}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet journey */}
        <div className="relative mx-auto mt-16 max-w-2xl lg:hidden">
          {/* Vertical line */}
          <div
            aria-hidden="true"
            className="absolute bottom-12 left-[23px] top-12 w-px bg-gradient-to-b from-indigo-200 via-slate-200 to-transparent"
          />

          <div className="space-y-5">
            {STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className={`relative ml-12 rounded-2xl border p-6 ${
                    step.highlight
                      ? "border-indigo-300 bg-indigo-50 shadow-lg shadow-indigo-100/60"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  {/* Timeline icon */}
                  <div
                    className={`absolute -left-[49px] top-6 flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm ${
                      step.highlight
                        ? "border-indigo-500 bg-indigo-600 text-white"
                        : "border-slate-200 bg-white text-indigo-700"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-500">
                      Step {step.number}
                    </span>

                    {step.highlight && (
                      <span className="rounded-full border border-indigo-200 bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-indigo-700">
                        Human checkpoint
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>

                  <div className="mt-4 flex items-start gap-2 border-t border-slate-100 pt-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-xs font-medium leading-5 text-slate-500">
                      {step.detail}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm sm:px-8">
          <p className="text-sm leading-6 text-slate-600">
            <span className="font-semibold text-slate-950">
              Automation handles the repetitive steps.
            </span>{" "}
            Your team makes the decision that matters most — whether a lead is
            ready for outreach.
          </p>
        </div>
      </div>
    </section>
  );
}