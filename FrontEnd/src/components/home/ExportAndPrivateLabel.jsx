"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageCheck, Sparkles } from "lucide-react";

export function ExportAndPrivateLabel() {
  return (
    <section id="services" className="py-24 bg-[#FAFAFF] border-t border-[#EDF2F7]">
      <div className="container mx-auto px-6 max-w-7xl font-satoshi">
        
        {/* 1. SECTION HEADER - Minimal & Authority */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B80C09]" />
            <span className="text-[#002855] text-[10px] font-bold uppercase tracking-widest">
              Core B2B Capabilities
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B80C09]" />
          </div>
          
          <h2 className="text-[#0F1115] text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none">
            Export Wholesale <br className="hidden sm:block" />
            <span className="font-light normal-case text-[#002855] block mt-2">
              & Custom Private Labeling.
            </span>
          </h2>
        </div>

        {/* 2. DUAL CREATIVE SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* CARD 1: BULK EXPORT */}
          <div className="group relative rounded-2xl overflow-hidden bg-white border border-[#EDF2F7] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between p-8 sm:p-10 min-h-[480px]">
            
            {/* Background Image with Creative Gradient Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
              <Image
                src="/bulk-export.webp" 
                alt="Mooria Group Global Bulk Export Logistics"
                fill
                sizes="(max-w-1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115]/95 via-[#0F1115]/60 to-[#0F1115]/20" />
            </div>

            {/* Top Tag Accent */}
            <div className="relative z-10 flex justify-between items-center">
              <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                Ready-To-Ship Lines
              </span>
              <PackageCheck className="text-white/80" size={24} />
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 space-y-4 pt-24 font-satoshi">
              <h3 className="text-white text-2xl sm:text-3xl font-black uppercase tracking-wide">
                Bulk International Export
              </h3>

              <ul className="space-y-2 text-white/80 text-xs sm:text-sm font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#B80C09]" />
                  Fully packaged, export-certified finished products.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#B80C09]" />
                  Compliant with international regulatory frameworks (ONSSA/Foodex).
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#B80C09]" />
                  Flexible batch minimums with secured ocean and air logistics.
                </li>
              </ul>

              <div className="pt-4">
                <Link
                  href="/contact?type=bulk"
                  className="inline-flex items-center gap-2 bg-white text-[#0F1115] hover:bg-[#002855] hover:text-white px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md group/btn"
                >
                  Request Bulk Quote
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>

          {/* CARD 2: PRIVATE LABEL (OEM) */}
          <div className="group relative rounded-2xl overflow-hidden bg-white border border-[#EDF2F7] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between p-8 sm:p-10 min-h-[480px]">
            
            {/* Background Image with Creative Gradient Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
              <Image
                src="/private-label.webp" 
                alt="Mooria Group Custom Private Label Manufacturing"
                fill
                sizes="(max-w-1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115]/95 via-[#0F1115]/60 to-[#0F1115]/20" />
            </div>

            {/* Top Tag Accent */}
            <div className="relative z-10 flex justify-between items-center">
              <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                Custom Manufacturing (OEM)
              </span>
              <Sparkles className="text-white/80" size={22} />
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 space-y-4 pt-24 font-satoshi">
              <h3 className="text-white text-2xl sm:text-3xl font-black uppercase tracking-wide">
                Bespoke Private Labeling
              </h3>

              <ul className="space-y-2 text-white/80 text-xs sm:text-sm font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#B80C09]" />
                  Custom formulations tailored for your brand specifications.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#B80C09]" />
                  Luxury glass, amber, and eco-friendly packaging solutions.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#B80C09]" />
                  End-to-end design, filling, and international compliance support.
                </li>
              </ul>

              <div className="pt-4">
                <Link
                  href="/contact?type=privatelabel"
                  className="inline-flex items-center gap-2 bg-[#B80C09] text-white hover:bg-[#9d0208] px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md group/btn"
                >
                  Start Private Label Project
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}