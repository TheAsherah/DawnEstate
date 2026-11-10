import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { Scale, ShieldCheck, Globe } from "lucide-react";
import React from "react";

export const metadata = {
  title: "Terms of Supply & Governance | Mooria Group B2B Exporter",
  description:
    "Review Mooria Group's international B2B Terms of Supply. Comprehensive legal framework governing wholesale bulk orders, ONSSA/Foodex export compliance, and OEM private label contracts.",
  keywords:
    "Mooria Group terms of service, B2B cosmetics export terms, Moroccan wholesale supply agreement, OEM private label contract, Incoterms FOB Casablanca, ONSSA certified exporter terms",
  authors: [{ name: "Mooria Group Legal Team" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms of Supply & B2B Governance | Mooria Group",
    description:
      "Review the legal protocols and commercial terms governing Mooria Group's international wholesale and private label manufacturing supply chain.",
    url: "https://www.mooriagroup.com/terms-of-service",
    siteName: "Mooria Group",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.mooriagroup.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mooria Group B2B Supply Terms & Governance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Supply | Mooria Group B2B Exporter",
    description:
      "Official trade terms governing international cosmetics supply, bulk export, and OEM manufacturing.",
    images: ["https://www.mooriagroup.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.mooriagroup.com/terms-of-service",
  },
};

export default function TermsOfService() {
  const lastUpdated = "July 2026";

  return (
    <>
      <Header />
      <main className="bg-[#FAFAFF] min-h-screen pt-32 pb-24 text-[#0F1115] font-satoshi">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* ARCHITECTURAL HEADER */}
          <div className="border-b border-[#EDF2F7] pb-10 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF2F7] border border-[#EDF2F7] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B80C09]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#002855]">
                Corporate Legal Desk
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#0F1115] leading-none mb-3">
              Terms of Supply
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-[#0F1115]/60 tracking-wider uppercase">
              <span>Effective Date: {lastUpdated}</span>
              <span>•</span>
              <span>Incoterms 2020 Compliant</span>
              <span>•</span>
              <span>Jurisdiction: Casablanca, Morocco</span>
            </div>
          </div>

          {/* 3 HIGHLIGHT PILLARS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl border border-[#EDF2F7] shadow-sm space-y-2">
              <Globe className="text-[#002855]" size={22} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F1115]">
                Global Export Freight
              </h2>
              <p className="text-[11px] text-[#0F1115]/60 leading-relaxed font-medium">
                Standardized FOB Casablanca and EXW terms for containerized maritime & air shipments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EDF2F7] shadow-sm space-y-2">
              <ShieldCheck className="text-[#B80C09]" size={22} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F1115]">
                Certified Formulations
              </h2>
              <p className="text-[11px] text-[#0F1115]/60 leading-relaxed font-medium">
                All production batches adhere strictly to ONSSA, Foodex & European cosmetic safety regulations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EDF2F7] shadow-sm space-y-2">
              <Scale className="text-[#002855]" size={22} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F1115]">
                OEM IP Protection
              </h2>
              <p className="text-[11px] text-[#0F1115]/60 leading-relaxed font-medium">
                Bespoke private label packaging and custom formulas remain the protected IP of client brands.
              </p>
            </div>
          </div>

          {/* MAIN LEGAL PROVISIONS */}
          <div className="space-y-10">
            
            {/* SECTION 1 */}
            <div className="bg-white p-8 rounded-2xl border border-[#EDF2F7] shadow-sm space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wide text-[#0F1115] pb-2 border-b border-[#EDF2F7]">
                1. Binding Commercial Agreement
              </h2>
              <p className="text-xs sm:text-sm text-[#0F1115]/70 leading-relaxed">
                By issuing a purchase order (PO), clearing a proforma deposit invoice, or contracting custom OEM manufacturing with Mooria Group (&quot;the Exporter,&quot; &quot;we,&quot; or &quot;us&quot;), your corporate entity binds itself to these universal Terms of Supply.
              </p>
            </div>

            {/* SECTION 2 */}
            <div className="bg-white p-8 rounded-2xl border border-[#EDF2F7] shadow-sm space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wide text-[#0F1115] pb-2 border-b border-[#EDF2F7]">
                2. Minimum Order Quantities (MOQ) & Pricing
              </h2>
              <p className="text-xs sm:text-sm text-[#0F1115]/70 leading-relaxed">
                Proforma quotes remain firm for exactly 14 calendar days from issuance. All bulk transactions are bound by product-specific Minimum Order Quantities (MOQs). We reserve the right to cancel batch production runs if initial deposit requirements are unfulfilled.
              </p>
            </div>

            {/* SECTION 3 */}
            <div className="bg-white p-8 rounded-2xl border border-[#EDF2F7] shadow-sm space-y-4">
              <h2 className="text-lg font-bold uppercase tracking-wide text-[#0F1115] pb-2 border-b border-[#EDF2F7]">
                3. Export Freight & Quality Compliance
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#0F1115]/80">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#002855] mt-1.5 flex-shrink-0" />
                  <span><strong>Incoterms Delivery:</strong> Shipments are executed on Free On Board (FOB) Casablanca Port or Ex Works (EXW) terms unless explicit CIF/DDP terms are notarized.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#002855] mt-1.5 flex-shrink-0" />
                  <span><strong>Inspection Period:</strong> Buyers are granted 5 business days upon destination port clearance to log physical batch discrepancies or container damage claims.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#002855] mt-1.5 flex-shrink-0" />
                  <span><strong>Customs Documentation:</strong> Certificate of Origin (CoO), Sanitary Certificates, and EUR.1 movement forms are provided per container allocation.</span>
                </li>
              </ul>
            </div>

            {/* SECTION 4 */}
            <div className="bg-white p-8 rounded-2xl border border-[#EDF2F7] shadow-sm space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wide text-[#0F1115] pb-2 border-b border-[#EDF2F7]">
                4. OEM & Private Label Intellectual Property
              </h2>
              <p className="text-xs sm:text-sm text-[#0F1115]/70 leading-relaxed">
                Custom packaging designs, artwork, and proprietary formulas provided by the client remain their exclusive property. Conversely, base botanical formulations and raw extraction methods developed by Mooria Group remain protected corporate IP.
              </p>
            </div>

            {/* SECTION 5 */}
            <div className="bg-white p-8 rounded-2xl border border-[#EDF2F7] shadow-sm space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wide text-[#0F1115] pb-2 border-b border-[#EDF2F7]">
                5. Governing Law & Tribunal
              </h2>
              <p className="text-xs sm:text-sm text-[#0F1115]/70 leading-relaxed">
                These trade terms are governed exclusively by Moroccan Commercial Export Law. Any irreducible dispute arising from international distribution contracts will be submitted exclusively to the Commercial Court of Casablanca, Morocco.
              </p>
            </div>

            {/* CONTACT FOOTER CARD */}
            <div className="bg-white p-8 rounded-2xl border border-[#EDF2F7] shadow-sm space-y-2">
              <h3 className="text-sm font-bold uppercase text-[#002855]">
                Need Executed Legal Covenants?
              </h3>
              <p className="text-xs text-[#0F1115]/70 leading-relaxed">
                To request a signed bilateral supply agreement or notarized export contract for your container allocation, contact our trade relations desk at{" "}
                <a href="mailto:corporate@mooriagroup.com" className="text-[#002855] font-bold underline">
                  corporate@mooriagroup.com
                </a>.
              </p>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}