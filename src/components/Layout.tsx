"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar, Footer } from "@/features/navigation";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute =
    pathname?.startsWith("/admin") || pathname?.startsWith("/signin");

  // Don't show main navbar/footer for admin routes (they have their own navbar)
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
