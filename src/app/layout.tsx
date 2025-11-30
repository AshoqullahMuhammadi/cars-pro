import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/features/theme";
import { Layout } from "@/components/Layout";
import { SessionProvider } from "@/components/SessionProvider";
import { generateOrganizationStructuredData } from "@/lib/structured-data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CarShowcase - Professional Car Inspection & Analysis",
  description: "Inspection & analyzing of cars. Visit our office or contact us via WhatsApp. Browse our collection of inspected vehicles.",
  keywords: "car inspection, car analysis, used cars, vehicle inspection, car showcase",
  openGraph: {
    title: "CarShowcase - Professional Car Inspection & Analysis",
    description: "Inspection & analyzing of cars. Visit our office or contact us via WhatsApp.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = generateOrganizationStructuredData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Script
          id="organization-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationData),
          }}
        />
        <SessionProvider>
          <ThemeProvider>
            <Layout>{children}</Layout>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

