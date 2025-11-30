"use client";

import React from "react";
import { useCar } from "@/features/cars";
import { ImageGallery } from "@/components/ImageGallery";
import { Phone, MessageCircle } from "lucide-react";
import { CALL_URL } from "@/lib/constants";

interface CarDetailPageClientProps {
  carId: string;
}

export function CarDetailPageClient({ carId }: CarDetailPageClientProps) {
  const car = useCar(carId);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Give time for car to load
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [car]);

  if (loading && !car) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-16 h-16 border-4 border-light-primary dark:border-dark-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-light-muted dark:text-dark-muted">Loading car details...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-4">
          Car Not Found
        </h1>
        <p className="text-light-muted dark:text-dark-muted mb-6">
          The car you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-light-primary dark:bg-dark-primary text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          Return to Homepage
        </a>
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    const message = `Hello, I'm interested in the ${car.title}. Can you provide more details?`;
    window.open(`https://wa.me/93779536908?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Image Gallery */}
        <div>
          <ImageGallery images={car.images} title={car.title} />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-2">
              {car.title}
            </h1>
            <p className="text-light-muted dark:text-dark-muted text-lg mb-4">
              {car.shortDescription}
            </p>
            {car.price && (
              <div className="text-3xl font-bold text-light-accent dark:text-dark-accent">
                {car.price}
              </div>
            )}
          </div>

          {/* Specifications */}
          <div>
            <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-4">
              Specifications
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(car.specs).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
                >
                  <div className="text-xs text-light-muted dark:text-dark-muted uppercase mb-1">
                    {key}
                  </div>
                  <div className="text-lg font-semibold text-light-text dark:text-dark-text">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inspection Notes */}
          {car.inspectionNotes && (
            <div>
              <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-4">
                Inspection Notes
              </h2>
              <p className="text-light-muted dark:text-dark-muted bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                {car.inspectionNotes}
              </p>
            </div>
          )}

          {/* Contact CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleWhatsAppClick}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
            >
              <MessageCircle className="w-5 h-5" />
              Contact via WhatsApp
            </button>
            <a
              href={CALL_URL}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

