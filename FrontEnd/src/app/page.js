
"use client";

import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Bed, Maximize } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { translations } from "@/i18n/translations"; 
import Link from "next/link";

export default function App() {
  const mode = useSelector((state) => state.theme.mode);
  const language = useSelector((state) => state.lang?.language) || "en";

  const isDark = mode === "dark";
  const isRTL = language === "ar";

  const t = (key) =>
    translations[language]?.[key] || translations.en?.[key] || key;

  const gold = isDark ? "#B6A17E" : "#927750";

  const theme = {
    page: isDark
      ? "bg-[#080808] text-white"
      : "bg-[#F5F2EC] text-[#29251F]",
    heading: isDark ? "text-white" : "text-[#29251F]",
    muted: isDark ? "text-white/50" : "text-[#746E64]",
    card: isDark
      ? "bg-[#101010] border-white/10"
      : "bg-[#FCFAF6] border-[#E5DED2]",
    sectionBorder: isDark
      ? "border-white/10"
      : "border-[#DED6C9]",
    secondaryBg: isDark
      ? "bg-[#101010]"
      : "bg-[#EDE8DF]",
  };

  const staticProperties = [
    {
      id: "1",
      category: "villa",
      prestation: "sale",
      city: "Marrakech",
      address: "Hivernage",
      surface: 650,
      bedrooms: 5,
      price: "15,000,000",
      image:
        "https://images.unsplash.com/photo-1613490908592-fd5e67f272bf?q=80&w=1080&auto=format&fit=crop",
    },
    {
      id: "2",
      category: "apartment",
      prestation: "sale",
      city: "Marrakech",
      address: "Gueliz",
      surface: 140,
      bedrooms: 2,
      price: "2,500,000",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1080&auto=format&fit=crop",
    },
    {
      id: "3",
      category: "house",
      prestation: "rent",
      city: "Marrakech",
      address: "Medina",
      surface: 200,
      bedrooms: 3,
      price: "25,000",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1080&auto=format&fit=crop",
    },
    {
      id: "4",
      category: "villa",
      prestation: "sale",
      city: "Marrakech",
      address: "Palmeraie",
      surface: 1200,
      bedrooms: 6,
      price: "35,000,000",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1080&auto=format&fit=crop",
    },
  ];

  const philosophyItems = [
    { title: "exclusivity", desc: "exclusivityDesc" },
    { title: "trust", desc: "trustDesc" },
    { title: "excellence", desc: "excellenceDesc" },
    { title: "passion", desc: "passionDesc" },
  ];

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      lang={language}
      className={`min-h-screen transition-colors duration-300 selection:text-white ${theme.page}`}
      style={{ "--brand-gold": gold }}
    >
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1622015663381-d2e05ae91b72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMG1vZGVybiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3Njk4Mjk2OTN8MA&ixlib=rb-4.1.0&q=80&w=2000"
            alt="Luxury Property"
            className={`w-full h-full object-cover transition-all duration-500 ${
              isDark
                ? "brightness-[0.65] contrast-100"
                : "brightness-[0.85] contrast-[0.9]"
            }`}
          />

          <div
            className={`absolute inset-0 backdrop-blur-[2px] ${
              isDark ? "bg-black/45" : "bg-[#F5F2EC]/55"
            }`}
          />

          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              isDark
                ? "from-[#080808] via-black/10 to-black/40"
                : "from-[#F5F2EC] via-[#F5F2EC]/10 to-[#F5F2EC]/30"
            }`}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="space-y-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="space-y-6"
            >
              <span
                className="text-[10px] tracking-[0.5em] uppercase font-medium"
                style={{ color: gold }}
              >
                {t("establishedTagline")}
              </span>

              <h1
                className={`text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.9] ${
                  isDark ? "text-white" : "text-[#29251F]"
                }`}
              >
                {t("elevatedLiving")}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className={`max-w-xl mx-auto text-sm md:text-base leading-relaxed tracking-wider font-light ${theme.muted}`}
            >
              {t("homeHeroDescription")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8"
            >
              <Link
              href={"/properties"}
                className={`group relative px-12 py-5 overflow-hidden border transition-all duration-500 hover:text-white ${
                  isDark
                    ? "border-[#B6A17E]/70 text-white hover:bg-[#B6A17E]"
                    : "border-[#927750] text-[#29251F] hover:bg-[#927750]"
                }`}
              >
                <span className="relative z-10 text-[10px] tracking-[0.4em] uppercase font-medium">
                  {t("viewProperties")}
                </span>
              </Link>

              <button
                className={`group flex items-center gap-4 transition-colors duration-300 ${
                  isDark
                    ? "text-white/80 hover:text-[#B6A17E]"
                    : "text-[#514A40] hover:text-[#927750]"
                }`}
              >
                <span className="text-[10px] tracking-[0.4em] uppercase font-medium">
                  {t("estimateProperty")}
                </span>

                <ArrowRight
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isRTL
                      ? "rotate-180 group-hover:-translate-x-2"
                      : "group-hover:translate-x-2"
                  }`}
                />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span
            className={`text-[8px] tracking-[0.4em] uppercase font-medium rotate-90 mb-8 origin-center ${
              isDark ? "text-white/30" : "text-[#746E64]/60"
            }`}
          >
            {t("scroll")}
          </span>

          <div
            className="w-[1px] h-12"
            style={{
              background: `linear-gradient(to top, ${gold}, transparent)`,
            }}
          />
        </motion.div>
      </section>

      {/* RECENT PROPERTIES */}
      <section
        className={`py-32 border-b transition-colors duration-300 ${theme.page} ${theme.sectionBorder}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span
                className="text-[10px] tracking-[0.4em] uppercase font-medium"
                style={{ color: gold }}
              >
                {t("curatedCollection")}
              </span>

              <h2 className={`text-4xl md:text-5xl font-serif ${theme.heading}`}>
                {t("recentProperties")}
              </h2>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`text-[10px] tracking-[0.4em] uppercase border-b pb-2 transition-colors duration-300 ${
                isDark
                  ? "text-white/50 border-white/20 hover:text-[#B6A17E]"
                  : "text-[#746E64] border-[#DED6C9] hover:text-[#927750]"
              }`}
            >
              <Link href={"/properties"}>
              {t("viewAllProperties")}
              </Link>
             
            </motion.button>
          </div>

          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
              breakpoints: {
                "(min-width: 768px)": { slidesToScroll: 2 },
                "(min-width: 1024px)": { slidesToScroll: 3 },
              },
            }}
            className="w-full px-1 sm:px-6"
          >
            <CarouselContent className="-ml-3 sm:-ml-6">
              {staticProperties.map((property, index) => (
                <CarouselItem
                  key={property.id}
                  className="basis-full md:basis-1/2 lg:basis-1/3 pl-3 sm:pl-6"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="h-full"
                  >
                    <div
                      className={`group cursor-pointer overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-[#927750]/10 h-full flex flex-col border ${theme.card}`}
                    >
                      <div className="relative h-[450px] overflow-hidden shrink-0">
                        <img
                          src={property.image}
                          alt={t(property.category)}
                          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                        />

                        <div
                          className={`absolute top-6 ${
                            isRTL ? "right-6" : "left-6"
                          } flex flex-col gap-3`}
                        >
                          <span
                            className="text-white text-[10px] tracking-[0.2em] uppercase px-4 py-1.5"
                            style={{ backgroundColor: gold }}
                          >
                            {t(property.prestation)}
                          </span>

                          <span
                            className={`backdrop-blur-md text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 border ${
                              isDark
                                ? "bg-black/90 text-white border-white/10"
                                : "bg-[#F5F2EC]/95 text-[#29251F] border-[#DED6C9]"
                            }`}
                          >
                            {t(property.category)}
                          </span>
                        </div>

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                          <button
                            className="text-black hover:text-white text-[10px] tracking-[0.3em] uppercase py-6 px-10 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0"
                            style={{ backgroundColor: "#F5F2EC" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = gold;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "#F5F2EC";
                            }}
                          >
                            {t("viewDetails")}
                          </button>
                        </div>
                      </div>

                      <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div
                            className="flex items-center"
                            style={{ color: gold }}
                          >
                            <MapPin className={`w-3 h-3 ${isRTL ? "ml-2" : "mr-2"}`} />

                            <span className="text-[10px] uppercase tracking-[0.3em] font-medium">
                              {property.address}
                            </span>
                          </div>

                          <h3
                            className={`text-2xl font-serif transition-colors duration-300 group-hover:text-[var(--brand-gold)] ${theme.heading}`}
                          >
                            {t(property.category)}{" "}
                            <span className={`font-sans font-light ${theme.muted}`}>
                              /
                            </span>{" "}
                            {property.city}
                          </h3>
                        </div>

                        <div
                          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-t pt-6 ${theme.sectionBorder}`}
                        >
                          <p className={`whitespace-nowrap text-base sm:text-xl font-light tracking-wide ${theme.heading}`}>
                            <span className="block">{property.price}</span>

                            <span className={`block text-[9px] sm:text-[10px] tracking-[0.25em] ${theme.muted}`}>
                              {t("mad")}
                            </span>
                          </p>

                          <div
                            className={`flex items-center gap-4 sm:gap-6 text-[10px] tracking-widest uppercase shrink-0 ${theme.muted}`}
                          >
                            <div className="flex items-center gap-2">
                              <Bed className="w-3 h-3" />
                              <span>{property.bedrooms}</span>
                            </div>

                            <div
                              className={`flex items-center gap-2 border-l pl-6 ${theme.sectionBorder}`}
                            >
                              <Maximize className="w-3 h-3" />
                              <span>{property.surface} M²</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              className={`-left-3 sm:-left-5 ${
                isDark
                  ? "bg-[#151515] border-white/15 text-white hover:bg-[#B6A17E] hover:text-white"
                  : "bg-[#FCFAF6] border-[#DED6C9] text-[#29251F] hover:bg-[#927750] hover:text-white"
              }`}
            />

            <CarouselNext
              className={`-right-3 sm:-right-5 ${
                isDark
                  ? "bg-[#151515] border-white/15 text-white hover:bg-[#B6A17E] hover:text-white"
                  : "bg-[#FCFAF6] border-[#DED6C9] text-[#29251F] hover:bg-[#927750] hover:text-white"
              }`}
            />
          </Carousel>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section
        className={`py-40 border-t transition-colors duration-300 ${theme.secondaryBg} ${theme.sectionBorder}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative aspect-square overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
                alt="Luxury Interior"
                className="w-full h-full object-cover grayscale"
              />

              <div
                className="absolute inset-0 mix-blend-multiply"
                style={{ backgroundColor: `${gold}1A` }}
              />
            </motion.div>

            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <span
                  className="text-[10px] tracking-[0.4em] uppercase font-medium"
                  style={{ color: gold }}
                >
                  {t("ourPhilosophy")}
                </span>

                <h2
                  className={`text-5xl md:text-6xl font-serif leading-tight ${theme.heading}`}
                >
                  {t("beyondRealEstate")}
                </h2>

                <p className={`text-lg font-light leading-relaxed ${theme.muted}`}>
                  {t("philosophyDescription")}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {philosophyItems.map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={item.title}
                    className="space-y-2"
                  >
                    <h4 className={`font-serif text-xl ${theme.heading}`}>
                      {t(item.title)}
                    </h4>

                    <p className={`text-sm font-light uppercase tracking-widest ${theme.muted}`}>
                      {t(item.desc)}
                    </p>

                    <div
                      className="w-8 h-[1px] mt-4"
                      style={{ backgroundColor: gold }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        className={`relative py-60 overflow-hidden border-t border-b ${theme.sectionBorder}`}
      >
        <div className="absolute inset-0">
          <img
            src="/uploads/5d32c630-2d56-4b5f-8506-deca0d063217.jpeg"
            alt="Luxury Estate"
            className="w-full h-full object-cover grayscale brightness-[0.45]"
          />

          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span
              className="text-[10px] tracking-[0.5em] uppercase font-medium"
              style={{ color: "#D2B98D" }}
            >
              {t("estimateSubtitle")}
            </span>

            <h2 className="text-5xl md:text-7xl font-serif">
              {t("estimateProperty")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
            href={"/contact"}
              className="px-16 py-6 text-[10px] tracking-[0.5em] uppercase font-bold text-white transition-all duration-500 hover:tracking-[0.65em]"
              style={{ backgroundColor: gold }}
            >
              {t("contactUs")}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
