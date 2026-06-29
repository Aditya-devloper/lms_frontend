"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const handleAuthRedirect = () => {
    const token = localStorage.getItem("token");

    if (token) {
      window.location.href = "/dashboard";
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-99 px-4 sm:px-6">
      <nav
        className={`max-w-6xl mx-auto mt-4 rounded-2xl px-5 py-3.5 flex items-center justify-between transition-all duration-300
        ${
          scrolled
            ? "bg-[#0a0d17]/90 backdrop-blur-xl border border-white/10 shadow-lg"
            : "bg-[#0a0d17]/20 backdrop-blur-md border border-white/5"
        }`}
      >
        <a href="#" className="flex items-center">
          <Image
            src="/logo-horizontal-dark.svg"
            alt="Leado"
            width={132}
            height={35}
            priority
          />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a
            onClick={handleAuthRedirect}
            className="text-sm cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors px-3 py-2"
          >
            Log in
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium bg-[var(--color-text-primary)] text-[var(--color-bg)] rounded-full px-4 py-2 flex items-center gap-1.5 hover:bg-white transition-colors"
          >
            Start free
            <ArrowUpRight size={14} />
          </a>
        </div>
        <button
          className="md:hidden p-1.5 text-[var(--color-text-primary)]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden max-w-6xl mx-auto mt-2 rounded-2xl p-5 flex flex-col gap-4 bg-[#0a0d17]/95 backdrop-blur-xl border border-white/10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-[var(--color-text-secondary)]"
            >
              {link.label}
            </a>
          ))}
          <div className="h-[1px] bg-[var(--color-border)]" />
          <a
            onClick={handleAuthRedirect}
            className="text-sm text-[var(--color-text-secondary)]"
          >
            Log in
          </a>
          <a
            href="#pricing"
            onClick={() => setOpen(false)}
            className="text-sm font-medium bg-[var(--color-text-primary)] text-[var(--color-bg)] rounded-full px-4 py-2.5 text-center"
          >
            Start free
          </a>
        </div>
      )}
    </header>
  );
}
