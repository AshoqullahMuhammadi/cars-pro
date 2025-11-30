"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({ images, onChange, maxImages = 10 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();
      onChange([...images, ...data.files]);
    } catch (error: any) {
      alert(error.message || "Failed to upload images");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-3">
        Car Images {images.length > 0 && <span className="text-light-muted dark:text-dark-muted font-normal">({images.length}/{maxImages})</span>}
      </label>

      {/* Upload Button */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading || images.length >= maxImages}
        className="w-full p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-light-primary dark:hover:border-dark-primary hover:bg-light-primary/5 dark:hover:bg-dark-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-3 group"
      >
        {uploading ? (
          <>
            <div className="w-10 h-10 border-3 border-light-primary dark:border-dark-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-light-muted dark:text-dark-muted font-medium">Uploading images...</span>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-light-primary/10 dark:bg-dark-primary/10 rounded-xl flex items-center justify-center group-hover:bg-light-primary/20 dark:group-hover:bg-dark-primary/20 transition-colors">
              <Upload className="w-8 h-8 text-light-primary dark:text-dark-primary" />
            </div>
            <div className="text-center">
              <span className="text-light-text dark:text-dark-text font-medium block">
                Click to upload images
              </span>
              <span className="text-light-muted dark:text-dark-muted text-sm">
                PNG, JPG, WEBP up to 5MB each (max {maxImages} images)
              </span>
            </div>
          </>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((url, index) => (
              <div
                key={index}
                className="relative group aspect-square rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-light-primary dark:hover:border-dark-primary transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <Image
                  src={url}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg transform hover:scale-110"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold rounded-full shadow-lg">
                    Main Image
                  </div>
                )}
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
          {images.length > 1 && (
            <p className="text-xs text-light-muted dark:text-dark-muted mt-3 text-center">
              First image will be used as the main display image
            </p>
          )}
        </div>
      )}
    </div>
  );
}

