"use client";

import React from "react";
import { CarCard } from "./CarCard";
import { Car } from "./types";

interface CarGridProps {
  cars: Car[];
  onViewDetails?: (car: Car) => void;
}

export function CarGrid({ cars, onViewDetails }: CarGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
}

