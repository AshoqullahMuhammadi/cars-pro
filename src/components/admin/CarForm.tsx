"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Car } from "@/features/cars/types";
import { ImageUpload } from "./ImageUpload";
import { CONTACT_PHONE } from "@/lib/constants";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface CarFormProps {
  car?: Car;
  onSuccess?: () => void;
}

export function CarForm({ car, onSuccess }: CarFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: car?.title || "",
    year: car?.year || new Date().getFullYear(),
    images: car?.images || [],
    shortDescription: car?.shortDescription || "",
    specs: {
      mileage: car?.specs.mileage || "",
      fuel: car?.specs.fuel || "",
      transmission: car?.specs.transmission || "",
      engine: car?.specs.engine || "",
      color: car?.specs.color || "",
      seats: car?.specs.seats || "",
    },
    price: car?.price || "",
    phone: car?.phone || CONTACT_PHONE,
    inspectionNotes: car?.inspectionNotes || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      if (formData.images.length === 0) {
        setError("Please upload at least one image");
        setLoading(false);
        return;
      }

      const url = car ? `/api/cars/${car.id}` : "/api/cars";
      const method = car ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save car");
      }

      setSuccess(true);
      
      // Show success message briefly before redirecting
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/admin/cars");
        }
      }, 1500);
    } catch (error: any) {
      setError(error.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 animate-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3 text-green-600 dark:text-green-400 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">
            {car ? "Car updated successfully!" : "Car created successfully! Redirecting..."}
          </span>
        </div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
            Car Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="e.g., Toyota Corolla 2019"
            className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
            Year *
          </label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            required
            min="1900"
            max={new Date().getFullYear() + 1}
            placeholder="2020"
            className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
          Short Description *
        </label>
        <textarea
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          required
          rows={3}
          placeholder="Brief description of the car..."
          className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all duration-200 resize-none"
        />
      </div>

      {/* Images */}
      <ImageUpload
        images={formData.images}
        onChange={(images) => setFormData({ ...formData, images })}
      />

      {/* Specs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text border-b-2 border-gray-200 dark:border-gray-800 pb-3">
          Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
              Mileage *
            </label>
            <input
              type="text"
              value={formData.specs.mileage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specs: { ...formData.specs, mileage: e.target.value },
                })
              }
              required
              placeholder="e.g., 50,000 km"
              className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
              Fuel Type *
            </label>
            <input
              type="text"
              value={formData.specs.fuel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specs: { ...formData.specs, fuel: e.target.value },
                })
              }
              required
              placeholder="e.g., Petrol, Diesel"
              className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
              Transmission
            </label>
            <input
              type="text"
              value={formData.specs.transmission}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specs: { ...formData.specs, transmission: e.target.value },
                })
              }
              placeholder="e.g., Automatic, Manual"
              className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
              Engine
            </label>
            <input
              type="text"
              value={formData.specs.engine}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specs: { ...formData.specs, engine: e.target.value },
                })
              }
              placeholder="e.g., 2.0L Turbo"
              className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
              Color
            </label>
            <input
              type="text"
              value={formData.specs.color}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specs: { ...formData.specs, color: e.target.value },
                })
              }
              placeholder="e.g., Black, White, Silver"
              className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
              Seats
            </label>
            <input
              type="text"
              value={formData.specs.seats}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specs: { ...formData.specs, seats: e.target.value },
                })
              }
              placeholder="e.g., 5"
              className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
            Price
          </label>
          <input
            type="text"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="e.g., $20,000"
            className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
            Contact Phone
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+93779536908"
            className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
          Inspection Notes
        </label>
        <textarea
          value={formData.inspectionNotes}
          onChange={(e) => setFormData({ ...formData, inspectionNotes: e.target.value })}
          rows={4}
          placeholder="Detailed inspection notes and findings..."
          className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all duration-200 resize-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <button
          type="submit"
          disabled={loading || success}
          className="flex-1 px-6 py-3.5 bg-gradient-to-r from-light-primary to-light-primary/90 dark:from-dark-primary dark:to-dark-primary/90 text-white rounded-xl font-semibold hover:from-light-primary/90 hover:to-light-primary/80 dark:hover:from-dark-primary/90 dark:hover:to-dark-primary/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : success ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              {car ? "Update Car" : "Create Car"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3.5 bg-gray-200 dark:bg-gray-800 text-light-text dark:text-dark-text rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

