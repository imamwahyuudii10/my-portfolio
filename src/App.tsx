import { X, Check, Workflow } from "lucide-react";
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
  // --- Tambahkan logika ini ---
  if (window.location.pathname === "/admin") {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <AdminDashboard />
      </div>
    );
  }
  // -----------------------------
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Hero />

        {/* Problem vs Solution */}
        <section id="product" className="scroll-mt-20 bg-white py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
                The problem
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                Traditional lead handling loses deals
              </h2>
            </div>

            <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
                    <X className="h-4 w-4 text-red-500" strokeWidth={2.5} />
                  </span>
                  <h3 className="text-base font-semibold text-[#0F172A]">
                    Without automation
                  </h3>
                </div>
                <ul className="mt-6 space-y-4">
                  {FRICTION_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-[#64748B]">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#1E3A8A]/15 bg-[#0F172A] p-8">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
                    <Check className="h-4 w-4 text-emerald-400" strokeWidth={2.5} />
                  </span>
                  <h3 className="text-base font-semibold text-white">
                    With your automated system
                  </h3>
                </div>
                <ul className="mt-6 space-y-4">
                  {SOLUTION_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />

        {/* Lead form section */}
        <section
          id="lead-form"
          className="scroll-mt-20 bg-white py-24 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
                Get started
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                See it working on your own leads
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#64748B]">
                Tell us a bit about your team and we'll set up a walkthrough
                tailored to your pipeline.
              </p>
            </div>

            <div className="mt-14">
              <LeadForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="resources" className="scroll-mt-20 border-t border-slate-200 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
            <div className="col-span-2 lg:col-span-2">
              <a href="#top" className="flex items-center gap-2 text-[#0F172A]">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F172A]">
                  <Workflow className="h-4 w-4 text-white" strokeWidth={2.25} />
                </span>
                <span className="text-[15px] font-semibold tracking-tight">
                  Meridian
                </span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#64748B]">
                Automated lead qualification and outreach for modern revenue
                teams, with a human always in the loop.
              </p>
              
            </div>

            {FOOTER_LINKS.map((column) => (
              <div key={column.heading}>
                <h4 className="text-sm font-semibold text-[#0F172A]">
                  {column.heading}
                </h4>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[#64748B] transition-colors hover:text-[#0F172A]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
            <p className="text-xs text-[#94A3B8]">
              © {new Date().getFullYear()} Meridian, Inc. All rights reserved.
            </p>
            <p className="text-xs text-[#94A3B8]">
              SOC 2 Type II compliant. GDPR ready.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
