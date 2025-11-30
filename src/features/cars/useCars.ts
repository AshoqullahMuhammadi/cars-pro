import { Car } from "./types";
import carsData from "./cars.json";

export function useCars(): Car[] {
  return carsData as Car[];
}

export function useCar(id: string): Car | undefined {
  const cars = useCars();
  return cars.find((car) => car.id === id);
}

