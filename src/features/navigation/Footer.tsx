import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, MapPin, Car } from "lucide-react";
import { WHATSAPP_URL, CALL_URL, SERVICE_DESCRIPTION } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-light-surface dark:bg-dark-surface border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-light-primary/20 dark:bg-dark-primary/20 rounded-lg blur-md" />
                <div className="relative bg-gradient-to-br from-light-primary to-light-primary/80 dark:from-dark-primary dark:to-dark-primary/80 p-2 rounded-lg">
                  <Car className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent bg-clip-text text-transparent">
                  CarShowcase
                </span>
                <span className="text-xs text-light-muted dark:text-dark-muted -mt-1">
                  Professional Inspection
                </span>
              </div>
            </div>
            <p className="text-light-muted dark:text-dark-muted">
              {SERVICE_DESCRIPTION}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-light-muted dark:text-dark-muted hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-light-muted dark:text-dark-muted hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-light-muted dark:text-dark-muted hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-light-muted dark:text-dark-muted hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-light-muted dark:text-dark-muted hover:text-green-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={CALL_URL}
                className="flex items-center gap-2 text-light-muted dark:text-dark-muted hover:text-blue-500 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+93779536908</span>
              </a>
              <div className="flex items-center gap-2 text-light-muted dark:text-dark-muted">
                <MapPin className="w-5 h-5" />
                <span>Visit our office</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-light-muted dark:text-dark-muted">
          <p>&copy; {new Date().getFullYear()} CarShowcase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

