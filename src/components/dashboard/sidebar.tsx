"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  MenuIcon,
  BrainCircuit,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  const clerk = useClerk();

  const navItems = [
    {
      title: "Generate",
      icon: BrainCircuit,
      href: "/dashboard",
    },
    {
      title: "History",
      icon: History,
      href: "/dashboard/history",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  const handleLogout = async () => {
    await clerk.signOut();
    window.location.href = "/";
  };

  return (
    <div
      className={cn(
        "h-screen bg-black text-white transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!isCollapsed && 
        <Link href="/" passHref>
        <span className="text-xl font-bold cursor-pointer hover:text-gray-200">
          MindMap AI
        </span>
        </Link>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-gray-800"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-2 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors",
              pathname === item.href && "bg-gray-800 text-white"
            )}
          >
            <item.icon className="h-5 w-5" />
            {!isCollapsed && <span className="ml-4">{item.title}</span>}
          </Link>
        ))}
      </div>

      <div className="absolute bottom-4 w-full px-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="ml-4">Logout</span>}
        </Button>
      </div>
    </div>
  );
}
