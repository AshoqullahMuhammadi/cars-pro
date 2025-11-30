"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Car, Plus, LogOut, Home } from "lucide-react";
import { Logo } from "@/components/Logo";

export function AdminNavbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/cars", label: "Cars", icon: Car },
    { href: "/admin/cars/new", label: "Add Car", icon: Plus },
  ];

  return (
    <nav className="bg-light-surface dark:bg-dark-surface border-b-2 border-gray-200 dark:border-gray-800 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/admin/dashboard">
            <Logo />
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-light-primary to-light-primary/90 dark:from-dark-primary dark:to-dark-primary/90 text-white shadow-lg"
                      : "text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="p-2.5 rounded-xl text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:shadow-md"
              title="View Site"
            >
              <Home className="w-5 h-5" />
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/signin" })}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:shadow-md font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

