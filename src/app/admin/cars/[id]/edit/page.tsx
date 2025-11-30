"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CarForm } from "@/components/admin/CarForm";
import { Car } from "@/features/cars/types";
import { Car as CarIcon } from "lucide-react";

export default function EditCarPage() {
  const params = useParams();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCar();
  }, [params.id]);

  const fetchCar = async () => {
    try {
      const response = await fetch(`/api/cars/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setCar(data);
      } else {
        router.push("/admin/cars");
      }
    } catch (error) {
      console.error("Error fetching car:", error);
      router.push("/admin/cars");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-light-primary dark:border-dark-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-light-muted dark:text-dark-muted">Loading car...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-light-primary/10 to-light-primary/20 dark:from-dark-primary/10 dark:to-dark-primary/20 rounded-xl">
            <CarIcon className="w-6 h-6 text-light-primary dark:text-dark-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
              Edit Car
            </h1>
            <p className="text-light-muted dark:text-dark-muted mt-1">
              Update car information and images
            </p>
          </div>
        </div>
      </div>
      <div className="bg-light-surface dark:bg-dark-surface p-6 md:p-8 rounded-2xl shadow-xl border-2 border-gray-200/50 dark:border-gray-700/50">
        <CarForm car={car} />
      </div>
    </div>
  );
}

