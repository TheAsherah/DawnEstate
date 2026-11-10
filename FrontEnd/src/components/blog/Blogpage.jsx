"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { getallblogsAPI } from "@/services/blog.service";
import { format } from "date-fns";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Header } from "../home/Header";
import { Footer } from "../home/Footer";

const PAGE_SIZE = 20;

function ScrollReveal({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function BlogPage() {
  const [blogData, setBlogData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const getInitialBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getallblogsAPI(1);
      const fetchedBlogs = res.data || [];
      setBlogData(fetchedBlogs);
      setHasMore(fetchedBlogs.length === PAGE_SIZE);
      setPage(1);
    } catch (err) {
      console.error("Error fetching trade insights:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getInitialBlogs();
  }, [getInitialBlogs]);

  const handleLoadMore = useCallback(async () => {
    if (!hasMore || isFetchingMore) return;
    const nextPage = page + 1;
    setIsFetchingMore(true);
    try {
      const res = await getallblogsAPI(nextPage);
      const newBlogs = res.data || [];
      if (newBlogs.length > 0) {
        setBlogData((prev) => [...prev, ...newBlogs]);
        setPage(nextPage);
      }
      if (newBlogs.length < PAGE_SIZE) setHasMore(false);
    } catch (err) {
      console.error("Error loading more trade insights:", err);
    } finally {
      setIsFetchingMore(false);
    }
  }, [page, hasMore, isFetchingMore]);

  const categories = useMemo(() => {
    if (blogData.length === 0) return ["All"];
    return [
      "All",
      ...Array.from(new Set(blogData.map((b) => b.category).filter(Boolean))),
    ];
  }, [blogData]);

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === "All") return blogData;
    return blogData.filter((b) => b.category === selectedCategory);
  }, [blogData, selectedCategory]);

  // Dynamic Blog List Schema for Google Search Engine indexing
  const blogListSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Mooria Group Botanical Insights",
      description: "Analysis on Moroccan botanical exports, organic formulations, and OEM private label strategies.",
      blogPost: filteredBlogs.map((post) => ({
        "@type": "BlogPosting",
        headline: post.postTitle || post.title,
        image: post.image?.url || "https://www.mooriagroup.com/og-image.jpg",
        datePublished: new Date(
          post.publishedAt || post.createdAt || Date.now()
        ).toISOString(),
        url: `https://www.mooriagroup.com/blog/${post.slug || post._id}`,
      })),
    };
  }, [filteredBlogs]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFF] text-[#0F1115] font-satoshi selection:bg-[#002855] selection:text-white antialiased">
      <Header />

      {/* Structured Schema for Search Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

      <main className="flex-1 pb-28 pt-28">
        {/* 1. EDITORIAL HERO HEADER */}
        <section className="pt-8 pb-14 relative">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 bg-[#002855]/5 border border-[#002855]/10 px-3.5 py-1.5 rounded-full mb-4">
                <Sparkles size={13} className="text-[#B80C09]" />
                <span className="text-[#002855] text-[10px] font-bold uppercase tracking-[0.2em]">
                  Trade Desk & Market Analysis
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0F1115] leading-[1.05] mb-4">
                Journal & Insights
              </h1>
              <p className="text-xs sm:text-sm text-[#0F1115]/60 max-w-lg mx-auto mb-8 font-medium leading-relaxed">
                Expert perspective on Moroccan botanical exports, private label formulation, and international compliance standards.
              </p>

              
            </ScrollReveal>
          </div>
        </section>

        {/* 2. GRID JOURNAL SHOWCASE */}
        <div className="container mx-auto px-6 max-w-7xl">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="w-full aspect-[16/10] bg-[#EDF2F7] rounded-2xl" />
                  <div className="h-3 bg-[#EDF2F7] rounded w-1/4" />
                  <div className="h-5 bg-[#EDF2F7] rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {filteredBlogs.map((post, postIdx) => (
                  <ScrollReveal
                    key={post._id || postIdx}
                    delay={(postIdx % 3) * 80}
                  >
                    <article className="group h-full">
                      <Link
                        href={`/blog/${post.slug || post._id}`}
                        className="flex flex-col h-full relative"
                      >
                        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-white mb-4 border border-[#EDF2F7] shadow-2xs">
                          <Image
                            fill
                            priority={postIdx < 3}
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                            src={post.image?.url || "/placeholder.jpg"}
                            alt={post.postTitle || post.title || "Article Image"}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />

                          {/* Category Badge */}
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[9px] font-bold text-[#002855] uppercase tracking-widest shadow-2xs border border-[#EDF2F7]">
                            {post.category || "Insight"}
                          </div>
                        </div>

                        {/* Article Meta */}
                        <div className="flex flex-col flex-1 px-1">
                          <time
                            dateTime={new Date(post.publishedAt || post.createdAt || Date.now()).toISOString()}
                            className="text-[10px] font-bold text-[#B80C09] mb-2 uppercase tracking-[0.2em]"
                          >
                            {format(
                              new Date(
                                post.publishedAt || post.createdAt || Date.now()
                              ),
                              "MMMM dd, yyyy"
                            )}
                          </time>

                          <h2 className="text-base sm:text-lg font-bold text-[#0F1115] leading-snug mb-3 group-hover:text-[#002855] transition-colors duration-300 line-clamp-2">
                            {post.postTitle || post.title}
                          </h2>

                          {/* Read Action */}
                          <div className="mt-auto pt-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#002855] group-hover:text-[#B80C09] transition-colors">
                            <span>Read Article</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </div>
                      </Link>
                    </article>
                  </ScrollReveal>
                ))}
              </div>

              {/* LOAD MORE TRIGGER */}
              {hasMore && selectedCategory === "All" && (
                <div className="flex justify-center mt-16 pt-8 border-t border-[#EDF2F7]">
                  <button
                    onClick={handleLoadMore}
                    disabled={isFetchingMore}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#002855] text-white hover:bg-[#B80C09] rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isFetchingMore ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Load More Articles</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default BlogPage;