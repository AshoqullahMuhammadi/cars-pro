"use client";

import { useState, useEffect } from "react";
import { Car } from "./types";

export function useCars(): Car[] {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    // Try API route first, fallback to static JSON for GitHub Pages
    fetch("/api/cars")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // If API fails, try loading from static JSON
        throw new Error("API not available");
      })
      .then((data) => setCars(data))
      .catch(() => {
        // Fallback: Load from public JSON file (for static export)
        fetch("/cars.json")
          .then((res) => res.json())
          .then((data) => setCars(data))
          .catch((error) => {
            console.error("Error fetching cars:", error);
            setCars([]);
          });
      });
  }, []);

  return cars;
}

export function useCar(id: string): Car | undefined {
  const [car, setCar] = useState<Car | undefined>(undefined);

  useEffect(() => {
    // Try API route first, fallback to static JSON for GitHub Pages
    fetch(`/api/cars/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // If API fails, try loading from static JSON
        throw new Error("API not available");
      })
      .then((data) => setCar(data))
      .catch(() => {
        // Fallback: Load from public JSON file and find the car by ID
        fetch("/cars.json")
          .then((res) => res.json())
          .then((cars: Car[]) => {
            const foundCar = cars.find((c) => c.id === id);
            setCar(foundCar);
          })
          .catch((error) => {
            console.error("Error fetching car:", error);
            setCar(undefined);
          });
      });
  }, [id]);

  return car;
}

