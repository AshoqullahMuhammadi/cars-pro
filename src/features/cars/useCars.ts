"use client";

import { useState, useEffect } from "react";
import { Car } from "./types";

export function useCars(): Car[] {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

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
      .then((data) => {
        setCars(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        // Fallback: Load from public JSON file (for static export/GitHub Pages)
        fetch("/cars.json")
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch cars.json");
            return res.json();
          })
          .then((data) => {
            setCars(Array.isArray(data) ? data : []);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching cars:", error);
            setCars([]);
            setLoading(false);
          });
      });
  }, []);

  return cars;
}

export function useCar(id: string): Car | undefined {
  const [car, setCar] = useState<Car | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    // Try API route first, fallback to static JSON for GitHub Pages
    fetch(`/api/cars/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // If API fails, try loading from static JSON
        throw new Error("API not available");
      })
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback: Load from public JSON file and find the car by ID
        fetch("/cars.json")
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch cars.json");
            return res.json();
          })
          .then((cars: Car[]) => {
            const foundCar = Array.isArray(cars) ? cars.find((c) => c.id === id) : undefined;
            setCar(foundCar);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching car:", error);
            setCar(undefined);
            setLoading(false);
          });
      });
  }, [id]);

  return car;
}

