"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Phone, MessageCircle, Eye, ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { Car } from "./types";
import { WHATSAPP_URL, CALL_URL } from "@/lib/constants";

interface CarCardProps {
  car: Car;
  onViewDetails?: (car: Car) => void;
}

export function CarCard({ car, onViewDetails }: CarCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    // Only 3D tilt animation, no scale change
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    setIsHovered(false);
    // Reset to no rotation, no scale
    cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hello, I'm interested in the ${car.title}. Can you provide more details?`;
    window.open(`https://wa.me/93779536908?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-light-surface dark:bg-dark-surface rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ease-out cursor-pointer border border-gray-200/50 dark:border-gray-700/50 hover:border-light-primary/50 dark:hover:border-dark-primary/50 hover:shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: "preserve-3d",
      }}
      onClick={() => onViewDetails?.(car)}
    >
      {/* Image Container */}
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={car.images[0]}
          alt={car.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-125"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Year Badge */}
        <div className="absolute top-4 right-4 bg-light-primary dark:bg-dark-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
          {car.year}
        </div>

        {/* Price Badge */}
        {car.price && (
          <div className="absolute top-4 left-4 bg-light-accent dark:bg-dark-accent text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
            {car.price}
          </div>
        )}

        {/* View Details Overlay - Prominent */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="mb-4">
              <FileText className="w-12 h-12 mx-auto mb-2" />
              <p className="text-lg font-semibold">View Full Details</p>
              <p className="text-sm text-white/80 mt-1">Complete specs, images & inspection report</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full Inspection Report Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2 group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
          {car.title}
        </h3>
        <p className="text-light-muted dark:text-dark-muted text-sm mb-4 line-clamp-2">
          {car.shortDescription}
        </p>

        {/* Specs Preview */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="text-xs bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary px-3 py-1.5 rounded-full font-medium border border-light-primary/20 dark:border-dark-primary/20">
            {car.specs.mileage}
          </span>
          <span className="text-xs bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary px-3 py-1.5 rounded-full font-medium border border-light-primary/20 dark:border-dark-primary/20">
            {car.specs.fuel}
          </span>
          {car.specs.transmission && (
            <span className="text-xs bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary px-3 py-1.5 rounded-full font-medium border border-light-primary/20 dark:border-dark-primary/20">
              {car.specs.transmission}
            </span>
          )}
        </div>

        {/* Prominent View Details Button */}
        {onViewDetails && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(car);
            }}
            className="w-full mb-3 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-light-primary to-light-primary/80 dark:from-dark-primary dark:to-dark-primary/80 hover:from-light-primary/90 hover:to-light-primary/70 dark:hover:from-dark-primary/90 dark:hover:to-dark-primary/70 text-white rounded-xl transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] group/btn"
            aria-label={`View full details of ${car.title}`}
          >
            <Eye className="w-5 h-5" />
            <span>View Full Details</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleWhatsAppClick}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.02]"
            aria-label={`Contact via WhatsApp about ${car.title}`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>
          <a
            href={CALL_URL}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.02]"
            aria-label={`Call about ${car.title}`}
          >
            <Phone className="w-4 h-4" />
            <span>Call</span>
          </a>
        </div>
      </div>

      {/* 3D Effect Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(31, 111, 235, 0.15), transparent 70%)",
        }}
      />
    </div>
  );
}

