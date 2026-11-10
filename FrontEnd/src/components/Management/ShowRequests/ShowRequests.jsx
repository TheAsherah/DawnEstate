"use client";
import {
  acceptblogAPI,
  getblogsAPI,
  rejectblogAPI,
  updateBlogAPI,
} from "@/services/blog.service";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Check,
  Trash2,
  Clock,
  Loader2,
  Settings2,
  Save,
  BookOpen
} from "lucide-react";
import { toast } from "react-toastify";

const ShowRequests = () => {
  const mode = useSelector((state) => state.theme?.mode) || "dark";
  const isDark = mode === "dark";

  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // States for Edit and Expand
  const [expandedId, setExpandedId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState({
    slug: "",
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    getallblogsreq();
  }, []);

  const getallblogsreq = async () => {
    setIsLoading(true);
    try {
      const response = await getblogsAPI();
      setBlogData(response.data);
    } catch (err) {
      toast.error("Failed to load requests");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (id) => {
    if (window.confirm("Are you sure you want to PUBLISH this article?")) {
      try {
        await acceptblogAPI(id);
        toast.success("Blog published live!");
        getallblogsreq();
      } catch (err) {
        toast.error("Action failed");
      }
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure? This action will DELETE the draft permanently."
      )
    ) {
      try {
        await rejectblogAPI(id);
        toast.info("Request rejected and deleted");
        getallblogsreq();
      } catch (err) {
        toast.error("Action failed");
      }
    }
  };

  const toggleExpand = (blog) => {
    if (expandedId === blog._id) {
      setExpandedId(null);
    } else {
      setExpandedId(blog._id);
      setEditData({
        slug: blog.slug || "",
        metaTitle: blog.metaTitle || "",
        metaDescription: blog.metaDescription || "",
      });
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSEO = async (id) => {
    setIsSaving(true);
    try {
      await updateBlogAPI(id, editData);
      toast.success("SEO details updated successfully!");

      setBlogData((prevData) =>
        prevData.map((b) => (b._id === id ? { ...b, ...editData } : b))
      );
      setExpandedId(null);
    } catch (err) {
      toast.error("Failed to update SEO details");
    } finally {
      setIsSaving(false);
    }
  };

  // Luxury UI Classes
  const inputStyle = `w-full border rounded-xl px-4 py-3 text-sm transition-all focus:outline-none ${
    isDark 
      ? "bg-zinc-900/60 border-white/10 text-white placeholder:text-zinc-600 focus:border-warm-brown focus:ring-1 focus:ring-warm-brown" 
      : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-warm-brown focus:ring-1 focus:ring-warm-brown"
  }`;

  return (
    <div className={`w-full max-w-7xl mx-auto pb-12 transition-colors duration-300 ${isDark ? "text-zinc-100" : "text-slate-800"}`}>
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-white/10 gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-warm-brown via-[#dfc29e] to-warm-brown">
            Editorial Review
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mt-1">
            Review and optimize community publications.
          </p>
        </div>
        <div className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border ${
          isDark ? "bg-zinc-900/50 border-white/10 text-zinc-400" : "bg-slate-100 border-slate-200 text-slate-500"
        }`}>
          {blogData.length} Articles Pending
        </div>
      </div>

      {isLoading ? (
        <div className={`flex flex-col items-center justify-center py-24 rounded-2xl border backdrop-blur-md shadow-sm ${
          isDark ? "bg-zinc-950/70 border-white/10" : "bg-white border-slate-200"
        }`}>
          <Loader2 className="w-8 h-8 text-warm-brown animate-spin mb-4" />
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            Scanning Database...
          </p>
        </div>
      ) : blogData.length === 0 ? (
        <div className={`flex flex-col items-center justify-center py-24 rounded-2xl border backdrop-blur-md shadow-sm text-center ${
          isDark ? "bg-zinc-950/70 border-white/10" : "bg-white border-slate-200"
        }`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border ${
            isDark ? "bg-zinc-900/50 border-white/10" : "bg-slate-50 border-slate-200"
          }`}>
            <BookOpen className="w-6 h-6 text-zinc-400" />
          </div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
            No pending articles at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {blogData.map((blog) => (
            <div
              key={blog._id}
              className={`flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-md ${
                isDark 
                  ? "bg-zinc-950/70 border-white/10 hover:border-[#c5a880]/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)]" 
                  : "bg-white border-slate-200 hover:border-warm-brown/30 shadow-sm hover:shadow-md"
              } ${expandedId === blog._id ? (isDark ? "ring-1 ring-warm-brown border-warm-brown" : "ring-1 ring-warm-brown border-warm-brown") : ""}`}
            >
              {/* Main Row */}
              <div className="flex flex-col md:flex-row items-center gap-6 p-5">
                
                {/* Image Preview */}
                <div className="relative w-full md:w-[140px] h-[90px] rounded-xl overflow-hidden border border-white/10 shrink-0 group">
                  <Image
                    fill
                    src={blog.image?.url || "/placeholder.jpg"}
                    alt={blog.title}
                    className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                    unoptimized
                  />
                </div>

                {/* Title & Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className={`text-base font-serif font-bold leading-snug mb-2 transition-colors duration-300 ${
                    isDark ? "text-white hover:text-warm-brown" : "text-slate-900 hover:text-warm-brown"
                  }`}>
                    {blog.title}
                  </h3>
                  <div className="flex items-center justify-center md:justify-start gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-warm-brown" />
                      {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                    <span className="text-warm-brown">
                      {blog.category || "Editorial"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                  
                  <button
                    onClick={() => toggleExpand(blog)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all border ${
                      expandedId === blog._id
                        ? (isDark ? "bg-warm-brown/20 text-warm-brown border-warm-brown/30" : "bg-warm-brown/10 text-warm-brown border-warm-brown/20")
                        : (isDark ? "bg-zinc-900/50 text-zinc-400 hover:text-white border-white/5 hover:border-white/20" : "bg-slate-50 text-slate-500 hover:text-slate-800 border-slate-200")
                    }`}
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">SEO</span>
                  </button>

                  <button
                    onClick={() => handleAccept(blog._id)}
                    disabled={blog.accepted}
                    className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all border ${
                      blog.accepted
                        ? (isDark ? "bg-zinc-800 text-zinc-500 border-white/5 cursor-not-allowed" : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed")
                        : (isDark ? "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border-emerald-500/30" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200")
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {blog.accepted ? "Published" : "Approve"}
                  </button>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className={`p-2.5 rounded-xl transition-all border ${
                      isDark ? "bg-red-900/20 hover:bg-red-900/40 text-red-400 border-red-500/30" : "bg-red-50 hover:bg-red-100 text-red-500 border-red-200"
                    }`}
                    title="Reject Request"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Expanded SEO Edit Section */}
              {expandedId === blog._id && (
                <div className={`p-6 border-t ${isDark ? "border-white/10 bg-zinc-900/30" : "border-slate-100 bg-slate-50"}`}>
                  <div className="mb-5">
                    <h4 className={`text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                      <Settings2 className="w-4 h-4 text-warm-brown" /> 
                      Optimize Routing & Meta
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div className="space-y-2">
                      <label className={`text-[10px] font-bold uppercase tracking-widest pl-1 ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
                        URL Slug
                      </label>
                      <input
                        name="slug"
                        value={editData.slug}
                        onChange={handleEditChange}
                        placeholder="e.g. how-to-manage-salon"
                        className={inputStyle}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`text-[10px] font-bold uppercase tracking-widest pl-1 ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
                        Meta Title
                      </label>
                      <input
                        name="metaTitle"
                        value={editData.metaTitle}
                        onChange={handleEditChange}
                        placeholder="SEO Title (60 chars max)"
                        maxLength={60}
                        className={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <label className={`text-[10px] font-bold uppercase tracking-widest pl-1 ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
                      Meta Description
                    </label>
                    <textarea
                      name="metaDescription"
                      value={editData.metaDescription}
                      onChange={handleEditChange}
                      rows={2}
                      placeholder="SEO Description (160 chars max)"
                      maxLength={160}
                      className={`${inputStyle} resize-none`}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleUpdateSEO(blog._id)}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-warm-brown to-[#b3936c] hover:opacity-90 text-white text-[11px] font-bold rounded-xl transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" /> Save SEO
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowRequests;