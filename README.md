# CarShowcase - Next.js Car Showcase Website

A modern, responsive Next.js website for showcasing car photos with beautiful 3D card animations, dark/light theme support, and integrated WhatsApp/call contact features.

## Features

- 🎨 **Modern UI** with dark and light theme support
- 📱 **Fully Responsive** design for all device types
- 🎭 **3D Card Animations** using CSS transforms
- 🚗 **Car Showcase** with featured carousel and grid gallery
- 💬 **WhatsApp Integration** for easy contact
- 📞 **Call Integration** with tel: links
- ♿ **Accessible** with ARIA labels and keyboard navigation
- 🔍 **SEO Optimized** with metadata and structured data
- 🏗️ **Feature-Based Architecture** for clean code organization

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Image Optimization:** Next.js Image component

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/src
  /app                    # Next.js App Router pages
    /about                # About Us page
    /services             # Services page
    /contact              # Contact page
    /cars/[id]           # Individual car detail page
  /features               # Feature-based modules
    /cars                 # Car-related components and logic
    /theme                # Theme provider and toggle
    /navigation           # Navbar and Footer
  /components             # Shared components
  /lib                    # Utilities and constants
  /public                 # Static assets
```

## Customization

### Adding Car Data

Edit `/src/features/cars/cars.json` to add or modify car listings:

```json
{
  "id": "unique-id",
  "title": "Car Name",
  "year": 2020,
  "images": ["/path/to/image.jpg"],
  "shortDescription": "Description",
  "specs": {
    "mileage": "50,000 km",
    "fuel": "Petrol"
  },
  "price": "$20,000",
  "phone": "+93779536908",
  "inspectionNotes": "Inspection details"
}
```

### Contact Information

Update contact details in `/src/lib/constants.ts`:

```typescript
export const CONTACT_PHONE = "+93779536908";
```

### Theme Colors

Customize theme colors in `/tailwind.config.ts`:

```typescript
colors: {
  light: {
    primary: "#1F6FEB",
    // ... other colors
  },
  dark: {
    primary: "#58A6FF",
    // ... other colors
  },
}
```

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This project is ready to deploy on Vercel, Netlify, or any platform that supports Next.js.

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build

## Features in Detail

### 3D Card Effects

Car cards feature CSS 3D transforms that tilt on hover, creating an engaging visual experience. The effect is smooth and performant, with graceful fallbacks for devices that don't support 3D transforms.

### Theme System

The theme system uses React Context and localStorage to persist user preferences. The dark and light themes are carefully designed with proper contrast ratios for accessibility.

### Contact Integration

- **WhatsApp:** Opens WhatsApp chat with pre-filled message
- **Call:** Opens phone dialer with the contact number
- All contact buttons are accessible and include proper ARIA labels

### Responsive Design

The layout adapts seamlessly:
- Mobile: 1 column grid
- Tablet: 2 column grid
- Desktop: 3-4 column grid

## License

MIT

## Support

For questions or support, contact via WhatsApp: +93779536908

