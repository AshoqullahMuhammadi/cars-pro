import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCarById, updateCar, deleteCar } from "@/lib/db";
import { deleteImages } from "@/lib/upload";
import { z } from "zod";

const carUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  images: z.array(z.string()).min(1).optional(),
  shortDescription: z.string().min(1).optional(),
  specs: z.object({
    mileage: z.string(),
    fuel: z.string(),
    transmission: z.string().optional(),
    engine: z.string().optional(),
    color: z.string().optional(),
    seats: z.string().optional(),
  }).optional(),
  price: z.string().optional(),
  phone: z.string().optional(),
  inspectionNotes: z.string().optional(),
});

// GET - Get car by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const car = getCarById(params.id);
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }
    return NextResponse.json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json(
      { error: "Failed to fetch car" },
      { status: 500 }
    );
  }
}

// PUT - Update car
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = carUpdateSchema.parse(body);

    const car = updateCar(params.id, validatedData);
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error updating car:", error);
    return NextResponse.json(
      { error: "Failed to update car" },
      { status: 500 }
    );
  }
}

// DELETE - Delete car
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const car = getCarById(params.id);
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Delete associated images
    const imageFilenames = car.images
      .map((url) => {
        const match = url.match(/\/uploads\/cars\/(.+)$/);
        return match ? match[1] : null;
      })
      .filter((f): f is string => f !== null);

    if (imageFilenames.length > 0) {
      deleteImages(imageFilenames);
    }

    const success = deleteCar(params.id);
    if (!success) {
      return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json(
      { error: "Failed to delete car" },
      { status: 500 }
    );
  }
}

