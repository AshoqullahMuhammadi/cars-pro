import fs from "fs";
import path from "path";
import { Car } from "@/features/cars/types";

const dataDir = path.join(process.cwd(), "data");
const carsFilePath = path.join(dataDir, "cars.json");
const usersFilePath = path.join(dataDir, "users.json");
const sourceCarsPath = path.join(process.cwd(), "src", "features", "cars", "cars.json");

// Initialize data directory and files
export function initializeData() {
  // Ensure data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Initialize cars.json - migrate from source if it exists and target is empty
  if (!fs.existsSync(carsFilePath)) {
    if (fs.existsSync(sourceCarsPath)) {
      // Copy existing cars data
      const sourceData = fs.readFileSync(sourceCarsPath, "utf-8");
      fs.writeFileSync(carsFilePath, sourceData);
    } else {
      // Create empty array
      fs.writeFileSync(carsFilePath, JSON.stringify([], null, 2));
    }
  } else {
    // If cars.json exists but is empty, try to migrate from source
    const existingData = fs.readFileSync(carsFilePath, "utf-8");
    const cars = JSON.parse(existingData);
    if (cars.length === 0 && fs.existsSync(sourceCarsPath)) {
      const sourceData = fs.readFileSync(sourceCarsPath, "utf-8");
      fs.writeFileSync(carsFilePath, sourceData);
    }
  }

  // Initialize users.json if it doesn't exist
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
  }
}

// Call initialization on module load
initializeData();

