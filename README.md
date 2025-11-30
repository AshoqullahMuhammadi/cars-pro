# CarShowcase - Next.js Car Showcase Website

A modern, responsive Next.js website for showcasing car photos with beautiful 3D card animations, dark/light theme support, integrated WhatsApp/call contact features, and admin management system.

## Features

- 🎨 **Modern UI** with dark and light theme support
- 📱 **Fully Responsive** design for all device types
- 🎭 **3D Card Animations** using CSS transforms
- 🚗 **Car Showcase** with featured carousel and grid gallery
- 💬 **WhatsApp Integration** for easy contact
- 📞 **Call Integration** with tel: links
- 🔐 **Admin Authentication** with NextAuth.js
- 📤 **Image Upload** system for car photos
- 🛠️ **Admin Dashboard** for managing car listings
- ♿ **Accessible** with ARIA labels and keyboard navigation
- 🔍 **SEO Optimized** with metadata and structured data
- 🏗️ **Feature-Based Architecture** for clean code organization

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Image Optimization:** Next.js Image component
- **Authentication:** NextAuth.js
- **Data Storage:** JSON files
- **Password Hashing:** bcryptjs
- **Validation:** Zod

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

2. Create admin user:

```bash
node scripts/create-admin.js
```

Follow the prompts to create your admin account.

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

1. Navigate to `/signin` to sign in with your admin credentials
2. After signing in, you'll be redirected to `/admin/dashboard`
3. From the admin dashboard, you can:
   - View all cars
   - Add new cars
   - Edit existing cars
   - Delete cars
   - Upload car images

## Project Structure

```
/src
  /app                    # Next.js App Router pages
    /admin                # Admin dashboard (protected)
    /api                  # API routes
    /about                # About Us page
    /services             # Services page
    /contact              # Contact page
    /cars/[id]           # Individual car detail page
    /signin              # Admin sign-in page
  /features               # Feature-based modules
    /cars                 # Car-related components and logic
    /theme                # Theme provider and toggle
    /navigation           # Navbar and Footer
  /components             # Shared components
    /admin                # Admin-specific components
  /lib                    # Utilities and constants
  /data                   # JSON data files
  /public
    /uploads              # Uploaded images
```

## Data Storage

- **Cars:** Stored in `/data/cars.json`
- **Users:** Stored in `/data/users.json`
- **Images:** Stored in `/public/uploads/cars/`

## Customization

### Adding Car Data

You can add cars through the admin dashboard or manually edit `/data/cars.json`:

```json
{
  "id": "unique-id",
  "title": "Car Name",
  "year": 2020,
  "images": ["/uploads/cars/image.jpg"],
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

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

For production, use a strong, random secret key.

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
3. Add environment variables in Vercel dashboard
4. Vercel will automatically detect Next.js and configure the build

### Important Notes for Production

- Set a strong `NEXTAUTH_SECRET` environment variable
- Ensure `/data` and `/public/uploads` directories are writable
- Consider migrating to a proper database for production use
- Use cloud storage (S3, Cloudinary) for images in production

## Security Considerations

- Passwords are hashed using bcrypt
- Admin routes are protected with NextAuth middleware
- File uploads are validated (type and size)
- Input validation using Zod schemas

## License

MIT

## Support

For questions or support, contact via WhatsApp: +93779536908
