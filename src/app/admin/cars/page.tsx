"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Car, Edit, Trash2, Plus, Search } from "lucide-react";
import { Car as CarType } from "@/features/cars/types";

export default function CarsPage() {
  const router = useRouter();
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch("/api/cars");
      if (response.ok) {
        const data = await response.json();
        setCars(data);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this car?")) {
      return;
    }

    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCars();
      } else {
        alert("Failed to delete car");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("An error occurred");
    }
  };

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-light-primary dark:border-dark-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-light-muted dark:text-dark-muted">Loading cars...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-light-primary/10 to-light-primary/20 dark:from-dark-primary/10 dark:to-dark-primary/20 rounded-xl">
            <Car className="w-6 h-6 text-light-primary dark:text-dark-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-2">
              Car Management
            </h1>
            <p className="text-light-muted dark:text-dark-muted text-lg">
              Manage your car listings ({cars.length} total)
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push("/admin/cars/new")}
          className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-light-primary to-light-primary/90 dark:from-dark-primary dark:to-dark-primary/90 text-white rounded-xl font-semibold hover:from-light-primary/90 hover:to-light-primary/80 dark:hover:from-dark-primary/90 dark:hover:to-dark-primary/80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Car</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-light-muted dark:text-dark-muted" />
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-light-bg dark:bg-dark-bg border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Cars Grid */}
      {filteredCars.length === 0 ? (
        <div className="text-center py-12 bg-light-surface dark:bg-dark-surface rounded-xl">
          <Car className="w-16 h-16 text-light-muted dark:text-dark-muted mx-auto mb-4" />
          <p className="text-light-muted dark:text-dark-muted">
            {searchTerm ? "No cars found matching your search" : "No cars yet. Add your first car!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={car.images[0] || "/placeholder-car.jpg"}
                  alt={car.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-1">
                  {car.title}
                </h3>
                <p className="text-sm text-light-muted dark:text-dark-muted mb-3 line-clamp-2">
                  {car.shortDescription}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {car.year}
                  </span>
                  {car.price && (
                    <span className="text-xs bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent px-2 py-1 rounded">
                      {car.price}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/cars/${car.id}/edit`)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

