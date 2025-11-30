import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCars, addCar, saveCars } from "@/lib/db";
import { Car } from "@/features/cars/types";
import { z } from "zod";

const carSchema = z.object({
  title: z.string().min(1),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  images: z.array(z.string()).min(1),
  shortDescription: z.string().min(1),
  specs: z.object({
    mileage: z.string(),
    fuel: z.string(),
    transmission: z.string().optional(),
    engine: z.string().optional(),
    color: z.string().optional(),
    seats: z.string().optional(),
  }),
  price: z.string().optional(),
  phone: z.string(),
  inspectionNotes: z.string().optional(),
});

// GET - Get all cars
export async function GET() {
  try {
    const cars = getCars();
    return NextResponse.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}

// POST - Create new car
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate input
    const validatedData = carSchema.parse(body);

    // Generate ID
    const newCar: Car = {
      ...validatedData,
      id: Date.now().toString(),
      phone: validatedData.phone || "+93779536908",
    };

    const car = addCar(newCar);
    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating car:", error);
    return NextResponse.json(
      { error: "Failed to create car" },
      { status: 500 }
    );
  }
}

