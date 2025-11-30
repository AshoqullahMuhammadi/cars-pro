"use client";

import React from "react";
import { X, Phone, MessageCircle } from "lucide-react";
import { Car } from "./types";
import { ImageGallery } from "@/components/ImageGallery";
import { CALL_URL } from "@/lib/constants";

interface CarDetailsModalProps {
  car: Car | null;
  onClose: () => void;
}

export function CarDetailsModal({ car, onClose }: CarDetailsModalProps) {
  if (!car) return null;

  const handleWhatsAppClick = () => {
    const message = `Hello, I'm interested in the ${car.title}. Can you provide more details?`;
    window.open(`https://wa.me/93779536908?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh] bg-light-surface dark:bg-dark-surface rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-gray-200/50 dark:border-gray-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Badge */}
        <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-light-primary/90 dark:bg-dark-primary/90 backdrop-blur-sm text-white rounded-full text-sm font-semibold shadow-lg">
          Full Details Available
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {/* Image Gallery */}
          <div className="p-6 pb-4">
            <ImageGallery images={car.images} title={car.title} />
          </div>

          {/* Details */}
          <div className="p-6 pt-0 space-y-8">
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-3">
                {car.title}
              </h2>
              <p className="text-lg text-light-muted dark:text-dark-muted mb-4">
                {car.shortDescription}
              </p>
              {car.price && (
                <div className="inline-block px-6 py-3 bg-gradient-to-r from-light-accent to-light-accent/80 dark:from-dark-accent dark:to-dark-accent/80 text-white rounded-xl text-2xl font-bold shadow-lg">
                  {car.price}
                </div>
              )}
            </div>

            {/* Specifications */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-8 bg-light-primary dark:bg-dark-primary rounded-full" />
                <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">
                  Complete Specifications
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(car.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-light-primary dark:hover:border-dark-primary transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="text-xs text-light-muted dark:text-dark-muted uppercase mb-2 font-semibold tracking-wider">
                      {key}
                    </div>
                    <div className="text-lg font-bold text-light-text dark:text-dark-text">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inspection Notes */}
            {car.inspectionNotes && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-8 bg-light-accent dark:bg-dark-accent rounded-full" />
                  <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">
                    Professional Inspection Report
                  </h3>
                </div>
                <div className="bg-gradient-to-br from-light-primary/5 to-light-accent/5 dark:from-dark-primary/5 dark:to-dark-accent/5 border border-light-primary/20 dark:border-dark-primary/20 p-6 rounded-xl">
                  <p className="text-light-muted dark:text-dark-muted leading-relaxed text-lg">
                    {car.inspectionNotes}
                  </p>
                </div>
              </div>
            )}

            {/* Contact CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200 dark:border-gray-800">
              <button
                onClick={handleWhatsAppClick}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02]"
                aria-label={`Contact via WhatsApp about ${car.title}`}
              >
                <MessageCircle className="w-6 h-6" />
                <span>Contact via WhatsApp</span>
              </button>
              <a
                href={CALL_URL}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02]"
                aria-label={`Call about ${car.title}`}
              >
                <Phone className="w-6 h-6" />
                <span>Call Us Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

