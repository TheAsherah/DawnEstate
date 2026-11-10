import Image from "next/image";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import "../../app/globals.css"; 

const injectBannersIntoContent = (htmlContent, galleryArray) => {
  if (!htmlContent || !galleryArray || galleryArray.length === 0)
    return htmlContent;

  let h2Counter = 0;
  const unassignedImages = [...galleryArray.filter((img) => !img.index)];

  return htmlContent.replace(/<\/h2>/g, () => {
    h2Counter++;
    const matchingIndexedImages = galleryArray.filter(
      (img) => img.index && Number(img.index) === h2Counter
    );
    let imagesToRender = [...matchingIndexedImages];
    if (imagesToRender.length === 0 && unassignedImages.length > 0) {
      imagesToRender.push(unassignedImages.shift());
    }
    if (imagesToRender.length === 0) return `</h2>`;

    const imagesHTML = imagesToRender
      .map(
        (img) => `
      <figure class="co-gallery-figure">
        <div class="co-gallery-frame">
          <img
            src="${img.url}"
            alt="${img.alt || "Mooria group Masterpiece Details"}"
            width="900" height="562"
            loading="lazy" decoding="async" fetchpriority="low"
            class="co-gallery-img"
          />
        </div>
        ${
          img.alt
            ? `<figcaption class="co-gallery-caption">${img.alt}</figcaption>`
            : ""
        }
      </figure>`
      )
      .join("");

    return `</h2>${imagesHTML}`;
  });
};

export default function BlogContent({ blog }) {
  if (!blog) {
    return (
      <div className="co-not-found">
        <p>Journal entry not found.</p>
      </div>
    );
  }

  const modifiedContent = injectBannersIntoContent(
    blog.content,
    blog.galleryImages
  );

  return (
    <div className="co-page">
      <main className="co-main">
        <article>
          {/* ── HEADER ── */}
          <header className="co-header">
            <h1 className="co-title">{blog.postTitle || blog.metaTitle}</h1>

            {/* Meta row */}
            <div
              className="co-meta"
              role="complementary"
              aria-label="Article info"
            >
              <div className="co-meta-divider" aria-hidden="true" />
              <div className="co-meta-row">
                {/* Author badge */}
                <div className="co-author">
                  <div className="co-author-avatar" aria-hidden="true">
                    CO
                  </div>
                  <div className="co-author-info">
                    <span className="co-author-name">Atelier Editorial</span>
                    <time
                      dateTime={blog.publishedAt || blog.createdAt}
                      className="co-date"
                    >
                      {format(
                        new Date(blog.publishedAt || blog.createdAt),
                        "MMMM dd, yyyy"
                      )}
                    </time>
                  </div>
                </div>

                {/* Read time */}
                <div className="co-readtime">
                  <Clock className="co-clock-icon" aria-hidden="true" />
                  <span>5 min read</span>
                </div>
              </div>
              <div className="co-meta-divider" aria-hidden="true" />
            </div>
          </header>

          {/* ── HERO IMAGE ── */}
          {blog.image?.url && (
            <div className="co-hero">
              <div className="co-hero-frame">
                <Image
                  src={blog.image.url}
                  alt={blog.featuredImageAlt || blog.title}
                  width={1200}
                  height={750}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="co-hero-img"
                />
                <div className="co-hero-overlay" aria-hidden="true" />
              </div>
              {/* Decorative label */}
              <div className="co-hero-label" aria-hidden="true">
                Safi Studio · Abstract Form · Mineral Glaze
              </div>
            </div>
          )}
          <section className="co-content-section" aria-label="Article content">
            <div
              className="clay-content"
              dangerouslySetInnerHTML={{ __html: modifiedContent }}
            />
          </section>

        </article>
      </main>
    </div>
  );
}