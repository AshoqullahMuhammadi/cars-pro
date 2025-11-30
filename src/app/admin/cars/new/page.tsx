"use client";

import React from "react";
import { CarForm } from "@/components/admin/CarForm";
import { Plus, Sparkles } from "lucide-react";

export default function NewCarPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-light-primary/10 to-light-primary/20 dark:from-dark-primary/10 dark:to-dark-primary/20 rounded-xl">
            <Plus className="w-6 h-6 text-light-primary dark:text-dark-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
              Add New Car
            </h1>
            <p className="text-light-muted dark:text-dark-muted mt-1">
              Create a new car listing with images and details
            </p>
          </div>
        </div>
      </div>
      <div className="bg-light-surface dark:bg-dark-surface p-6 md:p-8 rounded-2xl shadow-xl border-2 border-gray-200/50 dark:border-gray-700/50">
        <CarForm />
      </div>
    </div>
  );
}

