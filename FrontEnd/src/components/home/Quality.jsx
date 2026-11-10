"use client";

import { ShieldCheck, Sparkles, Paintbrush, PackageCheck, Compass } from 'lucide-react';

export function Quality() {
  const certifications = [
    {
      icon: Compass,
      title: 'Safi Artisanal Identity',
      description: '100% Authentic Heritage Grade',
    },
    {
      icon: ShieldCheck,
      title: 'Lead-Free Glaze',
      description: 'Non-Toxic Eco-Safe Materials',
    },
    {
      icon: Paintbrush,
      title: 'Custom Mineral Pigments',
      description: 'Unique Fluid Glaze Textures',
    },
    {
      icon: PackageCheck,
      title: 'Shatter-Proof Freight',
      description: 'Global Export Foam-Crating',
    },
  ];

  const processSteps = [
    { step: '01', title: 'Earth Sourcing', desc: 'Selecting pure, mineral-rich clay beds in Safi, refined to remove impurities before modeling.' },
    { step: '02', title: 'Wheel Sculpting', desc: 'Every vase is individually thrown and sculpted on the wheel to achieve organic fluid silhouettes.' },
    { step: '03', title: 'Surreal Glazing', desc: 'Hand-applying non-reproducible dripping patterns using premium raw oxide pigments.' },
    { step: '04', title: 'Atelier Firing', desc: 'Baked in high-temperature kilns to cure the glaze and solidify the structural clay.' },
  ];

  return (
    <section id="quality" className="py-32 bg-[#2C3E35] relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C87A53]/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/30 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* 1. EDITORIAL HEADER SPLIT */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-24 border-b border-[#F9F6F0]/10 pb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#F9F6F0]/5 px-4 py-2 rounded-full mb-8 border border-[#F9F6F0]/10">
              <ShieldCheck size={14} className="text-[#C87A53]" aria-hidden="true" />
              <span className="text-[#F9F6F0] text-[10px] font-bold uppercase tracking-widest">
                Artisan Validation
              </span>
            </div>
            <h2 className="text-[#F9F6F0] text-4xl md:text-5xl font-serif font-light leading-[1.15]">
              Museum-Grade Standards <br />
              <span className="text-[#C87A53] italic font-normal">At Every Stage.</span>
            </h2>
          </div>
          
          <div className="max-w-md lg:pb-2">
            <p className="text-[#F9F6F0]/80 text-base leading-relaxed font-normal">
              Our creation process honors generational Safi knowledge while satisfying strict international interior design and import safety criteria. We ensure flawless aesthetic execution.
            </p>
          </div>
        </div>

        {/* 2. THE JOURNEY (PROCESS TIMELINE) */}
        <div className="mb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 relative">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-[1px] bg-gradient-to-r from-[#C87A53]/40 to-transparent" aria-hidden="true" />

            {processSteps.map((item, index) => (
              <div key={index} className="relative group">
                {/* Timeline Node */}
                <div className="w-3 h-3 rounded-full bg-[#C87A53] mb-8 relative z-10 shadow-[0_0_15px_rgba(200,122,83,0.5)] group-hover:scale-150 transition-transform duration-500 hidden lg:block" aria-hidden="true" />
                
                {/* Big Background Number */}
                <div className="absolute -top-10 -left-4 text-[#F9F6F0]/5 font-serif text-8xl font-bold select-none pointer-events-none group-hover:-translate-y-2 transition-transform duration-500" aria-hidden="true">
                  {item.step}
                </div>
                
                <div className="relative z-10 pt-2 lg:pt-0">
                  <h4 className="text-[#C87A53] font-bold uppercase tracking-widest text-[10px] mb-3">
                    Stage {item.step}
                  </h4>
                  <h3 className="text-[#F9F6F0] text-xl font-serif font-light mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#F9F6F0]/70 text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. CERTIFICATIONS (MINIMALIST SEALS) */}
        <div className="bg-[#F9F6F0]/5 rounded-3xl p-10 lg:p-14 border border-[#F9F6F0]/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-xl bg-[#2C3E35] border border-[#C87A53]/30 flex items-center justify-center mb-5 group-hover:bg-[#C87A53] transition-colors duration-500 shadow-lg">
                    <Icon className="text-[#C87A53] group-hover:text-[#F9F6F0] transition-colors duration-500" size={22} aria-hidden="true" />
                  </div>
                  <h4 className="text-[#F9F6F0] font-semibold text-sm mb-1.5">
                    {cert.title}
                  </h4>
                  <p className="text-[#F9F6F0]/60 text-[10px] font-medium uppercase tracking-wider">
                    {cert.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}