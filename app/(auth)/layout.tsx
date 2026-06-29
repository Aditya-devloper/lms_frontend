"use client";

import { ReactNode } from "react";
import ".././home.css";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0d17] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-[#0a0d17]/55" />

      <div className="absolute inset-0 ambient-glow" />
      <div className="absolute inset-0 noise-overlay" />

      <div
        className={`relative z-10 flex items-center justify-center px-4 py-12 ${isLoginPage ? "min-h-screen" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
