import Image from "next/image";
import Link from "next/link";

export function ProductShowcase() {
  // Top 6 Anchor Products mapped as Category Gateways
  const categories = [
    {
      name: "Pure Organic Argan Oil",
      image: "https://res.cloudinary.com/lm5gli3m/image/upload/f_auto,q_auto/argan-oil_uwudpw",
      href: "/store?categories=argan oil",
    },
    {
      name: "Damascus Rose Water Spray",
      image: "https://res.cloudinary.com/lm5gli3m/image/upload/v1784740242/mawared_eb5gak.webp",
      href: "/store?categories=rose water",
    },
    {
      name: "Eucalyptus Black Soap (Beldi)",
      image: "https://res.cloudinary.com/lm5gli3m/image/upload/v1784740861/soap-moroccan_biafru.webp",
      href: "/store?categories=black soap",
    },
    {
      name: "Atlas Ghassoul Clay Powder",
      image: "https://res.cloudinary.com/lm5gli3m/image/upload/v1784741128/Atlas-Ghassoul_hzcbcn.webp",
      href: "/store?categories=ghassoul clay",
    },
    {
      name: "Prickly Pear Seed Oil",
      image: "https://res.cloudinary.com/lm5gli3m/image/upload/v1784741362/Prickly-Pear-Seed_nkwmde.webp",
      href: "/store?categories=prickly pear oil",
    },
    {
      name: "Exfoliating Kessa Glove Set",
      image: "https://res.cloudinary.com/lm5gli3m/image/upload/v1784741832/ChatGPT_Image_Jul_22_2026_05_35_42_PM_1_ctu6rs.webp",
      href: "/store?categories=kessa gloves",
    },
  ];

  return (
    <section id="categories" className="py-16 bg-[#FAFAFF] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* 1. SECTION HEADER - Minimal & Clean */}
        <div className="text-center max-w-3xl mx-auto mb-16 font-satoshi">
          <h2 className="text-[#0F1115] text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none">
            Our Botanical Lines <br className="hidden sm:block" />
            <span className="font-light normal-case text-[#002855] block mt-2">
              & Skincare Divisions.
            </span>
          </h2>
        </div>

        {/* 2. TOP 6 CATEGORIES GRID (3x2 Desktop Layout) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 font-satoshi">
          {categories.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group cursor-pointer flex flex-col"
            >
              {/* Category Image Container */}
              <div className="relative w-full aspect-square overflow-hidden bg-[#EDF2F7] rounded-xl mb-4 border border-[#EDF2F7]">
                <Image
                  src={item.image}
                  alt={`${item.name} Category`}
                  fill
                  sizes="(max-w-768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Category Title */}
              <div className="flex flex-col items-start px-1 font-satoshi">
                <h3 className="text-[#0F1115] text-sm sm:text-base font-bold uppercase tracking-wider transition-colors duration-300 group-hover:text-[#002855] leading-snug">
                  {item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
