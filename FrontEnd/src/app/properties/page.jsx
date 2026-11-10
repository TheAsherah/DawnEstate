"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, MapPin, Bed, Maximize } from "lucide-react";
import { useSelector } from "react-redux";

import { translations } from "@/i18n/translations";
import { getAllPropertiesAPI } from "@/services/user.service";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

export default function PropertiesPage() {
  const mode = useSelector((state) => state.theme?.mode) || "dark";
  const language = useSelector((state) => state.lang?.language) || "en";

  const isDark = mode === "dark";
  const isRTL = language === "ar";

  // Translation helper
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: "all",
    prestation: "all",
    minPrice: "",
    maxPrice: "",
    pool: "all",
  });

  // Fetch properties from backend on mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const response = await getAllPropertiesAPI();
      setProperties(response.data || []);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = `border rounded-xl h-12 text-[10px] tracking-widest transition-colors ${
    isDark
      ? "bg-[#111111] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-warm-brown"
      : "bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-warm-brown"
  }`;

  const selectTriggerClass = `rounded-xl h-12 uppercase text-[10px] tracking-[0.2em] transition-colors ${
    isDark
      ? "bg-[#111111] border-white/10 text-white focus:ring-warm-brown"
      : "bg-background border-border text-foreground focus:ring-warm-brown"
  }`;

  const selectContentClass = `rounded-xl ${
    isDark
      ? "bg-[#111111] border-white/10 text-white"
      : "bg-card border-border text-foreground"
  }`;

  function handleFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters({
      category: "all",
      prestation: "all",
      minPrice: "",
      maxPrice: "",
      pool: "all",
    });
  }

  const categories = ["villa", "house", "apartment", "studio", "land"];

  // Filter logic
  const filteredProperties = properties.filter((property) => {
    if (filters.category && filters.category !== "all" && property.category !== filters.category) {
      return false;
    }
    if (filters.prestation && filters.prestation !== "all" && property.prestation !== filters.prestation) {
      return false;
    }
    if (filters.pool && filters.pool !== "all" && property.pool !== filters.pool) {
      return false;
    }
    
    const propPrice = parseFloat(property.price?.toString().replace(/,/g, "") || 0);
    if (filters.minPrice && propPrice < parseFloat(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && propPrice > parseFloat(filters.maxPrice)) {
      return false;
    }

    return true;
  });

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`min-h-screen transition-colors duration-300 selection:bg-warm-brown selection:text-white ${
        isDark ? "bg-[#09090b] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Header />

      {/* Page Heading */}
      <div
        className={`pt-40 pb-20 border-b transition-colors duration-300 ${
          isDark ? "border-white/10" : "border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="text-warm-brown text-[10px] tracking-[0.5em] uppercase font-medium">
              {t("curatedSelection") || "Curated Collection"}
            </span>

            <h1 className="text-5xl md:text-7xl font-serif">
              {t("properties") || "Properties"}
            </h1>

            <p
              className={`text-sm md:text-base font-light tracking-widest max-w-xl ${
                isDark ? "text-zinc-400" : "text-slate-600"
              }`}
            >
              {t("propertiesDescription") || "Explore our exclusive portfolio of luxury real estate and residences in Marrakech."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-32 space-y-10 p-8 rounded-2xl border backdrop-blur-md transition-all shadow-xl bg-zinc-950/40 border-white/10">

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-[10px] tracking-[0.3em] uppercase font-bold text-warm-brown flex items-center gap-2">
                  <Filter className="w-3 h-3" />
                  {t("filtersTitle") || "Filters"}
                </h2>

                <button
                  onClick={resetFilters}
                  className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors"
                >
                  {t("resetFilters") || "Reset"}
                </button>
              </div>

              <div className="space-y-8">

                {/* Category Filter */}
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                    {t("category") || "Category"}
                  </Label>

                  <Select
                    value={filters.category}
                    onValueChange={(value) => handleFilterChange("category", value)}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>

                    <SelectContent className={selectContentClass}>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {t(category) || category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Type Filter */}
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                    {t("prestation") || "Type"}
                  </Label>

                  <Select
                    value={filters.prestation}
                    onValueChange={(value) => handleFilterChange("prestation", value)}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>

                    <SelectContent className={selectContentClass}>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="sale">{t("sale") || "Sale"}</SelectItem>
                      <SelectItem value="rent">{t("rent") || "Rent / Airbnb"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                    {t("priceRange") || "Price Range (MAD)"}
                  </Label>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                      className={inputClass}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Pool Filter */}
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                    {t("pool") || "Pool"}
                  </Label>

                  <Select
                    value={filters.pool}
                    onValueChange={(value) => handleFilterChange("pool", value)}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>

                    <SelectContent className={selectContentClass}>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="yes">{t("yes") || "Yes"}</SelectItem>
                      <SelectItem value="no">{t("no") || "No"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-32 text-zinc-500 uppercase tracking-widest text-xs">
                Loading exclusive properties...
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-32 text-zinc-500 uppercase tracking-widest text-xs">
                {t("noProperties") || "No properties found matching your criteria."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property._id || property.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                  >
                    <div className="group cursor-pointer overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-warm-brown/20 h-full flex flex-col border rounded-2xl bg-zinc-950/60 border-white/10">

                      {/* Property Image */}
                      <div className="relative h-[420px] overflow-hidden shrink-0">
                        <img
                          src={property.mainImage?.url || property.image || "/placeholder.jpg"}
                          alt={property.title}
                          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                        />

                        <div className={`absolute top-6 ${isRTL ? "right-6" : "left-6"} flex flex-col gap-2`}>
                          <span className="bg-warm-brown text-white text-[9px] tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-lg font-semibold">
                            {property.prestation === "sale" ? "For Sale" : "For Rent / Airbnb"}
                          </span>

                          <span className="backdrop-blur-md bg-black/80 text-white text-[9px] tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-lg border border-white/10 font-semibold">
                            {property.category}
                          </span>
                        </div>
                      </div>

                      {/* Property Information */}
                      <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center text-warm-brown">
                            <MapPin className="w-3.5 h-3.5 mr-2" />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-medium">
                              {property.address || property.city}, {property.city || "Marrakech"}
                            </span>
                          </div>

                          <h3 className="text-2xl font-serif group-hover:text-warm-brown transition-colors duration-300">
                            {property.title}
                          </h3>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-t border-white/10 pt-6">
                          <p className="whitespace-nowrap text-lg sm:text-xl font-light tracking-wide text-white">
                            <span className="block font-semibold text-warm-brown">{property.price}</span>
                            <span className="block text-[9px] sm:text-[10px] tracking-[0.25em] text-zinc-400">
                              MAD
                            </span>
                          </p>

                          <div className="flex items-center gap-5 text-[10px] tracking-widest uppercase shrink-0 text-zinc-400">
                            {property.bedrooms && (
                              <div className="flex items-center gap-2">
                                <Bed className="w-3.5 h-3.5 text-warm-brown" />
                                <span>{property.bedrooms} Beds</span>
                              </div>
                            )}

                            {property.surface && (
                              <div className="flex items-center gap-2 border-l border-white/10 pl-5">
                                <Maximize className="w-3.5 h-3.5 text-warm-brown" />
                                <span>{property.surface} M²</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}