import {
  Home,
  LogOut,
  ClipboardList,
  Briefcase,
  UserCircle,
  Building2,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Leads", href: "/leads", icon: ClipboardList },
  { name: "Agents", href: "/agents", icon: Briefcase },
  { name: "Profile", href: "/profile", icon: UserCircle },
  { name: "Business", href: "/business", icon: Building2 },
  { name: "Logout", href: "/logout", icon: LogOut },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
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
      </nav>
    </aside>
  );
}
