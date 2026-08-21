import { X, Check, Workflow, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import LeadForm from "./components/LeadForm";
import AdminDashboard from "./components/AdminDashboard";

const FRICTION_POINTS = [
  "Leads sit unanswered for hours or days",
  "Manual qualification eats up your team's time",
  "Follow-ups fall through the cracks",
  "No visibility into what happened to a lead",
];

const SOLUTION_POINTS = [
  "Every lead is scored by AI within seconds",
  "Your team reviews, not researches, each lead",
  "100% of qualified leads receive a follow-up",
  "Full pipeline visibility from form to close",
];

const FOOTER_LINKS: { heading: string; links: string[] }[] = [
  { heading: "Product", links: ["Overview", "How It Works", "Pricing", "Security"] },
  { heading: "Solutions", links: ["Sales Teams", "Revenue Operations", "Agencies"] },
  { heading: "Resources", links: ["Documentation", "Guides", "API Reference", "Status"] },
  { heading: "Company", links: ["About", "Careers", "Contact"] },
];

export default function App() {
  if (window.location.pathname === "/admin") {
    return (
      <div className="min-h-screen bg-slate-950 py-10 text-slate-100">
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Ambient background glow untuk estetika SaaS internasional */}
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl" />

        <Hero />

        {/* Problem vs Solution */}
        <section id="product" className="relative scroll-mt-20 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-medium text-indigo-400 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                <span>The Problem & Solution</span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Traditional lead handling loses deals
              </h2>
              <p className="mt-4 text-base text-slate-400">
                Stop leaking revenue. Transform slow, manual workflows into instantly qualified opportunities.
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Without Automation (Problem Card) */}
              <div className="group relative rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 backdrop-blur-xl transition-all duration-300 hover:border-slate-700/80">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    <X className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-200">
                    Without automation
                  </h3>
                </div>
                <ul className="mt-8 space-y-4">
                  {FRICTION_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3.5 text-sm text-slate-400">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* With Automation (Solution Card - Highlighted) */}
              <div className="relative rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 to-slate-900/60 p-8 backdrop-blur-xl shadow-2xl shadow-indigo-950/50 transition-all duration-300 hover:border-indigo-500/50">
                <div className="absolute -top-3 right-6 rounded-full bg-indigo-500 px-3 py-0.5 text-[11px] font-semibold text-white tracking-wide uppercase shadow-md">
                  Recommended
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Check className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    With your automated system
                  </h3>
                </div>
                <ul className="mt-8 space-y-4">
                  {SOLUTION_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3.5 text-sm text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />

        {/* Lead Form Section */}
        <section id="lead-form" className="relative scroll-mt-20 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                Get Started
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                See it working on your own leads
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                Tell us a bit about your team and we'll set up a walkthrough tailored to your pipeline.
              </p>
            </div>

            <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
              <LeadForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="resources" className="border-t border-slate-800/80 bg-[#060911] text-slate-400">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
            <div className="col-span-2 lg:col-span-2">
              <a href="#top" className="flex items-center gap-2.5 text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-500/20">
                  <Workflow className="h-5 w-5 text-white" strokeWidth={2.25} />
                </span>
                <span className="text-lg font-bold tracking-tight">
                  Meridian
                </span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
                Automated lead qualification and outreach for modern revenue teams, with a human always in the loop.
              </p>
            </div>

            {FOOTER_LINKS.map((column) => (
              <div key={column.heading}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                  {column.heading}
                </h4>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm transition-colors hover:text-indigo-400">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800/60 pt-8 sm:flex-row text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Meridian, Inc. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>SOC 2 Type II compliant. GDPR ready.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}