export interface Car {
  id: string;
  title: string;
  year: number;
  images: string[];
  shortDescription: string;
  specs: {
    mileage: string;
    fuel: string;
    transmission?: string;
    engine?: string;
    color?: string;
    seats?: string;
  };
  price?: string;
  phone: string;
  inspectionNotes?: string;
}

