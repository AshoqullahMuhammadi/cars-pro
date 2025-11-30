import fs from "fs";
import path from "path";

const uploadsDir = path.join(process.cwd(), "public", "uploads", "cars");

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export function getUploadPath(filename: string): string {
  return path.join(uploadsDir, filename);
}

export function getPublicUrl(filename: string): string {
  return `/uploads/cars/${filename}`;
}

export function deleteImage(filename: string): boolean {
  try {
    const filePath = getUploadPath(filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
}

export function deleteImages(filenames: string[]): void {
  filenames.forEach((filename) => {
    deleteImage(filename);
  });
}

export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const ext = path.extname(originalName);
  const name = path.basename(originalName, ext).replace(/[^a-z0-9]/gi, "_");
  return `${name}_${timestamp}_${random}${ext}`;
}

