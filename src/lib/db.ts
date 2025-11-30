import fs from "fs";
import path from "path";
import { Car } from "@/features/cars/types";
import "./db-init"; // Initialize data on import

const dataDir = path.join(process.cwd(), "data");
const carsFilePath = path.join(dataDir, "cars.json");
const usersFilePath = path.join(dataDir, "users.json");

// Cars operations
export function getCars(): Car[] {
  try {
    const data = fs.readFileSync(carsFilePath, "utf-8");
    return JSON.parse(data) as Car[];
  } catch (error) {
    console.error("Error reading cars:", error);
    return [];
  }
}

export function saveCars(cars: Car[]): void {
  try {
    fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2));
  } catch (error) {
    console.error("Error saving cars:", error);
    throw new Error("Failed to save cars data");
  }
}

export function getCarById(id: string): Car | null {
  const cars = getCars();
  return cars.find((car) => car.id === id) || null;
}

export function addCar(car: Car): Car {
  const cars = getCars();
  cars.push(car);
  saveCars(cars);
  return car;
}

export function updateCar(id: string, updatedCar: Partial<Car>): Car | null {
  const cars = getCars();
  const index = cars.findIndex((car) => car.id === id);
  
  if (index === -1) {
    return null;
  }
  
  cars[index] = { ...cars[index], ...updatedCar };
  saveCars(cars);
  return cars[index];
}

export function deleteCar(id: string): boolean {
  const cars = getCars();
  const filteredCars = cars.filter((car) => car.id !== id);
  
  if (filteredCars.length === cars.length) {
    return false; // Car not found
  }
  
  saveCars(filteredCars);
  return true;
}

// Users operations
export interface User {
  id: string;
  email: string;
  password: string; // Hashed
  name?: string;
  role: "admin" | "user";
  createdAt: string;
}

export function getUsers(): User[] {
  try {
    const data = fs.readFileSync(usersFilePath, "utf-8");
    return JSON.parse(data) as User[];
  } catch (error) {
    console.error("Error reading users:", error);
    return [];
  }
}

export function saveUsers(users: User[]): void {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error saving users:", error);
    throw new Error("Failed to save users data");
  }
}

export function getUserByEmail(email: string): User | null {
  const users = getUsers();
  return users.find((user) => user.email === email) || null;
}

export function createUser(user: Omit<User, "id" | "createdAt">): User {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

