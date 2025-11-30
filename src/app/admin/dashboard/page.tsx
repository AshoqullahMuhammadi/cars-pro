"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Car, Plus, TrendingUp, Clock, LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalCars: 0,
    recentCars: 0,
  });

  useEffect(() => {
    // Fetch stats from API
    fetch("/api/cars")
      .then((res) => res.json())
      .then((cars) => {
        const totalCars = cars.length;
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const recentCars = cars.filter((car: any) => {
          // Assuming car IDs are timestamps
          const carId = parseInt(car.id);
          return carId > weekAgo;
        }).length;

        setStats({ totalCars, recentCars });
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
      });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 bg-gradient-to-br from-light-primary/10 to-light-primary/20 dark:from-dark-primary/10 dark:to-dark-primary/20 rounded-2xl">
            <LayoutDashboard className="w-8 h-8 text-light-primary dark:text-dark-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-2">
              Welcome back, {session?.user?.name || session?.user?.email?.split("@")[0]}!
            </h1>
            <p className="text-light-muted dark:text-dark-muted text-lg">
              Manage your car listings and view analytics
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-lg border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl">
              <Car className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
            {stats.totalCars}
          </h3>
          <p className="text-light-muted dark:text-dark-muted font-medium">Total Cars</p>
        </div>

        <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-lg border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-green-500/50 dark:hover:border-green-500/50 transition-all duration-300 hover:shadow-xl transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl">
              <TrendingUp className="w-7 h-7 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
            {stats.recentCars}
          </h3>
          <p className="text-light-muted dark:text-dark-muted font-medium">Added This Week</p>
        </div>

        <Link
          href="/admin/cars/new"
          className="bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-lg border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-light-primary dark:hover:border-dark-primary transition-all duration-300 hover:shadow-xl transform hover:scale-105 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-4 bg-gradient-to-br from-light-primary/10 to-light-primary/20 dark:from-dark-primary/10 dark:to-dark-primary/20 rounded-xl group-hover:from-light-primary/20 group-hover:to-light-primary/30 dark:group-hover:from-dark-primary/20 dark:group-hover:to-dark-primary/30 transition-all">
              <Plus className="w-7 h-7 text-light-primary dark:text-dark-primary" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2 group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
            Add New
          </h3>
          <p className="text-light-muted dark:text-dark-muted font-medium">Create new listing</p>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        <h2 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/cars/new"
            className="flex items-center gap-3 p-4 bg-light-primary/10 dark:bg-dark-primary/10 hover:bg-light-primary/20 dark:hover:bg-dark-primary/20 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5 text-light-primary dark:text-dark-primary" />
            <span className="font-medium text-light-text dark:text-dark-text">
              Add New Car
            </span>
          </Link>
          <Link
            href="/admin/cars"
            className="flex items-center gap-3 p-4 bg-light-primary/10 dark:bg-dark-primary/10 hover:bg-light-primary/20 dark:hover:bg-dark-primary/20 rounded-lg transition-colors"
          >
            <Car className="w-5 h-5 text-light-primary dark:text-dark-primary" />
            <span className="font-medium text-light-text dark:text-dark-text">
              View All Cars
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 p-4 bg-light-primary/10 dark:bg-dark-primary/10 hover:bg-light-primary/20 dark:hover:bg-dark-primary/20 rounded-lg transition-colors"
          >
            <Clock className="w-5 h-5 text-light-primary dark:text-dark-primary" />
            <span className="font-medium text-light-text dark:text-dark-text">
              View Website
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

