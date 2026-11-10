"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useQuill } from "react-quilljs";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Image from "next/image";
import { useSelector } from "react-redux";
import { translations } from "@/i18n/translations";
import {
  FiUploadCloud,
  FiSettings,
  FiHome,
  FiDollarSign,
  FiLayers,
} from "react-icons/fi";
import "quill/dist/quill.snow.css";
import {  createPropertyAPI } from "@/services/user.service";

/* ================= Utils ================= */
const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function AddPropertyCMS() {
  const t = (key) => translations.en[key] || key;

  const mode = useSelector((state) => state.theme?.mode) || "dark";
  const isDark = mode === "dark";

  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const mainRef = useRef(null);
  const galleryRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    price: "",
    category: "villa",
    prestation: "sale",
    city: "Marrakech",
    address: "",
    surface: "",
    bedrooms: "",
    bathrooms: "",
    pool: "yes",
    metaTitle: "",
    metaDescription: "",
  });

  /* ================= Editor ================= */
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  const { quill, quillRef } = useQuill({ theme: "snow", modules });

  useEffect(() => {
    if (!quill) return;
    quill.on("text-change", () => {
      setDescription(quill.root.innerHTML);
    });
  }, [quill]);

  /* ================= Handlers ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleMainImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMainImage(file);
    setMainPreview(URL.createObjectURL(file));
  };

  const handleGallery = (e) => {
    const files = Array.from(e.target.files || []);
    setGallery((p) => [...p, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews((p) => [...p, ...newPreviews]);
  };

  const removeGalleryImage = (index) => {
    setGallery((p) => p.filter((_, i) => i !== index));
    setGalleryPreviews((p) => p.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      await createPropertyAPI({
        ...form,
        description,
        mainImage,
        gallery,
      });
      toast.success(t("propertySubmitted") || "Property published successfully!");
    } catch (err) {
      toast.error(t("error") || "Failed to publish property");
    }
  };

  /* ================= UI ================= */
  return (
    <div className={`min-h-screen p-6 pt-28 transition-colors duration-300 ${isDark ? "bg-[#09090b] text-zinc-100" : "bg-slate-50 text-slate-900"}`}>
      
      {/* Top Header Bar */}
      <header className={`p-6 rounded-2xl shadow-xl mb-8 flex justify-between items-center max-w-7xl mx-auto border backdrop-blur-md transition-all ${
        isDark 
          ? "bg-zinc-950/80 border-[#c5a880]/30 shadow-[0_4px_25px_rgba(0,0,0,0.6)]" 
          : "bg-white border-amber-200/60 shadow-md"
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-warm-brown/10 border border-warm-brown/30 flex items-center justify-center text-warm-brown">
            <FiHome className="w-5 h-5 text-warm-brown" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-warm-brown via-[#dfc29e] to-warm-brown">
              {t("addNewProperty") || "Add New Property"}
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-0.5">
              Dawn Estate Luxury CMS
            </p>
          </div>
        </div>

        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="bg-gradient-to-r from-warm-brown to-[#b3936c] hover:opacity-95 text-white text-xs uppercase tracking-[0.2em] font-semibold px-8 py-3 rounded-xl transition-all shadow-[0_4px_20px_rgba(197,168,128,0.3)] border border-[#dfc29e]/30"
        >
          {t("publishProperty") || "Publish Property"}
        </motion.button>
      </header>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Title, Slug, Specs & Editor */}
        <div className="lg:col-span-8 space-y-6">
          <div className={`p-8 rounded-2xl border shadow-xl backdrop-blur-sm transition-all ${
            isDark 
              ? "bg-zinc-950/70 border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)]" 
              : "bg-white border-slate-200 shadow-sm"
          }`}>
            
            {/* Title Input */}
            <div className="mb-6 pb-4 border-b border-white/5">
              <label className="block text-[10px] uppercase tracking-[0.25em] text-warm-brown mb-2 font-bold">
                Property Title
              </label>
              <input
                name="title"
                placeholder="e.g. Magnificent Palm Grove Villa"
                value={form.title}
                onChange={handleChange}
                className={`text-2xl md:text-3xl font-serif font-bold w-full outline-none bg-transparent transition-colors ${
                  isDark ? "text-white placeholder:text-zinc-700" : "text-slate-900 placeholder:text-slate-300"
                }`}
              />
            </div>

            {/* Slug Bar */}
            <div className={`flex items-center gap-3 mb-8 p-3 rounded-xl border transition-all ${
              isDark ? "bg-zinc-900/40 border-white/10" : "bg-slate-50 border-slate-200"
            }`}>
              <span className="text-xs font-mono text-zinc-500">
                dawnestate.com/properties/
              </span>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="property-slug"
                className="text-xs text-warm-brown font-mono flex-1 bg-transparent outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  setForm((p) => ({
                    ...p,
                    slug: slugify(p.title),
                  }))
                }
                className={`text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                  isDark 
                    ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-white/5" 
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                }`}
              >
                Auto Slug
              </button>
            </div>

            {/* Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-2 font-semibold">
                  {t("city") || "City"}
                </label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Marrakech"
                  className={`w-full border rounded-xl p-3.5 text-sm outline-none transition-all ${
                    isDark 
                      ? "bg-zinc-900/60 border-white/10 text-white focus:border-warm-brown focus:ring-1 focus:ring-warm-brown" 
                      : "bg-white border-slate-200 text-slate-900 focus:border-warm-brown"
                  }`}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-2 font-semibold">
                  {t("address") || "Address"}
                </label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Hivernage / Palmeraie"
                  className={`w-full border rounded-xl p-3.5 text-sm outline-none transition-all ${
                    isDark 
                      ? "bg-zinc-900/60 border-white/10 text-white focus:border-warm-brown focus:ring-1 focus:ring-warm-brown" 
                      : "bg-white border-slate-200 text-slate-900 focus:border-warm-brown"
                  }`}
                />
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-2 font-semibold">
                  {t("surface") || "Surface"} (m²)
                </label>
                <input
                  name="surface"
                  type="number"
                  value={form.surface}
                  onChange={handleChange}
                  placeholder="650"
                  className={`w-full border rounded-xl p-3.5 text-sm outline-none transition-all ${
                    isDark 
                      ? "bg-zinc-900/60 border-white/10 text-white focus:border-warm-brown" 
                      : "bg-white border-slate-200 text-slate-900 focus:border-warm-brown"
                  }`}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-2 font-semibold">
                  {t("bedrooms") || "Bedrooms"}
                </label>
                <input
                  name="bedrooms"
                  type="number"
                  value={form.bedrooms}
                  onChange={handleChange}
                  placeholder="5"
                  className={`w-full border rounded-xl p-3.5 text-sm outline-none transition-all ${
                    isDark 
                      ? "bg-zinc-900/60 border-white/10 text-white focus:border-warm-brown" 
                      : "bg-white border-slate-200 text-slate-900 focus:border-warm-brown"
                  }`}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-2 font-semibold">
                  {t("bathrooms") || "Bathrooms"}
                </label>
                <input
                  name="bathrooms"
                  type="number"
                  value={form.bathrooms}
                  onChange={handleChange}
                  placeholder="5"
                  className={`w-full border rounded-xl p-3.5 text-sm outline-none transition-all ${
                    isDark 
                      ? "bg-zinc-900/60 border-white/10 text-white focus:border-warm-brown" 
                      : "bg-white border-slate-200 text-slate-900 focus:border-warm-brown"
                  }`}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-2 font-semibold">
                  {t("pool") || "Pool"}
                </label>
                <select
                  name="pool"
                  value={form.pool}
                  onChange={handleChange}
                  className={`w-full border rounded-xl p-3.5 text-sm outline-none transition-all ${
                    isDark 
                      ? "bg-zinc-900/80 border-white/10 text-white focus:border-warm-brown" 
                      : "bg-white border-slate-200 text-slate-900 focus:border-warm-brown"
                  }`}
                >
                  <option value="yes" className={isDark ? "bg-zinc-900 text-white" : ""}>{t("yes") || "Yes"}</option>
                  <option value="no" className={isDark ? "bg-zinc-900 text-white" : ""}>{t("no") || "No"}</option>
                </select>
              </div>
            </div>

            {/* Rich Text Editor */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-warm-brown mb-2 font-bold">
                {t("description") || "Description"}
              </label>
              <div ref={quillRef} style={{ height: 320 }} className={`rounded-xl overflow-hidden border border-white/10 ${isDark ? "text-white bg-zinc-900/40" : ""}`} />
            </div>

          </div>
        </div>

        {/* Right Side: Sidebar Panels (Type, Price, Media, SEO) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Categories & Prestation */}
          <div className={`p-6 rounded-2xl border shadow-xl backdrop-blur-sm space-y-5 transition-all ${
            isDark ? "bg-zinc-950/70 border-white/10" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-warm-brown border-b border-white/5 pb-3">
              {t("categories") || "Categories"} & Type
            </h3>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-2 font-semibold">
                {t("prestation") || "Type"} (Sale / Airbnb)
              </label>
              <select
                name="prestation"
                value={form.prestation}
                onChange={handleChange}
                className={`w-full border rounded-xl p-3.5 text-sm outline-none transition-all ${
                  isDark ? "bg-zinc-900/80 border-white/10 text-white focus:border-warm-brown" : "bg-white border-slate-200 text-slate-900"
                }`}
              >
                <option value="sale" className={isDark ? "bg-zinc-900 text-white" : ""}>{t("sale") || "Sale"}</option>
                <option value="rent" className={isDark ? "bg-zinc-900 text-white" : ""}>{t("rent") || "Rent / Airbnb"}</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-2 font-semibold">
                {t("category") || "Category"}
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`w-full border rounded-xl p-3.5 text-sm outline-none transition-all ${
                  isDark ? "bg-zinc-900/80 border-white/10 text-white focus:border-warm-brown" : "bg-white border-slate-200 text-slate-900"
                }`}
              >
                <option value="villa" className={isDark ? "bg-zinc-900 text-white" : ""}>{t("villa") || "Villa"}</option>
                <option value="house" className={isDark ? "bg-zinc-900 text-white" : ""}>{t("house") || "House"}</option>
                <option value="apartment" className={isDark ? "bg-zinc-900 text-white" : ""}>{t("apartment") || "Apartment"}</option>
                <option value="studio" className={isDark ? "bg-zinc-900 text-white" : ""}>{t("studio") || "Studio"}</option>
                <option value="land" className={isDark ? "bg-zinc-900 text-white" : ""}>{t("land") || "Land"}</option>
              </select>
            </div>
          </div>

          {/* Pricing Box */}
          <div className={`p-6 rounded-2xl border shadow-xl backdrop-blur-sm space-y-3 transition-all ${
            isDark ? "bg-zinc-950/70 border-white/10" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <label className="flex gap-2 items-center text-xs font-bold uppercase tracking-[0.25em] text-warm-brown">
              <FiDollarSign className="text-warm-brown w-4 h-4" /> {t("priceLabel") || "Price"} (MAD / EUR)
            </label>
            <input
              name="price"
              placeholder="15,000,000"
              value={form.price}
              onChange={handleChange}
              className={`w-full border p-3.5 rounded-xl text-sm outline-none transition-all ${
                isDark ? "bg-zinc-900/60 border-white/10 text-white focus:border-warm-brown" : "bg-white border-slate-200 text-slate-900"
              }`}
            />
          </div>

          {/* Main Cover Image */}
          <div className={`p-6 rounded-2xl border shadow-xl backdrop-blur-sm transition-all ${
            isDark ? "bg-zinc-950/70 border-white/10" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <p className="font-bold text-xs uppercase tracking-[0.25em] text-warm-brown mb-3">Main Cover Image</p>
            <div
              onClick={() => mainRef.current?.click()}
              className={`relative border-dashed border-2 rounded-2xl aspect-video flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all group ${
                isDark ? "border-white/20 bg-zinc-900/50 hover:border-warm-brown" : "border-slate-300 bg-slate-50 hover:border-warm-brown"
              }`}
            >
              {mainPreview ? (
                <Image
                  src={mainPreview}
                  alt="Main Preview"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              ) : (
                <div className="text-center p-4">
                  <FiUploadCloud className="w-8 h-8 text-warm-brown mx-auto mb-2" />
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400">Upload Main Photo</span>
                </div>
              )}
            </div>
            <input
              type="file"
              hidden
              ref={mainRef}
              accept="image/*"
              onChange={handleMainImage}
            />
          </div>

          {/* Gallery Images */}
          <div className={`p-6 rounded-2xl border shadow-xl backdrop-blur-sm transition-all ${
            isDark ? "bg-zinc-950/70 border-white/10" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-xs uppercase tracking-[0.25em] text-warm-brown flex gap-2 items-center">
                <FiLayers className="text-warm-brown w-4 h-4" /> Gallery Images
              </p>
              <button
                type="button"
                onClick={() => galleryRef.current?.click()}
                className="text-[10px] uppercase tracking-wider bg-warm-brown/20 hover:bg-warm-brown/30 border border-warm-brown/40 px-3.5 py-2 rounded-xl text-warm-brown font-semibold transition-all"
              >
                + Add Photos
              </button>
            </div>

            <input
              type="file"
              multiple
              hidden
              ref={galleryRef}
              accept="image/*"
              onChange={handleGallery}
            />

            <div className="grid grid-cols-3 gap-2.5 mt-3">
              {galleryPreviews.map((src, i) => (
                <div key={i} className={`relative aspect-square rounded-xl overflow-hidden border group ${isDark ? "border-white/10" : "border-slate-200"}`}>
                  <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt="Gallery item" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(i)}
                    className="absolute top-1.5 right-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Metadata */}
          <div className={`p-6 rounded-2xl border shadow-xl backdrop-blur-sm space-y-4 transition-all ${
            isDark ? "bg-zinc-950/70 border-white/10" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <p className="font-bold text-xs uppercase tracking-[0.25em] text-warm-brown flex gap-2 items-center">
              <FiSettings className="text-warm-brown w-4 h-4" /> SEO Metadata
            </p>
            <input
              name="metaTitle"
              placeholder="Meta Title"
              value={form.metaTitle}
              onChange={handleChange}
              className={`w-full border p-3.5 rounded-xl text-sm outline-none transition-all ${
                isDark ? "bg-zinc-900/60 border-white/10 text-white focus:border-warm-brown" : "bg-white border-slate-200 text-slate-900"
              }`}
            />
            <textarea
              name="metaDescription"
              placeholder="Meta Description"
              value={form.metaDescription}
              onChange={handleChange}
              className={`w-full border p-3.5 rounded-xl text-sm outline-none resize-none h-24 transition-all ${
                isDark ? "bg-zinc-900/60 border-white/10 text-white focus:border-warm-brown" : "bg-white border-slate-200 text-slate-900"
              }`}
            />
          </div>

        </div>

      </div>
    </div>
  );
}