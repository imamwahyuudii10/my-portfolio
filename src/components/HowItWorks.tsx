import {
  FileInput,
  Cog,
  BrainCircuit,
  UserCheck,
  MailCheck,
  type LucideIcon,
} from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Capture",
    description:
      "A visitor submits the lead form on your site. Every field is validated instantly, so only clean, complete data enters the pipeline.",
    icon: FileInput,
  },
  {
    number: "02",
    title: "Process",
    description:
      "An n8n workflow receives the submission, validates it against your business rules, and routes it into the pipeline in real time.",
    icon: Cog,
  },
  {
    number: "03",
    title: "Intelligence",
    description:
      "Gemini AI scores the lead against your ideal customer profile and drafts a personalized outreach message for review.",
    icon: BrainCircuit,
  },
  {
    number: "04",
    title: "Approval",
    description:
      "A member of your team reviews the AI's scoring and draft, keeping a human in the loop before anything reaches a prospect's inbox.",
    icon: UserCheck,
  },
  {
    number: "05",
    title: "Outreach",
    description:
      "Once approved, a personalized message is dispatched automatically through Gmail, and the lead is tracked through to close.",
    icon: MailCheck,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-[#F8FAFC] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
            From form submission to follow-up, fully orchestrated
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#64748B]">
            Five steps run end-to-end, automatically, with a human checkpoint
            before anything reaches a prospect.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md hover:shadow-slate-900/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F172A]/[0.04] ring-1 ring-slate-100">
                    <Icon className="h-5 w-5 text-[#1E3A8A]" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-semibold text-[#CBD5E1]">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-[#0F172A]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
