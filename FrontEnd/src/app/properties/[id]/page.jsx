import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import Link from "next/link";
import { MapPin, Maximize, Bath, Bed, Waves, ArrowLeft, Share2, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// 1. Fetch Property by slug (Server Side)
async function fetchProduct(id) {
    try {
      const res = await fetch(
        `https://backend-dawn.vercel.app/api/properties/${id}`,
        {
          next: { revalidate: 60 }, 
        }
      );
      if (!res.ok) return null;
      return res.json();
    } catch (error) {
      console.error("SEO Fetch Error:", error);
      return null;
    }
  }

// 2. Dynamic Metadata for SEO & OpenGraph
export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = await fetchProduct(id);
  const baseUrl = "https://www.dawne-state.com"; // bdel domain dyalk

  if (!property) {
    return {
      title: "Property Not Found | Dawn Estate",
      robots: { index: false, follow: false },
    };
  }

  const title = `${property.metaTitle || property.title} | Dawn Estate Marrakech`;
  const description = (
    property.metaDescription ||
    `Discover ${property.title}, a luxury ${property.category} located in ${property.city}, Morocco.`
  ).slice(0, 160);
  const imageUrl = property.mainImage?.url || `${baseUrl}/og-image.jpg`;
  const propertyUrl = `${baseUrl}/properties/${property.slug || slug}`;

  return {
    title,
    description,
    alternates: { canonical: propertyUrl },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: propertyUrl,
      siteName: "Dawn Estate",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: property.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    other: {
      "og:type": "product",
      "product:price:amount": property.price,
      "product:price:currency": "MAD",
      "product:availability": "instock",
    },
  };
}

export default async function PropertyDetailPage({ params }) {
  const { id } = await params;
  const property = await fetchProduct(id);

  if (!property) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-black uppercase tracking-tight mb-2">
          Property specified not found.
        </h1>
        <Link
          href="/properties"
          className="text-warm-brown font-bold text-xs uppercase tracking-widest underline"
        >
          Return To Properties Portfolio
        </Link>
      </div>
    );
  }

  const whatsappNumber = "212762829992";

  // Gather all images (Main + Gallery)
  const allImages = [
    property.mainImage?.url,
    ...(property.gallery?.map((img) => img.url) || []),
  ].filter(Boolean);

  const formatPrice = (price) => {
    if (!price) return { amount: "On Request", currency: "" };
    const numPrice = parseFloat(price.toString().replace(/,/g, ""));
    const parts = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
    }).formatToParts(numPrice);

    return {
      amount: parts
        .filter((part) => part.type !== "currency" && part.type !== "literal")
        .map((part) => part.value)
        .join("")
        .trim(),
      currency: parts.find((part) => part.type === "currency")?.value || "MAD",
    };
  };

  // JSON-LD Real Estate Schema
  const propertyJsonLd = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: property.title,
    image: allImages,
    description: property.metaDescription || property.title,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address || "",
      addressLocality: property.city || "Marrakech",
      addressCountry: "MA",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      price: String(property.price),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-warm-brown pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyJsonLd) }}
      />

      <Header />

      {/* Back Button Floating */}
      <Link
        href="/properties"
        className="fixed top-28 left-8 z-40 w-12 h-12 bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground hover:bg-warm-brown hover:border-warm-brown transition-all duration-300 shadow-lg"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      {/* Hero Gallery Section */}
      <section className="relative h-[85vh] overflow-hidden">
        <img
          src={allImages[0] || "/placeholder.jpg"}
          alt={property.title}
          className="w-full h-full object-cover grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

        <div className="absolute bottom-20 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Badge className="bg-warm-brown text-white text-[10px] tracking-[0.4em] uppercase rounded-none px-6 py-2 border-none">
                  {property.prestation === "sale" ? "For Sale" : "For Rent / Airbnb"}
                </Badge>
                <span className="text-muted-foreground text-[10px] tracking-[0.4em] uppercase font-medium">
                  /{property.category}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-white max-w-4xl leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center text-warm-brown text-sm tracking-[0.3em] font-medium uppercase">
                <MapPin className="w-4 h-4 mr-3" />
                {property.address ? `${property.address}, ` : ""}
                {property.city || "Marrakech"}, MOROCCO
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-32">
            
            {/* Features Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-y border-border py-12">
              {[
                { icon: Maximize, label: "SURFACE", value: property.surface ? `${property.surface} M²` : "N/A" },
                { icon: Bed, label: "BEDROOMS", value: property.bedrooms ?? "N/A" },
                { icon: Bath, label: "BATHROOMS", value: property.bathrooms ?? "N/A" },
                { icon: Waves, label: "POOL", value: property.pool === "yes" ? "Yes" : "No" },
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center gap-3 text-warm-brown">
                    <item.icon className="w-4 h-4" />
                    <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-2xl font-light tracking-widest">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Gallery Grid */}
            {allImages.length > 1 && (
              <div className="space-y-12">
                <h3 className="text-3xl font-serif text-muted-foreground">Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {allImages.map((img, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-muted overflow-hidden border border-border rounded-xl shadow-lg"
                    >
                      <img
                        src={img}
                        alt={`Gallery ${i}`}
                        className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-12 max-w-3xl">
              <h2 className="text-4xl font-serif leading-tight">Property Overview</h2>
              <article
                className="space-y-8 text-muted-foreground text-base font-light leading-relaxed prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: property.description }}
              />
            </div>
          </div>

          {/* Sidebar / Contact */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-12 bg-card border border-border p-12 rounded-2xl shadow-xl">
              <div className="space-y-4">
                <span className="text-warm-brown text-[10px] tracking-[0.4em] uppercase font-medium">
                  INQUIRY PRICE
                </span>
                <p className="whitespace-nowrap text-3xl sm:text-4xl font-light tracking-wide">
                  <span className="block font-semibold text-warm-brown">
                    {formatPrice(property.price).amount}
                  </span>
                  <span className="block text-xs sm:text-sm tracking-[0.3em] text-muted-foreground mt-1">
                    {formatPrice(property.price).currency}
                  </span>
                </p>
              </div>

              <div className="pt-12 border-t border-border space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-muted flex items-center justify-center border border-border rounded-xl">
                    <User className="w-8 h-8 text-warm-brown" />
                  </div>
                  <div>
                    <p className="text-lg font-serif">Dawn Estate</p>
                    <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                      EXPERT ADVISOR
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      `I'm interested in the property: ${property.title} located in ${property.city}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-warm-brown text-white py-5 text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-warm-brown/90 transition-all duration-500 flex items-center justify-center gap-4 rounded-xl shadow-md"
                  >
                    <Share2 className="w-4 h-4" />
                    CONTACT VIA WHATSAPP
                  </a>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      `I'd like to request a viewing for: ${property.title} located in ${property.city}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full border border-border text-foreground py-5 text-[10px] tracking-[0.4em] uppercase font-medium hover:bg-muted transition-all duration-500 rounded-xl text-center block"
                  >
                    REQUEST VIEWING
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}