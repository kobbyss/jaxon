import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BRAND_NAME } from "../config";
import Logo from "./Logo";

export type Page = "home" | "tiers" | "consultation";

interface NavbarProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

const links: { id: Page; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "tiers", label: "System Tiers" },
  { id: "consultation", label: "Consultation" },
];

export default function Navbar({ current, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink-950/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => go("home")}
          className="flex items-center group"
          aria-label={`${BRAND_NAME} home`}
        >
          <Logo size={30} />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                current === link.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
              {current === link.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-accent-cyan rounded-full shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
              )}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button onClick={() => go("consultation")} className="btn-primary text-xs px-5 py-2.5">
            Start Your Build
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-300 p-2"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-ink-900/95 backdrop-blur-xl border-b border-white/[0.06] animate-fade-in-down">
          <div className="px-6 py-4 space-y-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  current === link.id
                    ? "text-white bg-white/[0.05]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => go("consultation")}
              className="btn-primary w-full mt-2 text-xs"
            >
              Start Your Build
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
