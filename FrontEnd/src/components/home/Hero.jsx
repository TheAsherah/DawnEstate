"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* 1. CLEAN BACKGROUND GRAPHIC ELEVATION */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#EDF2F7_1px,transparent_1px),linear-gradient(to_bottom,#EDF2F7_1px,transparent_1px)] bg-[size:5rem_5rem]" />
      </div>

      {/* 2. THE BOTANICAL FULL BACKGROUND COVER */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/hero-desktop.webp"
          alt="Mooria Group Authentic Moroccan Botanics Luxury Showcase"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* حيدنا الـ Blur والبيوضة اللي كانت كتغطي الصورة كاملة، خلينا غي طبقة خفيفة بزاف باش تهرس الحدة */}
        <div className="absolute inset-0 bg-white/10" />
      </div>

      {/* 3. CENTERED ARCHITECTURE LAYOUT */}
      <div className="container mx-auto px-4 sm:px-6 relative z-20 max-w-5xl text-center flex flex-col items-center justify-center">
        
        <div className="relative w-full font-satoshi flex flex-col items-center justify-center py-10">
          
          {/* تأثير الإضاءة (Halo Effect): كيعطي إضاءة مورا النص بلا مايرسم مربع */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0.4)_40%,transparent_70%)] -z-10 blur-xl rounded-full pointer-events-none" />
          
          {/* High-Impact SEO Typography */}
          <div className="mb-8 max-w-4xl">
            <h1 className="leading-[1.1] tracking-tight font-satoshi flex flex-col gap-2">
              <span className="text-2xl sm:text-4xl lg:text-5xl block font-medium text-gray-800 drop-shadow-md">
                Premium &
              </span>
              <span className="text-4xl sm:text-6xl lg:text-[4.5rem] block font-black uppercase text-[#0F1115] tracking-tight drop-shadow-md">
                Authentic Moroccan
              </span>
              <span className="text-2xl sm:text-4xl lg:text-5xl block font-bold text-[#002855] drop-shadow-md">
                Skincare Wholesale.
              </span>
            </h1>
            <p className="mt-5 text-sm sm:text-base text-gray-800 font-semibold max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Elevate your brand with ethically sourced, premium botanical ingredients directly from the heart of Morocco.
            </p>
          </div>

          {/* Clean & Subtle High-Conversion Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto">
           

            <Link
              href="/store"
              className="group w-full sm:w-auto px-8 py-4 bg-white/90 backdrop-blur-sm text-[#0F1115] border-2 border-[#0F1115] rounded-xl transition-all duration-300 hover:bg-[#0F1115] hover:text-white shadow-md flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest"
            >
              Browse Store
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}