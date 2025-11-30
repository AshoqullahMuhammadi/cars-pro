"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, Phone, ChevronLeft, ChevronRight, ArrowDown, Sparkles } from "lucide-react";
import { CarGrid, CarDetailsModal, useCars } from "@/features/cars";
import { WHATSAPP_URL, CALL_URL, SERVICE_DESCRIPTION } from "@/lib/constants";
import { Car } from "@/features/cars/types";
import { useTheme } from "@/features/theme";

export default function HomePage() {
  const cars = useCars();
  const { theme } = useTheme();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get featured cars (first 3 for carousel)
  const featuredCars = cars.slice(0, 3);
  
  const isDark = theme === "dark";

  const nextFeatured = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredCars.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const prevFeatured = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentFeaturedIndex((prev) => (prev - 1 + featuredCars.length) % featuredCars.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (featuredCars.length > 1) {
      const interval = setInterval(() => {
        if (!isAnimating) {
          setIsAnimating(true);
          setCurrentFeaturedIndex((prev) => (prev + 1) % featuredCars.length);
          setTimeout(() => setIsAnimating(false), 700);
        }
      }, 6000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featuredCars.length]);

  return (
    <div>
      {/* Full Screen Hero / Showcase Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-light-bg dark:bg-dark-bg">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-light-primary/20 via-light-accent/10 to-light-primary/20 dark:from-dark-primary/20 dark:via-dark-accent/10 dark:to-dark-primary/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(31,111,235,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(88,166,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,122,89,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(255,139,107,0.1),transparent_50%)]" />
        </div>

        {/* Floating Particles Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-light-primary/20 dark:bg-dark-primary/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Featured Car Showcase */}
        {featuredCars.length > 0 && (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Carousel Container - Full Width */}
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentFeaturedIndex * 100}%)`,
                }}
              >
                {featuredCars.map((car, index) => {
                  const isActive = index === currentFeaturedIndex;
                  return (
                    <div
                      key={car.id}
                      className="min-w-full h-full w-full relative flex items-center justify-center"
                    >
                      {/* Background Image with Grey Effect - Full Width */}
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        {/* Main Car Image - Full Width */}
                        <Image
                          src={car.images[0]}
                          alt={car.title}
                          fill
                          className={`object-cover w-full h-full transition-all duration-1000 ${
                            isActive ? "scale-110" : "scale-100"
                          }`}
                          priority={isActive}
                          sizes="100vw"
                          quality={90}
                        />
                        {/* Grey Overlay Effect - Theme Aware with Multiple Layers */}
                        <div
                          className={`absolute inset-0 w-full h-full transition-all duration-500 ${
                            isDark
                              ? "bg-gradient-to-r from-black/90 via-black/80 to-black/90"
                              : "bg-gradient-to-r from-black/75 via-black/65 to-black/75"
                          }`}
                        />
                        {/* Additional Grey Gradient Overlay */}
                        <div
                          className={`absolute inset-0 w-full h-full ${
                            isDark
                              ? "bg-gradient-to-b from-transparent via-black/25 to-black/50"
                              : "bg-gradient-to-b from-transparent via-black/35 to-black/60"
                          }`}
                        />
                        {/* Subtle Grey Tint for Better Effect */}
                        <div
                          className={`absolute inset-0 w-full h-full ${
                            isDark
                              ? "bg-gradient-to-t from-black/60 via-transparent to-transparent"
                              : "bg-gradient-to-t from-black/70 via-transparent to-transparent"
                          }`}
                        />
                      </div>

                      {/* Content Overlay */}
                      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <div
                          className={`transform transition-all duration-700 ${
                            isActive
                              ? "opacity-100 translate-y-0 scale-100"
                              : "opacity-0 translate-y-10 scale-95"
                          }`}
                        >
                          {/* Badge */}
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20 shadow-lg">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium">Featured Vehicle</span>
                          </div>

                          {/* Title */}
                          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight px-4">
                            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent drop-shadow-2xl">
                              {car.title}
                            </span>
                          </h1>

                          {/* Description */}
                          <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-4">
                            {car.shortDescription}
                          </p>

                          {/* Info Badges */}
                          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-4">
                            <div className="px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg hover:bg-white/15 transition-all">
                              <div className="text-xs sm:text-sm text-white/70 mb-1">Year</div>
                              <div className="text-xl sm:text-2xl font-bold">{car.year}</div>
                            </div>
                            {car.price && (
                              <div className="px-4 sm:px-6 py-2 sm:py-3 bg-light-accent/90 dark:bg-dark-accent/90 backdrop-blur-md rounded-full shadow-lg hover:scale-105 transition-transform">
                                <div className="text-xs sm:text-sm text-white/90 mb-1">Price</div>
                                <div className="text-xl sm:text-2xl font-bold text-white">{car.price}</div>
                              </div>
                            )}
                            <div className="px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg hover:bg-white/15 transition-all">
                              <div className="text-xs sm:text-sm text-white/70 mb-1">Mileage</div>
                              <div className="text-xl sm:text-2xl font-bold">{car.specs.mileage}</div>
                            </div>
                          </div>

                          {/* CTA Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                            <button
                              onClick={() => setSelectedCar(car)}
                              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-light-primary dark:text-dark-primary rounded-full font-semibold text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/30 flex items-center justify-center gap-2"
                            >
                              <span>View Full Details</span>
                              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
                            </button>
                            <a
                              href={WHATSAPP_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/30 flex items-center justify-center gap-2"
                            >
                              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="hidden sm:inline">Contact via WhatsApp</span>
                              <span className="sm:hidden">WhatsApp</span>
                            </a>
                            <a
                              href={CALL_URL}
                              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                            >
                              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span>Call Us</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Carousel Controls */}
              {featuredCars.length > 1 && (
                <>
                  <button
                    onClick={prevFeatured}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-300 border border-white/20 hover:scale-110"
                    aria-label="Previous car"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextFeatured}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-300 border border-white/20 hover:scale-110"
                    aria-label="Next car"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Indicators */}
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                    {featuredCars.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (!isAnimating) {
                            setIsAnimating(true);
                            setCurrentFeaturedIndex(index);
                            setTimeout(() => setIsAnimating(false), 700);
                          }
                        }}
                        className={`h-3 rounded-full transition-all duration-300 ${
                          index === currentFeaturedIndex
                            ? "w-12 bg-white shadow-lg"
                            : "w-3 bg-white/40 hover:bg-white/60"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block">
              <div className="flex flex-col items-center gap-2 text-white/70 animate-bounce">
                <span className="text-sm font-medium">Scroll to explore</span>
                <ArrowDown className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Car Gallery Section */}
      <section id="showcase" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-light-primary dark:text-dark-primary font-semibold text-sm uppercase tracking-wider">
              Our Collection
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-light-text dark:text-dark-text mb-6">
            Explore Our Vehicles
          </h2>
          <p className="text-xl text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
            Browse our carefully inspected and analyzed vehicles. Click on any car to view complete details, specifications, and inspection reports.
          </p>
        </div>
        <CarGrid cars={cars} onViewDetails={setSelectedCar} />
      </section>

      {/* Car Details Modal */}
      {selectedCar && (
        <CarDetailsModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </div>
  );
}

