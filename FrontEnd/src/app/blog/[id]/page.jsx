import BlogContent from "@/components/blog/BlogC";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";

// Fetch Blog Data with revalidation
async function fetchBlogData(slug) {
  try {
    const res = await fetch(
      `https://backend-dawn.vercel.app/api/blog/${slug}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

// 1. DYNAMIC METADATA GENERATION FOR B2B SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    return {
      title: "Article Not Found | Mooria Group Insights",
      description: "The requested trade insights article does not exist.",
    };
  }

  const blog = await fetchBlogData(id);
  const baseUrl = "https://www.mooriagroup.com";

  if (!blog) {
    return {
      title: "Article Not Found | Mooria Group Insights",
      description: "The requested trade insights article does not exist.",
    };
  }
 // const keywords = blog.tags;
  const title = `${blog.metaTitle || blog.title} | Mooria Group Insights`;
  const description = (
    blog.metaDescription ||
    blog.description ||
    blog.content?.replace(/<[^>]*>/g, "").substring(0, 160) ||
    "Read certified B2B trade insights and Moroccan botanical skincare guides from Mooria Group."
  ).slice(0, 160);

  const imageUrl = blog.image?.url || `${baseUrl}/logo-mooria.png`;
  const articleUrl = `${baseUrl}/blog/${id}`;

  return {
    title,
    description,
    alternates: {
      canonical: articleUrl,
    },
    
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
      url: articleUrl,
      siteName: "Mooria Group",
      type: "article",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.featuredImageAlt || title,
        },
      ],
      article: {
        publishedTime: blog.publishedAt || blog.createdAt,
        modifiedTime: blog.updatedAt,
        authors: [blog.user?.name || "Mooria Group Trade Desk"],
        section: blog.category || "Botanical Trade & Export",
        tags: blog.tags || ["Moroccan Skincare", "B2B Export", "Organic Oils"],
      },
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: "@MooriaGroup",
    },
    metadataBase: new URL(baseUrl),
  };
}

// 2. MAIN BLOG PAGE COMPONENT
export default async function BlogPage({ params }) {
  const resolvedParams = await params;
  const decodedSlug = resolvedParams?.id;

  const blog = decodedSlug ? await fetchBlogData(decodedSlug) : null;

  if (!blog) {
    return (
      <div className="bg-[#FAFAFF] min-h-screen text-[#0F1115] font-satoshi flex flex-col justify-between">
        <Header />
        <main className="py-40 text-center container mx-auto px-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B80C09] block mb-2">
            404 — Insight Missing
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0F1115] mb-6">
            Trade Article Not Found
          </h1>
          <p className="text-sm text-[#0F1115]/60 max-w-md mx-auto mb-8 font-medium">
            The market analysis or formulation article you are looking for has
            been archived or moved.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription || blog.shortDescription || "",
    image: [blog.image?.url || "https://www.mooriagroup.com/logo-mooria.png"],
    datePublished: blog.publishedAt || blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: {
      "@type": "Person",
      name: "Mooria Group",
      url: "https://www.mooriagroup.com",
    },
    publisher: {
      "@type": "Person",
      name: "Mooria Group",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mooriagroup.com/logo-mooria.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.mooriagroup.com/blog/${decodedSlug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.mooriagroup.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.mooriagroup.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.postTitle || blog.metaTitle,
        item: `https://www.mooriagroup.com/blog/${decodedSlug}`,
      },
    ],
  };

  return (
    <div className="bg-[#FAFAFF] min-h-screen text-[#0F1115] font-satoshi antialiased selection:bg-[#002855] selection:text-white flex flex-col justify-between">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />

      <main className="flex-1 pb-32 pt-28">
        <BlogContent blog={blog} />
      </main>

      <Footer />
    </div>
  );
}
