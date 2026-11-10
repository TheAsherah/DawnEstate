import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import React from "react";
import { ShieldCheck, Lock, Eye, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Privacy Governance | Mooria Group B2B Export Architecture",
  description:
    "Read Mooria Group's Privacy Policy. Learn how we protect, manage, and secure B2B trade data, wholesale buyer details, and custom OEM private label specifications.",
  keywords:
    "Mooria Group privacy policy, B2B data protection, cosmetics export governance, GDPR wholesale compliance, Moroccan skincare privacy schedule",
  authors: [{ name: "Mooria Group Legal Team" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Governance | Mooria Group B2B Export",
    description:
      "Official privacy practices and data protection standards for Mooria Group's international B2B buyers and distributors.",
    url: "https://www.mooriagroup.com/privacy-policy",
    siteName: "Mooria Group",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.mooriagroup.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mooria Group Corporate Privacy Statement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Mooria Group",
    description: "Data security protocols for global B2B cosmetics export and private label manufacturing.",
    images: ["https://www.mooriagroup.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.mooriagroup.com/privacy-policy",
  },
};

export default function PrivacyPolicy() {
  const lastUpdated = "July 2026";

  return (
    <>
      <Header />
      <main className="bg-[#FAFAFF] min-h-screen pt-32 pb-24 text-[#0F1115] font-satoshi">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* MINIMALIST ARCHITECTURAL HEADER */}
          <div className="border-b border-[#EDF2F7] pb-10 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF2F7] border border-[#EDF2F7] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B80C09]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#002855]">
                Corporate Governance
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#0F1115] leading-none mb-3">
              Privacy Policy
            </h1>
            <p className="text-[#0F1115]/50 text-xs font-semibold tracking-widest uppercase">
              Effective Date: {lastUpdated}
            </p>
          </div>

          {/* SAMPLE & ULTRA-CLEAN CONTENT STRUCTURE */}
          <div className="space-y-12">
            
            {/* PITCH INTRO */}
            <p className="text-base sm:text-lg font-medium text-[#0F1115]/80 leading-relaxed">
              At <strong>Mooria Group</strong>, we maintain rigorous corporate data governance to protect the intellectual property, contact details, and trade volume specifications shared with us by international buyers, retail distributors, and private-label partners.
            </p>

            {/* SECTION 1: DATA COLLECTION */}
            <div className="bg-white p-8 rounded-2xl border border-[#EDF2F7] shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-[#002855] pb-2 border-b border-[#EDF2F7]">
                <Eye size={20} className="text-[#B80C09]" />
                <h2 className="text-lg font-bold uppercase tracking-wide text-[#0F1115]">
                  1. Commercial Information Collection
                </h2>
              </div>
              
              <p className="text-xs sm:text-sm text-[#0F1115]/70 leading-relaxed">
                We gather essential trade data required for ONSSA/Foodex compliance, international customs clearance, and proforma invoicing:
              </p>

              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#0F1115]/80">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#002855] mt-1.5 flex-shrink-0" />
                  <span><strong>Entity Credentials:</strong> Corporate name, representative title, destination country, business tax IDs, and official email addresses.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#002855] mt-1.5 flex-shrink-0" />
                  <span><strong>Formulation & Order Data:</strong> Custom private-label packaging specs, batch sizes, fragrance choices, and bulk freight preferences.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#002855] mt-1.5 flex-shrink-0" />
                  <span><strong>Technical Telemetry:</strong> Anonymized web interaction data used strictly to optimize catalog loading times and Core Web Vitals.</span>
                </li>
              </ul>
            </div>

            {/* SECTION 2: DATA USAGE */}
            <div className="bg-white p-8 rounded-2xl border border-[#EDF2F7] shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-[#002855] pb-2 border-b border-[#EDF2F7]">
                <Lock size={20} className="text-[#B80C09]" />
                <h2 className="text-lg font-bold uppercase tracking-wide text-[#0F1115]">
                  2. Supply Chain Utilization
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#0F1115]/70 leading-relaxed">
                Your business data is strictly restricted to functional B2B trade execution:
              </p>

              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#0F1115]/80">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#002855] mt-1.5 flex-shrink-0" />
                  <span>Issuing binding B2B proforma invoices and volume-tiered wholesale quotes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#002855] mt-1.5 flex-shrink-0" />
                  <span>Generating export documentation, certificate of origin filings, and bill of lading (BoL) records.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#002855] mt-1.5 flex-shrink-0" />
                  <span>Dispatching physical sample allocations and OEM design proofs.</span>
                </li>
              </ul>
            </div>

            {/* SECTION 3: CORPORATE CONTACT BOX */}
            <div className="bg-white p-8 rounded-2xl border border-[#EDF2F7] shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-[#EDF2F7]">
                <ShieldCheck size={20} className="text-[#002855]" />
                <h2 className="text-lg font-bold uppercase tracking-wide text-[#0F1115]">
                  3. Trade Relations & Data Rights
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#0F1115]/70 leading-relaxed">
                Mooria Group never sells, trades, or leases corporate client lists to third-party brokers. To update your commercial credentials or request full record removal, contact our compliance desk:
              </p>

              <div className="pt-2 space-y-2 text-xs sm:text-sm text-[#0F1115] font-semibold">
                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-[#002855]" />
                  <span>Email:</span>
                  <a href="mailto:corporate@mooriagroup.com" className="text-[#002855] hover:underline font-bold">
                    corporate@mooriagroup.com
                  </a>
                </p>
                <p className="flex items-start gap-2 pt-1">
                  <MapPin size={14} className="text-[#002855] flex-shrink-0 mt-0.5" />
                  <span className="font-normal text-[#0F1115]/70">
                    <strong>Corporate Headquarters:</strong> Casablanca Finance City (CFC), Casablanca, Morocco
                  </span>
                </p>
              </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}