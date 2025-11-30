import React from "react";
import { CarDetailPageClient } from "./CarDetailPageClient";
import { generateStaticParams as generateParams } from "./generateStaticParams";

// Export generateStaticParams for static export
export const generateStaticParams = generateParams;

// This is a server component wrapper that renders the client component
export default function CarDetailPage({ params }: { params: { id: string } }) {
  return <CarDetailPageClient carId={params.id} />;
}
