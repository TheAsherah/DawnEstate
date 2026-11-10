
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useSelector } from "react-redux";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

export default function HelpPage() {
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    city: "",
    surface: "",
    message: "",
    images: [],
    videos: [],
  });

  // Theme styles
  const inputClass = `rounded-none h-14 text-xs tracking-widest transition-all duration-300 ${
    isDark
      ? "bg-[#111111] border-white/10 text-white placeholder:text-white/30 focus-visible:border-warm-brown focus-visible:ring-warm-brown"
      : "bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-warm-brown focus-visible:ring-warm-brown"
  }`;

  const labelClass = `text-[10px] uppercase tracking-widest font-bold ${
    isDark ? "text-white/50" : "text-muted-foreground"
  }`;

  const selectTriggerClass = `rounded-none h-14 text-xs tracking-widest transition-all duration-300 ${
    isDark
      ? "bg-[#111111] border-white/10 text-white focus:ring-warm-brown"
      : "bg-background border-border text-foreground focus:ring-warm-brown"
  }`;

  const selectContentClass = `rounded-none ${
    isDark
      ? "bg-[#111111] border-white/10 text-white"
      : "bg-card border-border text-foreground"
  }`;

  const textareaClass = `rounded-none min-h-[150px] p-4 text-xs tracking-widest transition-all duration-300 ${
    isDark
      ? "bg-[#111111] border-white/10 text-white placeholder:text-white/30 focus-visible:border-warm-brown focus-visible:ring-warm-brown"
      : "bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-warm-brown focus-visible:ring-warm-brown"
  }`;

  function handleImageUpload(e) {
    console.log("Images upload clicked (Static Demo)");
  }

  function handleVideoUpload(e) {
    console.log("Videos upload clicked (Static Demo)");
  }

  function removeImage(index) {}

  function removeVideo(index) {}

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted (Static Demo)", formData);
    alert("Estimation request submitted successfully! (Static Demo)");
  }

  return (
    <div
      className={`min-h-screen pb-32 selection:bg-warm-brown selection:text-white transition-colors duration-300 ${
        isDark
          ? "bg-black text-white"
          : "bg-background text-foreground"
      }`}
    >
      <Header />

      {/* Page Heading */}
      <div
        className={`pt-40 pb-20 border-b transition-colors duration-300 ${
          isDark ? "border-white/10" : "border-border"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="text-warm-brown text-[10px] tracking-[0.5em] uppercase font-medium">
              PROPERTY ESTIMATION
            </span>

            <h1
              className={`text-5xl md:text-7xl font-serif transition-colors ${
                isDark ? "text-white" : "text-foreground"
              }`}
            >
              Estimate Your Property
            </h1>

            <p
              className={`text-sm tracking-[0.2em] uppercase font-light max-w-2xl ${
                isDark ? "text-white/50" : "text-muted-foreground"
              }`}
            >
              Get a professional estimate for your property
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`border p-8 md:p-12 lg:p-16 space-y-12 transition-colors duration-300 ${
            isDark
              ? "bg-[#0b0b0b] border-white/10"
              : "bg-card border-border"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-12">

            {/* Contact Information */}
            <div className="space-y-8">
              <div
                className={`pb-5 border-b ${
                  isDark ? "border-white/10" : "border-border"
                }`}
              >
                <h2
                  className={`text-[10px] uppercase tracking-[0.35em] font-bold ${
                    isDark ? "text-white" : "text-foreground"
                  }`}
                >
                  PERSONAL INFORMATION
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-3">
                  <Label htmlFor="name" className={labelClass}>
                    NAME
                  </Label>

                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    required
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className={labelClass}>
                    EMAIL
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    required
                    placeholder="Your email address"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className={labelClass}>
                  PHONE
                </Label>

                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Your phone number"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Property Information */}
            <div className="space-y-8">
              <div
                className={`pb-5 border-b ${
                  isDark ? "border-white/10" : "border-border"
                }`}
              >
                <h2
                  className={`text-[10px] uppercase tracking-[0.35em] font-bold ${
                    isDark ? "text-white" : "text-foreground"
                  }`}
                >
                  PROPERTY INFORMATION
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-3">
                  <Label className={labelClass}>
                    PROPERTY TYPE
                  </Label>

                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        propertyType: value,
                      })
                    }
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>

                    <SelectContent className={selectContentClass}>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                      <SelectItem value="daily-renting">
                        Daily Renting
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="city" className={labelClass}>
                    CITY
                  </Label>

                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        city: e.target.value,
                      })
                    }
                    placeholder="Property city"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="surface" className={labelClass}>
                  SURFACE (m²)
                </Label>

                <Input
                  id="surface"
                  type="number"
                  value={formData.surface}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      surface: e.target.value,
                    })
                  }
                  placeholder="Property surface area"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-4">
              <div
                className={`pb-5 border-b ${
                  isDark ? "border-white/10" : "border-border"
                }`}
              >
                <h2
                  className={`text-[10px] uppercase tracking-[0.35em] font-bold ${
                    isDark ? "text-white" : "text-foreground"
                  }`}
                >
                  ADDITIONAL DETAILS
                </h2>
              </div>

              <div className="space-y-3">
                <Label htmlFor="message" className={labelClass}>
                  MESSAGE
                </Label>

                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  placeholder="Tell us more about your property..."
                  className={textareaClass}
                  rows={4}
                />
              </div>
            </div>

            {/* Upload Sections */}
            <div className="space-y-8">
              <div
                className={`pb-5 border-b ${
                  isDark ? "border-white/10" : "border-border"
                }`}
              >
                <h2
                  className={`text-[10px] uppercase tracking-[0.35em] font-bold ${
                    isDark ? "text-white" : "text-foreground"
                  }`}
                >
                  PROPERTY MEDIA
                </h2>

                <p
                  className={`text-[10px] tracking-widest mt-3 font-light ${
                    isDark ? "text-white/40" : "text-muted-foreground"
                  }`}
                >
                  SHARE PHOTOS AND VIDEOS OF YOUR PROPERTY
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                {/* Images */}
                <div className="space-y-4">
                  <Label className={labelClass}>
                    UPLOAD IMAGES
                  </Label>

                  <label
                    className={`flex flex-col items-center justify-center w-full aspect-video border border-dashed transition-all duration-500 cursor-pointer group ${
                      isDark
                        ? "bg-[#111111] border-white/15 hover:border-warm-brown hover:bg-[#161616]"
                        : "bg-muted/50 border-border hover:border-warm-brown hover:bg-warm-brown/5"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 flex items-center justify-center border mb-5 transition-all duration-500 group-hover:border-warm-brown ${
                        isDark
                          ? "border-white/10 bg-white/[0.03]"
                          : "border-border bg-background"
                      }`}
                    >
                      <Upload className="w-5 h-5 text-warm-brown group-hover:scale-110 transition-transform" />
                    </div>

                    <span
                      className={`text-[10px] uppercase tracking-[0.3em] transition-colors ${
                        isDark
                          ? "text-white/50 group-hover:text-white"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      Upload Images
                    </span>

                    <span
                      className={`text-[8px] uppercase tracking-widest mt-3 ${
                        isDark ? "text-white/25" : "text-muted-foreground/70"
                      }`}
                    >
                      JPG, PNG, WEBP
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Videos */}
                <div className="space-y-4">
                  <Label className={labelClass}>
                    UPLOAD VIDEOS
                  </Label>

                  <label
                    className={`flex flex-col items-center justify-center w-full aspect-video border border-dashed transition-all duration-500 cursor-pointer group ${
                      isDark
                        ? "bg-[#111111] border-white/15 hover:border-warm-brown hover:bg-[#161616]"
                        : "bg-muted/50 border-border hover:border-warm-brown hover:bg-warm-brown/5"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 flex items-center justify-center border mb-5 transition-all duration-500 group-hover:border-warm-brown ${
                        isDark
                          ? "border-white/10 bg-white/[0.03]"
                          : "border-border bg-background"
                      }`}
                    >
                      <Upload className="w-5 h-5 text-warm-brown group-hover:scale-110 transition-transform" />
                    </div>

                    <span
                      className={`text-[10px] uppercase tracking-[0.3em] transition-colors ${
                        isDark
                          ? "text-white/50 group-hover:text-white"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      Upload Videos
                    </span>

                    <span
                      className={`text-[8px] uppercase tracking-widest mt-3 ${
                        isDark ? "text-white/25" : "text-muted-foreground/70"
                      }`}
                    >
                      MP4, MOV, WEBM
                    </span>

                    <input
                      type="file"
                      accept="video/*"
                      multiple
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div
              className={`pt-8 border-t ${
                isDark ? "border-white/10" : "border-border"
              }`}
            >
              <button
                type="submit"
                className="w-full bg-warm-brown text-white py-6 text-[10px] tracking-[0.5em] uppercase font-bold hover:bg-warm-brown/90 hover:tracking-[0.6em] transition-all duration-500"
              >
                SUBMIT REQUEST
              </button>

              <p
                className={`text-center text-[9px] uppercase tracking-widest mt-6 font-light ${
                  isDark ? "text-white/30" : "text-muted-foreground"
                }`}
              >
                Dawn Estate · Marrakech Real Estate Agency
              </p>
            </div>

          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
