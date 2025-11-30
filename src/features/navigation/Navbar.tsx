"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Menu, X, Phone, MessageCircle, LogIn, Plus, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "../theme";
import { WHATSAPP_URL, CALL_URL } from "@/lib/constants";
import { Logo } from "@/components/Logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#showcase", label: "Showcase" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-light-surface dark:bg-dark-surface border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200 dark:border-gray-800">
              {session?.user?.role === "admin" ? (
                <>
                  <Link
                    href="/admin/cars/new"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-light-primary to-light-primary/90 dark:from-dark-primary dark:to-dark-primary/90 text-white hover:from-light-primary/90 hover:to-light-primary/80 dark:hover:from-dark-primary/90 dark:hover:to-dark-primary/80 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
                    title="Add New Car"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden lg:inline">Add Car</span>
                  </Link>
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-light-text dark:text-dark-text hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors font-medium"
                    title="Admin Dashboard"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="hidden lg:inline">Admin</span>
                  </Link>
                </>
              ) : (
                <Link
                  href="/signin"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-light-primary to-light-primary/90 dark:from-dark-primary dark:to-dark-primary/90 text-white hover:from-light-primary/90 hover:to-light-primary/80 dark:hover:from-dark-primary/90 dark:hover:to-dark-primary/80 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
                  title="Sign In"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden lg:inline">Sign In</span>
                </Link>
              )}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                aria-label="Contact via WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={CALL_URL}
                className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </a>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
              {session?.user?.role === "admin" ? (
                <>
                  <Link
                    href="/admin/cars/new"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-light-primary to-light-primary/90 dark:from-dark-primary dark:to-dark-primary/90 text-white hover:from-light-primary/90 hover:to-light-primary/80 dark:hover:from-dark-primary/90 dark:hover:to-dark-primary/80 transition-all font-medium"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Car</span>
                  </Link>
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-light-text dark:text-dark-text hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors font-medium"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Admin Dashboard</span>
                  </Link>
                </>
              ) : (
                <Link
                  href="/signin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-light-primary to-light-primary/90 dark:from-dark-primary dark:to-dark-primary/90 text-white hover:from-light-primary/90 hover:to-light-primary/80 dark:hover:from-dark-primary/90 dark:hover:to-dark-primary/80 transition-all font-medium"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
              )}
              <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={CALL_URL}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

