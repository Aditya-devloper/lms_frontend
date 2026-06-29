"use client";

import { ReactNode, useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { useRouter } from "next/navigation";
import Loading from "@/components/shared/loading";

export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const user = localStorage.getItem("user");

    if (!user && window.location.pathname !== "/setup-business") {
      router.replace("/setup-business");
      return;
    }

    setChecking(false);
  }, [router]);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true); // desktop
    } else {
      setSidebarOpen(false); // mobile
    }
  }, []);

  if (checking) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header onToggleSidebar={() => setSidebarOpen((v) => !v)} />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-14 left-0 z-40
          h-[calc(100vh-4rem)]
          w-60 bg-white border-r
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar
          onNavigate={() => {
            if (window.innerWidth < 1024) {
              setSidebarOpen(false);
            }
          }}
        />
      </aside>

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main
        className={`
        p-3 pt-17 sm:p-6 sm:pt-18 transition-all duration-300
          ${sidebarOpen ? "lg:ml-60" : "lg:ml-0"}
        `}
      >
        {children}
      </main>
    </div>
  );
}
