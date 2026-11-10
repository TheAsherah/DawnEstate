import BlogPage from "@/components/blog/Blogpage";

export const metadata = {
  title: "Mooria Group Insights | Botanical Skincare & B2B Export Blog",

  description:
    "Explore global trade guides, organic formulation insights, and B2B export logistics for certified Moroccan Argan oil, botanical waters, and private label cosmetics.",

  keywords: [
    "Moroccan botanical wholesale",
    "organic Argan oil export",
    "private label skincare manufacturer",
    "certified cosmetics Morocco",
    "bulk botanical oils supplier",
    "Mooria Group trade journal",
    "B2B skincare export",
  ],

  authors: [{ name: "Mooria Group Trade Desk" }],
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://www.mooriagroup.com/blog",
  },

  openGraph: {
    title: "Mooria Group Insights | Botanical Trade & Wholesale Export",
    description:
      "Industry analysis, private label guides, and certified supply chain practices for authentic Moroccan botanical lines.",
    url: "https://www.mooriagroup.com/blog",
    type: "website",
    locale: "en_US",
    siteName: "Mooria Group",
    images: [
      {
        url: "https://www.mooriagroup.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mooria Group Insights - Certified Moroccan Botanical Export",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mooria Group Insights | B2B Botanical Export & Formulation",
    description:
      "Expert trade guides and market insights on wholesale Moroccan botanical oils and private label manufacturing.",
    images: ["https://www.mooriagroup.com/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": "https://www.mooriagroup.com/blog/#blog",
      url: "https://www.mooriagroup.com/blog",
      name: "Mooria Group Botanical Trade & Export Journal",
      description:
        "Industry insights on Moroccan skincare manufacturing, organic Argan oil export, and B2B private label solutions.",
      publisher: {
        "@type": "Organization",
        name: "Mooria Group",
        url: "https://www.mooriagroup.com",
        logo: "https://www.mooriagroup.com/logo.png",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.mooriagroup.com/blog/#breadcrumb",
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
          name: "Journal & Insights",
          item: "https://www.mooriagroup.com/blog",
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-[#FAFAFF] min-h-screen text-[#0F1115] font-satoshi antialiased selection:bg-[#002855] selection:text-white">
        <BlogPage />
      </main>
    </>
  );
}