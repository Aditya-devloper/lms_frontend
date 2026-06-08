"use client";

import { DeleteConfirm } from "@/app/(shared)/components/DeleteConfirm";
import { logoutUser } from "@/services/services";
import {
  Home,
  LogOut,
  ClipboardList,
  Briefcase,
  UserCircle,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Leads", href: "/leads", icon: ClipboardList },
  // { name: "Agents", href: "/agents", icon: Briefcase },
  { name: "Profile", href: "/profile", icon: UserCircle },
  { name: "Business", href: "/business", icon: Building2 },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await logoutUser({});
      if (res.data.status) {
        localStorage.removeItem("user");
        router.push("/login");
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <aside className="flex flex-col py-2 px-4 h-full overflow-y-auto">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}

          <button
            onClick={() => setOpen(true)}
            className="flex items-center cursor-pointer gap-3 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition w-full text-left text-red-500"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      <DeleteConfirm
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm Logout"
        description="Are you sure you want to logout?"
        onConfirm={handleLogout}
        isLogout={true}
      />
    </>
  );
}
