import fs from 'fs';
import path from 'path';
import { Car } from '@/features/cars/types';

// This function generates all static paths for car detail pages
// It reads from cars.json which is copied to public during build
export async function generateStaticParams() {
  // Try to read from data/cars.json first (for build time)
  const dataPath = path.join(process.cwd(), 'data', 'cars.json');
  const publicPath = path.join(process.cwd(), 'public', 'cars.json');
  
  let cars: Car[] = [];
  
  try {
    // Try data directory first
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf-8');
      cars = JSON.parse(fileContent);
    } 
    // Fallback to public directory (if data doesn't exist yet)
    else if (fs.existsSync(publicPath)) {
      const fileContent = fs.readFileSync(publicPath, 'utf-8');
      cars = JSON.parse(fileContent);
    }
  } catch (error) {
    console.error('Error reading cars.json for generateStaticParams:', error);
    // Return empty array if file doesn't exist or can't be parsed
    return [];
  }

  // Return array of params for each car
  return cars.map((car) => ({
    id: car.id,
  }));
}

