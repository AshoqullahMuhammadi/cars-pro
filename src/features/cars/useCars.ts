"use client";

import { useState, useEffect } from "react";
import { Car } from "./types";

export function useCars(): Car[] {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((error) => {
        console.error("Error fetching cars:", error);
        // Fallback to empty array
        setCars([]);
      });
  }, []);

  return cars;
}

export function useCar(id: string): Car | undefined {
  const [car, setCar] = useState<Car | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((error) => {
        console.error("Error fetching car:", error);
        setCar(undefined);
      });
  }, [id]);

  return car;
}

