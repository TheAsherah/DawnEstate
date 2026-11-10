// generate-sitemap.js
const fs = require("fs");
const path = require("path");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const siteUrl = "https://www.mooriagroup.com";
const apiUrl = "https://back-mooriagroup.vercel.app/api/blog/";
const apiUrlP = "https://back-mooriagroup.vercel.app/api/product/";

const generateSitemap = async () => {
  try {
    console.log("🚀 Fetching blogs from API...");

    const response = await fetch(apiUrl);

    const responses = await fetch(apiUrlP);

    const product = await responses.json();
    const blogs = await response.json();

    const staticPages = [
      "",
      "about-us",
      "private-label",
      "contact",
      "blog",
      "store",
      "terms-of-service",
      "privacy-policy",
      "export-services-in-morocco",
    ];
    
    const blogPages = blogs.map((blog) => {
      const slug = blog.slug
        ? blog.slug.replace(/\s+/g, "-")
        : blog.title.replace(/\s+/g, "-");
      return `blog/${slug}`;
    });
    const productPages = product.map((blog) => {
      const slug = blog.slug
        ? blog.slug.replace(/\s+/g, "-")
        : blog.title.replace(/\s+/g, "-");
      return `store/${slug}`;
    });
    const allPages = [...staticPages, ...blogPages, ...productPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `
  <url>
    <loc>${siteUrl}/${page}</loc>
  </url>`
  )
  .join("")}
</urlset>`;

    const filePath = path.join(process.cwd(), "public", "sitemap.xml");
    fs.writeFileSync(filePath, sitemap, "utf8");

    console.log("✅ Sitemap generated successfully at:", filePath);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
  }
};

generateSitemap();
