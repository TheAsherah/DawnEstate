"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-quill-new/dist/quill.snow.css";
import Image from "next/image";
import { createBlogAPI } from "@/services/blog.service";
import { useSelector } from "react-redux";
import {
  X,
  ImagePlus,
  Sparkles,
  Settings2,
  Hash,
  Link as LinkIcon,
  Loader2,
} from "lucide-react";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] flex items-center justify-center bg-zinc-900/50 rounded-2xl border border-white/5">
      <p className="text-zinc-500 font-semibold text-xs tracking-widest uppercase animate-pulse">
        Loading workspace...
      </p>
    </div>
  ),
});

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function AddBlogSEOCMS() {
  const mode = useSelector((state) => state.theme?.mode) || "dark";
  const isDark = mode === "dark";

  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    postTitle: "",
    slug: "",
    category: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    featuredImageAlt: "",
  });

  useEffect(() => {
    if (!formData.metaTitle && formData.postTitle.length > 0) {
      setFormData((prev) => ({ ...prev, metaTitle: formData.postTitle }));
    }
  }, [formData.postTitle]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const generateSlug = () => {
    if (!formData.postTitle) return toast.info("Enter a title first.");
    setFormData((prev) => ({ ...prev, slug: slugify(formData.postTitle) }));
  };

  const editorRef = useRef(null);
  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write your article content here...",
      minHeight: 400,
      toolbarAdaptive: false,
      theme: isDark ? "dark" : "default",
      buttons: [
        "source", "|", "bold", "italic", "underline", "strikethrough", "|",
        "ul", "ol", "|", "font", "fontsize", "brush", "paragraph", "|",
        "image", "video", "link", "|", "align", "undo", "redo", "eraser",
      ],
    }),
    [isDark]
  );

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
      alt: "",
      index: "",
    }));

    setGalleryItems((prev) => [...prev, ...newItems]);
  };

  const handleGalleryItemChange = (idx, field, value) => {
    setGalleryItems((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
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
    const { postTitle, slug } = formData;
    if (!postTitle) return toast.error("Please enter a post title.");
    if (!slug) return toast.error("Please generate a slug.");
    if (!content.trim() || content === "<p><br></p>")
      return toast.error("Content is empty.");
    if (!featuredImage) return toast.error("Upload a cover image.");

    setIsSubmitting(true);

    try {
      await createBlogAPI({
        ...formData,
        content,
        featuredImage,
        galleryItems,
      });

      toast.success("Article published successfully!");
      setFormData({
        postTitle: "", slug: "", category: "", tags: "",
        metaTitle: "", metaDescription: "", featuredImageAlt: "",
      });
      setContent("");
      setFeaturedImage(null);
      setFeaturedImagePreview(null);
      setGalleryItems([]);
    } catch (err) {
      toast.error("Failed to create blog!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Luxury UI Classes
  const cuteInput = `w-full border rounded-xl px-4 py-3.5 text-sm transition-all focus:outline-none ${
    isDark 
      ? "bg-zinc-900/60 border-white/10 text-white placeholder:text-zinc-600 focus:border-warm-brown focus:ring-1 focus:ring-warm-brown" 
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-warm-brown"
  }`;
  
  const labelText = `text-[10px] font-bold uppercase tracking-[0.25em] mb-4 flex items-center gap-2 ${
    isDark ? "text-warm-brown border-b border-white/5 pb-3" : "text-slate-700 border-b border-slate-100 pb-3"
  }`;
  
  const sidebarCard = `p-6 rounded-2xl border shadow-xl backdrop-blur-sm transition-all ${
    isDark ? "bg-zinc-950/70 border-white/10" : "bg-white border-slate-200 shadow-sm"
  }`;

  return (
    <div className={`min-h-screen font-sans py-8 lg:py-12 transition-colors duration-300 ${isDark ? "bg-[#09090b] text-zinc-100" : "bg-slate-50 text-slate-900"}`}>
      <form onSubmit={handleSubmit} className="max-w-[1300px] mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className={`p-6 rounded-2xl shadow-xl mb-8 flex justify-between items-center border backdrop-blur-md transition-all ${
          isDark ? "bg-zinc-950/80 border-[#c5a880]/30 shadow-[0_4px_25px_rgba(0,0,0,0.6)]" : "bg-white border-amber-200/60 shadow-md"
        }`}>
          <div>
            <h1 className="text-xl font-serif font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-warm-brown via-[#dfc29e] to-warm-brown">
              Editorial CMS
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-0.5">
              Write, optimize, and publish.
            </p>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.97 } : {}}
            className={`hidden lg:flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-[0.2em] font-semibold rounded-xl shadow-lg transition-all border ${
              isSubmitting
                ? "bg-zinc-800 text-zinc-500 border-white/5 cursor-not-allowed"
                : "bg-gradient-to-r from-warm-brown to-[#b3936c] hover:opacity-95 text-white border-[#dfc29e]/30 shadow-[0_4px_20px_rgba(197,168,128,0.3)]"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Publishing
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Publish Post
              </>
            )}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Editor Area */}
          <div className="lg:col-span-8 space-y-6">
            <div className={`p-8 rounded-2xl border shadow-xl backdrop-blur-sm transition-all ${
              isDark ? "bg-zinc-950/70 border-white/10" : "bg-white border-slate-200 shadow-sm"
            }`}>
              
              <div className="mb-8 pb-4 border-b border-white/5">
                <label className="block text-[10px] uppercase tracking-[0.25em] text-warm-brown mb-2 font-bold">
                  Article Title
                </label>
                <input
                  name="postTitle"
                  value={formData.postTitle}
                  onChange={handleChange}
                  placeholder="The Dawn of Marrakech Architecture..."
                  className={`text-2xl md:text-4xl font-serif font-bold w-full outline-none bg-transparent transition-colors ${
                    isDark ? "text-white placeholder:text-zinc-700" : "text-slate-900 placeholder:text-slate-300"
                  }`}
                  required
                />
              </div>

              <div className={`rounded-xl overflow-hidden border transition-all ${isDark ? "border-white/10" : "border-slate-200"}`}>
                <JoditEditor
                  ref={editorRef}
                  value={content}
                  config={editorConfig}
                  tabIndex={1}
                  onBlur={(newContent) => setContent(newContent)}
                  onChange={() => {}} 
                />
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Routing & Details */}
            <div className={sidebarCard}>
              <h3 className={labelText}>
                <LinkIcon className="w-4 h-4" /> Routing & Details
              </h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="post-url-slug"
                    className={cuteInput}
                    required
                  />
                  <button
                    type="button"
                    onClick={generateSlug}
                    className={`px-4 text-[10px] uppercase tracking-wider font-semibold rounded-xl transition-all ${
                      isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-white/5" : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                    }`}
                  >
                    Auto
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className={cuteInput}
                  />
                  <input
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Tags"
                    className={cuteInput}
                  />
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className={sidebarCard}>
              <h3 className={labelText}>
                <ImagePlus className="w-4 h-4" /> Cover Image
              </h3>
              <div className="space-y-4">
                <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer overflow-hidden relative group transition-all ${
                  isDark ? "border-white/20 bg-zinc-900/50 hover:border-warm-brown" : "border-slate-300 bg-slate-50 hover:border-warm-brown"
                }`}>
                  {featuredImagePreview ? (
                    <>
                      <Image
                        fill
                        src={featuredImagePreview}
                        alt="Cover"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-[10px] uppercase tracking-widest font-bold">Change Cover</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-4">
                      <ImagePlus className="w-8 h-8 text-warm-brown mx-auto mb-2" />
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
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
                  value={formData.featuredImageAlt}
                  onChange={handleChange}
                  maxLength={60}
                  placeholder="SEO Alt Text..."
                  className={cuteInput}
                />
              </div>
            </div>

            {/* Gallery Settings */}
            <div className={sidebarCard}>
              <h3 className={labelText}>
                <Hash className="w-4 h-4" /> Post Gallery Settings
              </h3>
              <label className="flex items-center justify-center w-full py-4 mb-4 border border-warm-brown/40 bg-warm-brown/10 hover:bg-warm-brown/20 rounded-xl cursor-pointer transition-all text-warm-brown font-semibold text-[10px] uppercase tracking-widest gap-2">
                <ImagePlus className="w-4 h-4" /> Add Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                  onClick={(e) => (e.target.value = null)} 
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
                        className={`flex flex-col gap-3 p-4 border rounded-xl group ${isDark ? "bg-zinc-900/40 border-white/5" : "bg-slate-50 border-slate-100"}`}
                      >
                        <div className="relative h-28 w-full rounded-lg overflow-hidden border border-white/10">
                          <Image
                            fill
                            src={item.preview}
                            alt="Gallery preview"
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(idx)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Alt text"
                            value={item.alt}
                            onChange={(e) => handleGalleryItemChange(idx, "alt", e.target.value)}
                            className={`w-[60%] border rounded-lg px-3 py-2 text-[10px] tracking-wider outline-none ${isDark ? "bg-zinc-950 border-white/10 focus:border-warm-brown" : "bg-white"}`}
                          />
                          <input
                            type="number"
                            placeholder="H2 Index"
                            value={item.index}
                            onChange={(e) => handleGalleryItemChange(idx, "index", e.target.value)}
                            min="1"
                            className={`w-[40%] border rounded-lg px-3 py-2 text-[10px] tracking-wider outline-none ${isDark ? "bg-zinc-950 border-white/10 focus:border-warm-brown" : "bg-white"}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* SEO */}
            <div className={sidebarCard}>
              <h3 className={labelText}>
                <Settings2 className="w-4 h-4" /> Meta SEO
              </h3>
              <div className="space-y-4">
                <input
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  maxLength={60}
                  placeholder="Meta Title..."
                  className={cuteInput}
                />
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  rows={4}
                  maxLength={160}
                  placeholder="Meta Description..."
                  className={`${cuteInput} resize-none`}
                />
              </div>
            </div>
            
          </div>
        </div>
      </form>
    </div>
  );
}