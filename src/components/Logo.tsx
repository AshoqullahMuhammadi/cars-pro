"use client";

import React from "react";
import Link from "next/link";
import { Car } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <div className="relative">
        <div className="absolute inset-0 bg-light-primary/20 dark:bg-dark-primary/20 rounded-lg blur-md group-hover:blur-lg transition-all duration-300" />
        <div className="relative bg-gradient-to-br from-light-primary to-light-primary/80 dark:from-dark-primary dark:to-dark-primary/80 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
          <Car className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent bg-clip-text text-transparent leading-tight">
          CarShowcase
        </span>
        <span className="text-xs text-light-muted dark:text-dark-muted -mt-1 font-medium">
          Professional Inspection
        </span>
      </div>
    </Link>
  );
}

