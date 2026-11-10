"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Image from "next/image";
// T2ked bli zedti function jdida f l-service dyalk (createAIBlogAPI) li katsifet l-API jdid dyal AI
import { createAIBlogAPI } from "@/services/blog.service"; 
import {
  X,
  ImagePlus,
  Sparkles,
  Hash,
  Loader2,
  Bot
} from "lucide-react";

export default function AddAIBlogCMS() {
  const [postTitle, setPostTitle] = useState("");
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeaturedImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      return toast.error("Only JPEG, PNG, or WEBP allowed!");
    }
    setFeaturedImage(file);
    setFeaturedImagePreview(URL.createObjectURL(file));
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const validFiles = files.filter((f) =>
      ["image/jpeg", "image/png", "image/webp"].includes(f.type)
    );

    const newItems = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      alt: "", // Khlina ghir l-alt kima tlbti
    }));

    setGalleryItems((prev) => [...prev, ...newItems]);
  };

  const handleGalleryItemChange = (idx, field, value) => {
    setGalleryItems((prev) => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  };

  const removeGalleryImage = (indexToRemove) => {
    setGalleryItems((prev) => {
      URL.revokeObjectURL(prev[indexToRemove].preview);
      return prev.filter((_, i) => i !== indexToRemove);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postTitle) return toast.error("Please enter a post title.");
    if (!featuredImage) return toast.error("Upload a cover image.");

    setIsSubmitting(true);

    try {
      // Hna kan3yto l-API jdid dyal AI li qadina f l-Backend
      await createAIBlogAPI({
        postTitle,
        featuredImageAlt,
        featuredImage,
        galleryItems, 
      });

      toast.success("AI is magic! Article published successfully! 🎉");
      
      // Reset l-form
      setPostTitle("");
      setFeaturedImageAlt("");
      setFeaturedImage(null);
      setFeaturedImagePreview(null);
      setGalleryItems([]);
    } catch (err) {
      toast.error("Failed to generate AI blog!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cuteInput =
    "w-full bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-[14px] text-[#111] font-medium focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#5F38F9]/10 focus:border-[#5F38F9] transition-all placeholder:text-gray-300";
  const labelText =
    "text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5";
  const sidebarCard =
    "bg-white p-6 rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]";

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="max-w-[1000px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[2rem] font-black text-[#111] tracking-tight flex items-center gap-3">
              AI Magic Editor <Bot className="w-8 h-8 text-[#5F38F9]" />
            </h1>
            <p className="text-sm font-medium text-gray-400">
              Just provide a title and images. The AI handles the rest.
            </p>
          </div>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            className={`hidden lg:flex items-center gap-2 px-8 py-3.5 text-white font-bold rounded-2xl shadow-xl transition-all ${
              isSubmitting 
                ? "bg-gray-400 cursor-not-allowed opacity-80" 
                : "bg-[#111] hover:bg-[#5F38F9]"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> AI is Writing & SEO...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate & Publish
              </>
            )}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Content (Title Only) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 lg:p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
              <label className={labelText}>Target Topic / Title</label>
              <textarea
                name="postTitle"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="E.g., How to market your salon in 2026..."
                className="w-full text-[2rem] lg:text-[2.5rem] font-black text-[#111] placeholder:text-gray-200 outline-none bg-transparent tracking-tight leading-tight resize-none h-40"
                required
              />
            </div>
          </div>

          {/* Sidebar (Images Only) */}
          <div className="lg:col-span-5 space-y-6">
            <div className={sidebarCard}>
              <h3 className={labelText}>
                <ImagePlus className="w-3.5 h-3.5" /> Cover Image
              </h3>
              <div className="mt-4 space-y-4">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-200 rounded-3xl hover:border-[#5F38F9] hover:bg-[#5F38F9]/5 transition-all cursor-pointer overflow-hidden relative group">
                  {featuredImagePreview ? (
                    <>
                      <Image
                        fill
                        src={featuredImagePreview}
                        alt="Cover"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold text-white text-sm">
                        Change Cover
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <ImagePlus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm font-bold text-gray-400">
                        Upload Cover
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFeaturedImageChange}
                    className="hidden"
                  />
                </label>
                <input
                  name="featuredImageAlt"
                  value={featuredImageAlt}
                  onChange={(e) => setFeaturedImageAlt(e.target.value)}
                  maxLength={60}
                  placeholder="SEO Featured Image Alt..."
                  className={cuteInput}
                />
              </div>
            </div>

            <div className={sidebarCard}>
              <h3 className={labelText}>
                <Hash className="w-3.5 h-3.5" /> Additional Gallery Images
              </h3>
              <label className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl hover:border-[#5F38F9] hover:bg-[#5F38F9]/5 transition-all cursor-pointer mb-4 text-[#5F38F9] font-bold text-sm gap-2">
                <ImagePlus className="w-4 h-4" /> Add Gallery Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                  className="hidden"
                />
              </label>
              
              {galleryItems.length > 0 && (
                <div className="grid grid-cols-1 gap-3">
                  <AnimatePresence>
                    {galleryItems.map((item, idx) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        key={item.preview}
                        className="flex items-center gap-3 p-3 border border-gray-100 rounded-2xl bg-gray-50/50 group"
                      >
                        <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden border border-gray-100">
                          <Image
                            fill
                            src={item.preview}
                            alt="Gallery preview"
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Image Alt text"
                            value={item.alt}
                            onChange={(e) =>
                              handleGalleryItemChange(idx, "alt", e.target.value)
                            }
                            className="w-full bg-white border border-gray-100 rounded-xl px-3 py-2 text-xs text-[#111] focus:outline-none focus:border-[#5F38F9] transition-all"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="bg-white border border-gray-100 p-2 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Submit Button */}
        <div className="mt-8 lg:hidden">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center items-center gap-2 px-8 py-4 text-white font-bold rounded-2xl shadow-xl transition-all ${
                isSubmitting 
                  ? "bg-gray-400 cursor-not-allowed opacity-80" 
                  : "bg-[#111] hover:bg-[#5F38F9]"
              }`}
            >
               {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Writing Post...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Generate & Publish
                </>
              )}
            </button>
        </div>
      </form>
    </div>
  );
}