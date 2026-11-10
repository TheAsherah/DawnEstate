import Script from "next/script";
import "../components/style/globals.css"; // T2kd mn l-path dyal css
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { ReduxProvider } from "@/redux/provider"; // Zidna Redux Provider
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/i18n/LanguageContext";

// Optimized Google Fonts
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

// Metadata l Dawn Estate
export const metadata = {
  metadataBase: new URL("https://www.dawnestate.com"),
  title: {
    default:
      "Dawn Estate | Luxury Real Estate & Exclusive Properties in Marrakech",
  },
  description:
    "Dawn Estate is your premier destination for luxury real estate. We offer exclusive properties, villas, and personalized service in Marrakech.",
  keywords: [
    "Luxury Real Estate Marrakech",
    "Villas for sale Marrakech",
    "Exclusive Properties",
    "Dawn Estate",
    "Premium Real Estate Morocco",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.dawnestate.com",
    siteName: "Dawn Estate",
    title: "Dawn Estate | Luxury Real Estate Marrakech",
    description:
      "Discover an exclusive collection of Marrakech's most refined estates.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dawn Estate Luxury Properties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawn Estate | Luxury Real Estate",
    description:
      "Discover an exclusive collection of Marrakech's most refined estates.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  // Schema dyal SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Dawn Estate",
    url: "https://www.dawnestate.com",
    logo: "https://www.dawnestate.com/uploads/logoooooooooo.png",
    description:
      "Premier destination for luxury real estate and exclusive properties in Marrakech.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marrakech",
      addressCountry: "MA",
    },
  };

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('dawn-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch (_) {}
            `,
          }}
        />
      </head>

      <body
        className={`${jakarta.className} antialiased bg-background text-foreground relative`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GZ7N7ND94K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GZ7N7ND94K');
          `}
        </Script>

        <ReduxProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
