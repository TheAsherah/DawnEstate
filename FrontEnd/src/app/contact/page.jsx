import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import React from "react";

export const metadata = {
  title: "Contact Mooria Group | B2B Wholesale & OEM Private Label Desk",

  description:
    "Get in touch with Mooria Group's international trade department. Submit bulk inquiries, request custom OEM private labeling, and consult on ONSSA/Foodex export compliance.",

  keywords:
    "Contact Mooria Group, Moroccan skincare wholesale contact, bulk Argan oil supplier inquiry, private label cosmetics Morocco, ONSSA export compliance contact, B2B botanical export desk",

  authors: [{ name: "Mooria Group Export Team" }],
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Contact Mooria Group | B2B Botanical Export & Wholesale Support",
    description:
      "Connect with our export trade team for proforma catalogs, volume-tiered pricing, and custom private label formulation inquiries.",
    url: "https://www.mooriagroup.com/contact",
    siteName: "Mooria Group",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.mooriagroup.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Mooria Group - B2B Botanical Export Desk",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Mooria Group | International Trade Desk",
    description:
      "Direct B2B inquiries for certified Moroccan skincare, bulk botanical oils, and bespoke OEM packaging.",
    images: ["https://www.mooriagroup.com/og-image.jpg"],
  },

  alternates: {
    canonical: "https://www.mooriagroup.com/contact",
  },
};



function page() {
  return (
    <div>
      
      <Header />
      <CTA />
      <Footer />
    </div>
  );
}

export default page;
