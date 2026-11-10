
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Plus, Image as ImageIcon, Video } from "lucide-react";
import { useSelector } from "react-redux";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

export default function AddPropertyPage() {
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  const gold = isDark ? "#B6A17E" : "#927750";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    category: "",
    prestation: "",
    city: "Marrakech",
    surface: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    pool: false,
    price: "",
  });

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const theme = {
    page: isDark
      ? "bg-[#080808] text-white"
      : "bg-[#F5F2EC] text-[#29251F]",

    card: isDark
      ? "bg-[#101010] border-white/10"
      : "bg-[#FCFAF6] border-[#E5DED2]",

    heading: isDark ? "text-white" : "text-[#29251F]",

    muted: isDark
      ? "text-white/45"
      : "text-[#746E64]",

    border: isDark
      ? "border-white/10"
      : "border-[#DED6C9]",

    input: isDark
      ? "bg-[#151515] border-white/10 text-white placeholder:text-white/25"
      : "bg-[#F5F2EC] border-[#DED6C9] text-[#29251F] placeholder:text-[#A39A8D]",

    select: isDark
      ? "bg-[#151515] border-white/10 text-white"
      : "bg-[#F5F2EC] border-[#DED6C9] text-[#29251F]",
  };

  const inputClass = `
    ${theme.input}
    rounded-none h-14 w-full
    focus-visible:ring-1
    focus-visible:ring-[var(--brand-gold)]
    focus-visible:border-[var(--brand-gold)]
    transition-all duration-300
    uppercase text-xs tracking-widest
  `;

  const labelClass = `
    text-[10px] uppercase tracking-widest
    font-medium ${theme.muted}
  `;

  const selectTriggerClass = `
    ${theme.select}
    rounded-none h-14 w-full
    uppercase text-[10px] tracking-[0.2em]
    focus:ring-[var(--brand-gold)]
    transition-colors duration-300
  `;

  const selectContentClass = `
    rounded-none
    ${isDark
      ? "bg-[#151515] border-white/10 text-white"
      : "bg-[#FCFAF6] border-[#DED6C9] text-[#29251F]"
    }
  `;

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleFilePreview(e, type) {
    const files = Array.from(e.target.files || []);

    const previews = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    if (type === "image") {
      setImages((prev) => [...prev, ...previews]);
    } else {
      setVideos((prev) => [...prev, ...previews]);
    }

    e.target.value = "";
  }

  function removeMedia(index, type) {
    const list = type === "image" ? images : videos;
    const item = list[index];

    if (item) URL.revokeObjectURL(item.url);

    if (type === "image") {
      setImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setVideos((prev) => prev.filter((_, i) => i !== index));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Static demo: no backend submission.
  }

  return (
    <div
      className={`min-h-screen pb-32 selection:bg-[var(--brand-gold)] selection:text-white transition-colors duration-300 ${theme.page}`}
      style={{ "--brand-gold": gold }}
    >
      <Header />

      {/* PAGE HEADER */}
      <section className={`pt-40 pb-20 border-b ${theme.border}`}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5 text-center md:text-left"
          >
            <span
              className="text-[10px] tracking-[0.5em] uppercase font-medium"
              style={{ color: gold }}
            >
              LIST YOUR ESTATE
            </span>

            <h1 className={`text-5xl md:text-6xl font-serif ${theme.heading}`}>
              Add Your Property
            </h1>

            <p className={`text-xs md:text-sm tracking-widest font-light ${theme.muted}`}>
              Present your property to a discerning audience.
            </p>

            <div
              className="w-16 h-[1px] mx-auto md:mx-0"
              style={{ backgroundColor: gold }}
            />
          </motion.div>
        </div>
      </section>

      {/* FORM */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`border p-8 md:p-12 lg:p-16 transition-colors duration-300 ${theme.card}`}
        >
          <form onSubmit={handleSubmit} className="space-y-16">

            {/* PERSONAL INFORMATION */}
            <section className="space-y-8">
              <div className={`pb-5 border-b ${theme.border}`}>
                <span
                  className="text-[10px] tracking-[0.3em] uppercase font-bold"
                  style={{ color: gold }}
                >
                  01 — PERSONAL INFORMATION
                </span>

                <p className={`text-xs mt-3 font-light ${theme.muted}`}>
                  Tell us how we can contact you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className={labelClass}>
                    FIRST NAME
                  </Label>

                  <Input
                    id="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="lastName" className={labelClass}>
                    LAST NAME
                  </Label>

                  <Input
                    id="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </section>

            {/* PROPERTY DETAILS */}
            <section className="space-y-8">
              <div className={`pb-5 border-b ${theme.border}`}>
                <span
                  className="text-[10px] tracking-[0.3em] uppercase font-bold"
                  style={{ color: gold }}
                >
                  02 — PROPERTY DETAILS
                </span>

                <p className={`text-xs mt-3 font-light ${theme.muted}`}>
                  Provide the essential information about your estate.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                {/* CATEGORY */}
                <div className="space-y-3">
                  <Label className={labelClass}>PROPERTY CATEGORY</Label>

                  <Select
                    value={formData.category}
                    onValueChange={(value) => updateField("category", value)}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent className={selectContentClass}>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                      <SelectItem value="daily-renting">Daily Renting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* PRESTATION */}
                <div className="space-y-3">
                  <Label className={labelClass}>LISTING TYPE</Label>

                  <Select
                    value={formData.prestation}
                    onValueChange={(value) => updateField("prestation", value)}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>

                    <SelectContent className={selectContentClass}>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="space-y-3">
                <Label htmlFor="address" className={labelClass}>
                  PROPERTY ADDRESS
                </Label>

                <Input
                  id="address"
                  placeholder="Enter property address"
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-3">
                  <Label htmlFor="city" className={labelClass}>
                    CITY
                  </Label>

                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="price" className={labelClass}>
                    PRICE (MAD)
                  </Label>

                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={(e) => updateField("price", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* PROPERTY SPECIFICATIONS */}
            <section className="space-y-8">
              <div className={`pb-5 border-b ${theme.border}`}>
                <span
                  className="text-[10px] tracking-[0.3em] uppercase font-bold"
                  style={{ color: gold }}
                >
                  03 — PROPERTY SPECIFICATIONS
                </span>

                <p className={`text-xs mt-3 font-light ${theme.muted}`}>
                  Define the dimensions and amenities of your property.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
                <div className="space-y-3">
                  <Label htmlFor="surface" className={labelClass}>
                    SURFACE (M²)
                  </Label>

                  <Input
                    id="surface"
                    type="number"
                    placeholder="0"
                    value={formData.surface}
                    onChange={(e) => updateField("surface", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="bedrooms" className={labelClass}>
                    BEDROOMS
                  </Label>

                  <Input
                    id="bedrooms"
                    type="number"
                    placeholder="0"
                    value={formData.bedrooms}
                    onChange={(e) => updateField("bedrooms", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="bathrooms" className={labelClass}>
                    BATHROOMS
                  </Label>

                  <Input
                    id="bathrooms"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.bathrooms}
                    onChange={(e) => updateField("bathrooms", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="space-y-3">
                  <Label className={labelClass}>POOL</Label>

                  <div className={`h-14 border flex items-center justify-between px-4 ${theme.border}`}>
                    <span className={`text-[10px] uppercase tracking-widest ${theme.muted}`}>
                      {formData.pool ? "YES" : "NO"}
                    </span>

                    <Switch
                      checked={formData.pool}
                      onCheckedChange={(checked) => updateField("pool", checked)}
                      className="data-[state=checked]:bg-[var(--brand-gold)]"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* MEDIA UPLOADS */}
            <section className="space-y-8">
              <div className={`pb-5 border-b ${theme.border}`}>
                <span
                  className="text-[10px] tracking-[0.3em] uppercase font-bold"
                  style={{ color: gold }}
                >
                  04 — PROPERTY MEDIA
                </span>

                <p className={`text-xs mt-3 font-light ${theme.muted}`}>
                  Showcase your property with high-quality visuals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                {/* IMAGES */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-4 h-4" style={{ color: gold }} />

                    <Label className={labelClass}>PROPERTY IMAGES</Label>
                  </div>

                  <label
                    className={`relative flex flex-col items-center justify-center w-full h-52 border border-dashed cursor-pointer group transition-all duration-500 ${
                      isDark
                        ? "bg-[#151515] border-white/15 hover:border-[#B6A17E]"
                        : "bg-[#F5F2EC] border-[#DED6C9] hover:border-[#927750]"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 border flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-105 ${
                        isDark ? "border-white/10" : "border-[#DED6C9]"
                      }`}
                    >
                      <Upload className="w-5 h-5" style={{ color: gold }} />
                    </div>

                    <span className={`text-[10px] uppercase tracking-[0.3em] ${theme.heading}`}>
                      Add Property Images
                    </span>

                    <span className={`text-[9px] uppercase tracking-widest mt-3 ${theme.muted}`}>
                      JPG, PNG, WEBP
                    </span>

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFilePreview(e, "image")}
                      className="hidden"
                    />
                  </label>

                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {images.map((img, index) => (
                        <div
                          key={index}
                          className="relative aspect-square border overflow-hidden group"
                          style={{ borderColor: gold }}
                        >
                          <img
                            src={img.url}
                            alt={img.name}
                            className="w-full h-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() => removeMedia(index, "image")}
                            className="absolute top-2 right-2 p-2 bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* VIDEOS */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <Video className="w-4 h-4" style={{ color: gold }} />

                    <Label className={labelClass}>PROPERTY VIDEOS</Label>
                  </div>

                  <label
                    className={`relative flex flex-col items-center justify-center w-full h-52 border border-dashed cursor-pointer group transition-all duration-500 ${
                      isDark
                        ? "bg-[#151515] border-white/15 hover:border-[#B6A17E]"
                        : "bg-[#F5F2EC] border-[#DED6C9] hover:border-[#927750]"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 border flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-105 ${
                        isDark ? "border-white/10" : "border-[#DED6C9]"
                      }`}
                    >
                      <Upload className="w-5 h-5" style={{ color: gold }} />
                    </div>

                    <span className={`text-[10px] uppercase tracking-[0.3em] ${theme.heading}`}>
                      Add Property Videos
                    </span>

                    <span className={`text-[9px] uppercase tracking-widest mt-3 ${theme.muted}`}>
                      MP4, MOV, WEBM
                    </span>

                    <input
                      type="file"
                      multiple
                      accept="video/*"
                      onChange={(e) => handleFilePreview(e, "video")}
                      className="hidden"
                    />
                  </label>

                  {videos.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {videos.map((vid, index) => (
                        <div
                          key={index}
                          className="relative aspect-square border overflow-hidden group"
                          style={{ borderColor: gold }}
                        >
                          <video
                            src={vid.url}
                            className="w-full h-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() => removeMedia(index, "video")}
                            className="absolute top-2 right-2 p-2 bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* SUBMIT */}
            <section className={`pt-10 border-t ${theme.border}`}>
              <button
                type="submit"
                className="w-full py-7 text-white text-[10px] tracking-[0.5em] uppercase font-bold transition-all duration-500 hover:tracking-[0.65em] hover:opacity-90"
                style={{ backgroundColor: gold }}
              >
                PUBLISH PROPERTY
              </button>

              <p className={`text-center text-[9px] tracking-[0.3em] uppercase mt-6 ${theme.muted}`}>
                DAWN ESTATE · MARRAKECH REAL ESTATE
              </p>
            </section>

          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
