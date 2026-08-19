import { useEffect, useState } from "react";
import { Menu, X, Workflow } from "lucide-react";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#solutions" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  function scrollToForm() {
    setIsMenuOpen(false);
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200/70 bg-white/80 backdrop-blur-md shadow-sm shadow-slate-900/5"
          : "border-b border-transparent bg-white/40 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8"
      >
        <a
          href="#top"
          className="flex items-center gap-2 text-[#0F172A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2 rounded-md"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F172A]">
            <Workflow className="h-4 w-4 text-white" strokeWidth={2.25} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            Meridian
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#334155] transition-colors hover:text-[#0F172A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={scrollToForm}
            className="rounded-lg bg-[#0F172A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1E293B] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0F172A]/20"
          >
            Get Started
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#0F172A] transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] lg:hidden"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-6 pb-6 pt-4 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#334155] transition-colors hover:bg-slate-50 hover:text-[#0F172A]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={scrollToForm}
            className="mt-4 w-full rounded-lg bg-[#0F172A] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1E293B]"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
