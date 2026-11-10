"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function AboutUs() {
  return (
    <section id="about" className="py-20 bg-[#FAFAFF] border-t border-[#EDF2F7]">
      <div className="container mx-auto px-6 max-w-7xl font-satoshi">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 1. LEFT COLUMN: Minimal Text Pitch */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B80C09]" />
              <span className="text-[#002855] text-[10px] font-bold uppercase tracking-widest">
                Corporate Profile
              </span>
            </div>

            <h2 className="text-[#0F1115] text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none">
              Your Gateway To <br />
              <span className="font-light normal-case text-[#002855] block mt-1">
                Authentic Moroccan Cosmetics.
              </span>
            </h2>

            <p className="text-[#0F1115]/80 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
              <strong>Mooria Group</strong> is a certified Moroccan B2B exporter specializing in premium finished botanical skincare and beauty products. We supply global distributors, luxury SPAs, and retail networks with beautifully packaged, export-ready lines compliant with international standards.
            </p>

            <div className="pt-2">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#002855] hover:text-[#B80C09] transition-colors group"
              >
                Learn More About Our Standards
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* 2. RIGHT COLUMN: Modern Luxury Image Frame with Floating Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/2] rounded-2xl overflow-hidden bg-[#EDF2F7] border border-[#EDF2F7] shadow-sm">
              <Image
                src="https://res.cloudinary.com/lm5gli3m/image/upload/v1784742764/aboutimagemooria_tnrreo.webp" 
                alt="Mooria Group Botanical Export Facility & Products"
                fill
                sizes="(max-w-1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              
              {/* Soft Gradient Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

           
          </div>

        </div>

      </div>
    </section>
  );
}