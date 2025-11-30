import { Car } from "@/features/cars/types";

export function generateCarStructuredData(car: Car) {
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "name": car.title,
    "description": car.shortDescription,
    "image": car.images,
    "brand": {
      "@type": "Brand",
      "name": car.title.split(" ")[0],
    },
    "model": car.title,
    "productionDate": car.year.toString(),
    "vehicleIdentificationNumber": car.id,
    ...(car.price && {
      "offers": {
        "@type": "Offer",
        "price": car.price.replace(/[^0-9.]/g, ""),
        "priceCurrency": "USD",
      },
    }),
  };
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CarShowcase",
    "description": "Professional car inspection and analysis services",
    "url": "https://carshowcase.com",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+93779536908",
      "contactType": "Customer Service",
    },
  };
}

export function generateServiceStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Car Inspection and Analysis",
    "provider": {
      "@type": "Organization",
      "name": "CarShowcase",
    },
    "areaServed": "Worldwide",
    "description": "Inspection & analyzing of cars. Visit our office or contact us via WhatsApp.",
  };
}

