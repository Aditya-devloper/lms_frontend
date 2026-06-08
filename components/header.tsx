"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserById, logoutUser } from "@/services/services";
import { useEffect, useState } from "react";
import { MEDIA_URL } from "@/constants";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DeleteConfirm } from "@/app/(shared)/components/DeleteConfirm";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
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

  const fetchUser = async () => {
    try {
      const res = await getUserById({});
      if (res.data.status) {
        const userData = res.data.response;
        setUser(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b flex items-center justify-between px-3 sm:px-6">
        <div className="flex items-center gap-5 sm:gap-15">
          <h1 className="text-2xl mb-1 font-semibold tracking-tight text-blue-500">
            Lead Manager
          </h1>
          <Button variant={"ghost"} size={"icon"} onClick={onToggleSidebar}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 object-cover shadow-xs">
              <AvatarImage
                src={`${MEDIA_URL}/users/${user?.image}`}
                alt={user?.name || "User"}
              />
              <AvatarFallback className="bg-primary text-sm font-bold text-primary-foreground">
                {getInitials(user?.name) || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href="/profile">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

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
