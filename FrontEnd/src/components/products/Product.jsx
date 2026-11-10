"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getAllProductsAPI } from "@/services/user.service";
import {
  Loader2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Header } from "../home/Header";
import { Footer } from "../home/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQty, decreaseQty } from "@/redux/slices/cartSlice";
import { BiCartAdd } from "react-icons/bi";

const PAGE_SIZE = 20;

export default function ProductsPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const cartItems = useSelector((state) => state.cart.items);

  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const getInitialProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllProductsAPI(1);
      const fetchedProducts = res.data || [];
      setProducts(fetchedProducts);
      setHasMore(fetchedProducts.length === PAGE_SIZE);
      setPage(1);

      // Read category from URL query (e.g. ?category=soap)
      const queryCategory = searchParams.get("category");
      if (queryCategory) {
        const uniqueCategories = Array.from(
          new Set(
            fetchedProducts
              .map((p) => p.category)
              .filter(Boolean)
          )
        );

        const matchedCategory = uniqueCategories.find(
          (cat) => cat.toLowerCase() === queryCategory.toLowerCase()
        );

        if (matchedCategory) {
          setActiveCategory(matchedCategory);
        }
      }
    } catch (err) {
      console.error("Error fetching catalogue:", err);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    getInitialProducts();
  }, [getInitialProducts]);

  const handleLoadMore = useCallback(async () => {
    if (!hasMore || isFetchingMore) return;
    const nextPage = page + 1;
    setIsFetchingMore(true);
    try {
      const res = await getAllProductsAPI(nextPage);
      const newProducts = res.data || [];
      if (newProducts.length > 0) {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage(nextPage);
      }
      if (newProducts.length < PAGE_SIZE) setHasMore(false);
    } catch (err) {
      console.error("Error loading more products:", err);
    } finally {
      setIsFetchingMore(false);
    }
  }, [page, hasMore, isFetchingMore]);

  const categories = useMemo(() => {
    if (products.length === 0) return ["All"];
    return [
      "All",
      ...Array.from(
        new Set(products.map((p) => p.category).filter(Boolean))
      ),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  // Dynamic ItemList Schema for Google Search Engine indexing
  const itemListSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Mooria Group Wholesale Skincare Catalogue",
      description: "Certified Moroccan organic Argan oil, floral hydrosols, and private label cosmetics.",
      numberOfItems: filteredProducts.length,
      itemListElement: filteredProducts.map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: p.title,
          image: p.mainImage?.url || "https://www.mooriagroup.com/og-image.jpg",
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: p.discountPrice || p.price,
            availability:
              p.stock === "in_stock"
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
          },
          url: `https://www.mooriagroup.com/store/${p.slug || p._id}`,
        },
      })),
    };
  }, [filteredProducts]);

  return (
    <div className="bg-[#FAFAFF] min-h-screen flex flex-col antialiased text-[#0F1115] font-satoshi selection:bg-[#002855] selection:text-white">
      <Header />

      {/* JSON-LD Product List Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <main className="flex-1 pb-36 pt-28">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* 1. HERO HEADER — Clean Editorial Store Vibe */}
          <header className="relative mb-12 pt-6 border-b border-[#EDF2F7] pb-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 bg-[#002855]/5 border border-[#002855]/10 px-3.5 py-1.5 rounded-full">
                  <Sparkles size={13} className="text-[#B80C09]" />
                  <span className="text-[#002855] text-[10px] font-bold uppercase tracking-[0.2em]">
                    Authentic Moroccan Botanicals
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[1.02] text-[#0F1115]">
                  Wholesale Catalogue
                  <span className="block font-light normal-case text-[#002855] text-lg sm:text-2xl mt-1">
                    Certified organic oils, floral waters & skincare lines.
                  </span>
                </h1>
              </div>

              {/* Live Count Badge */}
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-[#002855] text-white px-4 py-2 rounded-full shadow-2xs">
                  <span className="text-xs font-bold tracking-wide">
                    {filteredProducts.length} Products Available
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#EDF2F7] text-[#002855] px-4 py-2 rounded-full">
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    ONSSA / Foodex Export Ready
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[#0F1115]/60 text-xs sm:text-sm leading-relaxed max-w-xl mt-4 font-medium">
              Explore our selection of pure cold-pressed Argan oil, Damask rose hydrosols, traditional black soaps, and OEM private label bases—extracted and packaged in Casablanca.
            </p>
          </header>

          {/* 2. PILL CATEGORY FILTER */}
          <nav className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar" aria-label="Category Filter">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#002855] text-white shadow-md shadow-[#002855]/15 scale-102"
                    : "bg-white text-[#0F1115]/60 hover:bg-[#EDF2F7] hover:text-[#0F1115] border border-[#EDF2F7]"
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* 3. PRODUCT GRID */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-3">
                  <div className="aspect-square bg-[#EDF2F7] rounded-2xl" />
                  <div className="h-3 bg-[#EDF2F7] rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {filteredProducts.map((product) => {
                const isOutOfStock = product.stock !== "in_stock";
                const cartItem = cartItems.find(
                  (item) => item.id === product._id
                );

                return (
                  <article key={product._id} className="group flex flex-col">
                    <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-white border border-[#EDF2F7] shadow-2xs">
                      <Link href={`/store/${product.slug || product._id}`} className="block w-full h-full">
                        <Image
                          src={product.mainImage?.url || "/placeholder.jpg"}
                          alt={product.title}
                          fill
                          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </Link>

                      {/* Smooth Dark Gradient Overlay on Hover */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F1115]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Category Pill */}
                      <span className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#002855] shadow-2xs border border-[#EDF2F7]">
                        {product.category}
                      </span>

                      {/* Price Tag */}
                      <span className="absolute bottom-3 left-3 z-10 text-white font-black text-base tracking-tight opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                        ${product.discountPrice || product.price}
                      </span>

                      {/* Cart Action Buttons */}
                      <div className="absolute bottom-3 right-3 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                        {cartItem ? (
                          <div className="bg-white flex items-center gap-1.5 text-[#002855] rounded-full px-1.5 py-1 shadow-md border border-[#EDF2F7]">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(decreaseQty(product._id));
                              }}
                              className="hover:text-[#B80C09] p-1 transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-bold text-xs w-4 text-center">
                              {cartItem.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(increaseQty(product._id));
                              }}
                              className="hover:text-[#B80C09] p-1 transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            disabled={isOutOfStock}
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(
                                addToCart({
                                  id: product._id,
                                  title: product.title,
                                  price: product.discountPrice || product.price,
                                  image: product.mainImage?.url,
                                  slug: product.slug,
                                })
                              );
                            }}
                            className="p-2.5 bg-white text-[#002855] hover:bg-[#B80C09] hover:text-white rounded-full transition-colors shadow-md disabled:opacity-0 cursor-pointer"
                            aria-label="Add to cart"
                          >
                            <BiCartAdd size={18} />
                          </button>
                        )}
                      </div>

                      {/* Out of Stock Overlay */}
                      {isOutOfStock && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-2xs flex items-center justify-center z-20">
                          <span className="bg-[#0F1115] text-white px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest">
                            Currently Sold Out
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Title Below Card */}
                    <div className="mt-3">
                      <Link
                        href={`/store/${product.slug || product._id}`}
                        className="text-xs font-bold uppercase tracking-wider text-[#0F1115] hover:text-[#002855] transition-colors line-clamp-1"
                      >
                        {product.title}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* 4. LOAD MORE */}
          {hasMore && activeCategory === "All" && (
            <div className="text-center mt-20 pt-10 border-t border-[#EDF2F7]">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isFetchingMore}
                className="inline-flex items-center gap-3 px-10 py-4 bg-[#002855] text-white hover:bg-[#B80C09] font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-200 shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <span>
                  {isFetchingMore ? "Loading More..." : "Load Full Catalogue"}
                </span>
                {isFetchingMore ? (
                  <Loader2 className="animate-spin" size={14} />
                ) : (
                  <ArrowRight size={14} />
                )}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}