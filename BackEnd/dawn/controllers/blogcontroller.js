const { Blog } = require("../models/Blog");
const Blogger = require("../models/User");
const Staff = require("../models/Staff");
const BlogService = require("../services/blog.service");
const { cloudinaryUploadImage } = require("../utils/cloudinary");

/** --------------------------------------------------
 *   @desc  create new blog
 *   @route /api/blog
 *   @method post
 *   @access private (only logged user)
 
  --------------------------------------------------  **/
exports.createblogCtrl = async (req, res) => {
  const {
    postTitle,
    content,
    category,
    slug,
    tags,
    metaTitle,
    metaDescription,
    featuredImageAlt,
    galleryMeta,
  } = req.body;

  const user = req.id;

  const featuredImageFile =
    req.files && req.files["featuredImage"]
      ? req.files["featuredImage"][0]
      : null;
  const galleryImageFiles =
    req.files && req.files["galleryImages"] ? req.files["galleryImages"] : [];

  try {
    let blogger = await Staff.findById(user);
    if (!blogger) {
      blogger = await Blogger.findById(user);
      if (!blogger) {
        return res
          .status(403)
          .json({ message: "Access denied. Staff or admin only." });
      }
    }

    if (!postTitle || !content || !featuredImageFile) {
      return res.status(400).json({
        error: "postTitle, content, and featured image are required!",
      });
    }

    let parsedGalleryMeta = [];
    if (galleryMeta) {
      try {
        parsedGalleryMeta = JSON.parse(galleryMeta);
      } catch (err) {
        console.error("Error parsing galleryMeta:", err);
      }
    }

    const uploadedImage = await cloudinaryUploadImage(featuredImageFile.path);

    let uploadedGallery = [];
    if (galleryImageFiles.length > 0) {
      const uploadPromises = galleryImageFiles.map((file) =>
        cloudinaryUploadImage(file.path)
      );
      const results = await Promise.all(uploadPromises);

      uploadedGallery = results.map((result, i) => ({
        url: result.secure_url,
        publicId: result.public_id,
        alt: parsedGalleryMeta[i]?.alt || "",
        index: parsedGalleryMeta[i]?.index
          ? Number(parsedGalleryMeta[i].index)
          : null,
      }));
    }

    const newBlog = await BlogService.createBlog({
      title: postTitle,
      slug,
      category,
      tags,
      metaTitle,
      metaDescription,
      featuredImageAlt,
      user,
      image: {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      },
      galleryImages: uploadedGallery,
      content,
    });

    res.status(201).json({ blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Error creating blog", error });
  }
};

exports.createAIBlogCtrl = async (req, res) => {
  const { postTitle, featuredImageAlt, galleryMeta } = req.body;
  const user = req.id;

  const featuredImageFile =
    req.files && req.files["featuredImage"]
      ? req.files["featuredImage"][0]
      : null;

  const galleryImageFiles =
    req.files && req.files["galleryImages"] ? req.files["galleryImages"] : [];

  try {
    const blogger = await Blogger.findById(user);

    if (!blogger) {
      return res
        .status(403)
        .json({ message: "Access denied. Staff or admin only." });
    }

    if (!postTitle || !featuredImageFile) {
      return res.status(400).json({
        error: "postTitle and featured image are required!",
      });
    }

    const recentBlogs = await Blog.find().sort({ createdAt: -1 });

    const internalLinks = recentBlogs.map((blog) => {
      const cleanSlug = blog.slug.replace(/\s+/g, "-").toLowerCase();

      return `https://www.mooriagroup.com/blog/${cleanSlug}`;
    });

    const systemPrompt = `
        You are an expert SEO content strategist and editorial writer.
        
        Write a high-quality, original, authoritative article based FIRST AND FOREMOST on the exact title provided: "${postTitle}"
        
        TITLE COVERAGE REQUIREMENT (CRITICAL FOR SEO):
        The article MUST fully and completely address the exact topic stated in the title — not partially, not tangentially. Before writing, identify exactly what the title promises to the reader (the specific question, comparison, benefit, or how-to it implies) and make sure the article delivers on that promise from the introduction to the conclusion. If the title asks "how to X", the reader must walk away actually knowing how to X. If the title is a comparison, both sides must be covered in comparable depth. If the title names a specific ingredient, method, or benefit, that exact subject must be the clear focus of the majority of the content — not a minor mention buried in a broader topic. Do not drift into adjacent topics instead of the one the title actually names.
        
        The title defines the subject, search intent, audience, and content type (how-to, benefits, comparison, what-is, B2B sourcing, etc.) — build the structure dynamically to match that intent. Never force the same structure across articles.
        
        CORE RULE — MOORIA GROUP:
        Mooria Group is the brand behind the site, but do NOT mention Mooria Group, exports, B2B, wholesale, OEM/ODM, ONSSA, certifications, MOQ, CoA, or manufacturing UNLESS the title/search intent genuinely calls for it (e.g. sourcing, private label, manufacturer titles). For consumer/informational titles (health, beauty, skincare, Moroccan traditions, ingredients, how-to), write a purely educational article with no brand promotion. Never disguise an ad as an article.
        
        MOROCCAN CONTEXT:
        Only include authentic Moroccan practices/ingredients/traditions when the title explicitly references them (e.g. "Moroccan Way", "Traditional Moroccan"). Never fabricate cultural, historical, or medical claims. Don't inject Moroccan references when irrelevant.
        
        SEO:
        Extract the primary keyword directly from the title and use it + natural secondary/semantic keywords throughout (intro, H2/H3, body, FAQ, meta) without stuffing. The primary keyword should closely mirror the title's core phrase.
        
        HEALTH/MEDICAL CLAIMS:
        No unsupported medical claims or guaranteed results. Use cautious language ("may help", "is commonly used"). Distinguish tradition from established evidence. Note when a condition warrants professional medical advice.
        
        CONTENT DEPTH:
        Explain what/why/how, causes, practical steps, best practices, common mistakes — the reader must leave genuinely more informed about the EXACT subject named in the title. Every section adds new information directly tied to that subject; no filler, no repetition, no unrelated tangents. Minimum 1200 words, but prioritize completeness over padding.
        
        STRUCTURE (HTML in "content" field, no <h1>):
        <h2> major sections, <h3> subsections, <p> paragraphs, <strong> key concepts, <ul>/<li> lists, <table> only if genuinely useful, <blockquote> only for authoritative quotes/facts. Include a FAQ section near the end with 3–5 real-search-intent questions matching the topic (not generic B2B questions unless the article is B2B).
        
        LINKS:
        - EXTERNAL: You MUST include at least 3 authoritative external links (gov health bodies, FDA, WHO, EU Commission/ECHA, ISO, academic/scientific sources) naturally integrated — relevant to the specific claims made, not generic.
        - INTERNAL: From the list of existing articles provided below, select the 5 most TOPICALLY RELATED to this title (not just the most recent) and naturally integrate their links into the body.
        ${internalLinks}
        
        BRAND FIT:
        The article should fit Mooria Group's topical authority, but relevance comes before promotion — never force a commercial CTA where it doesn't belong. Mention a product/ingredient only if genuinely natural to the topic.
        
        SEO METADATA:
        Generate: SEO-friendly slug (from the corrected title), meta title (<60 chars), meta description (<160 chars), category, and relevant tags — based on the actual topic only. Don't add "moroccan/export/wholesale/oem/b2b" to slug/tags unless truly part of the topic. Correct grammar/spelling in the title if needed, without changing its search intent or topic.
        
        WRITING QUALITY:
        Natural, human, authoritative, specific, easy to scan. Avoid generic filler, keyword stuffing, fake stats/citations, AI-sounding intros, and repeated conclusions across articles. Every article must feel unique to its own title.
        
        OUTPUT FORMAT:
        Return ONLY a valid JSON object — no Markdown, no code fences, no extra text. Escape all HTML inside "content".
        
        {
          "slug": "a-url-friendly-slug",
          "content": "The full HTML formatted content here",
          "metaTitle": "SEO optimized meta title (max 60 chars)",
          "metaDescription": "SEO optimized meta description with clear value proposition (max 160 chars)",
          "category": "Suggested Category Based on the Actual Topic",
          "tags": ["relevant-tag-1", "relevant-tag-2", "relevant-tag-3"]
        }
        
        FINAL RULE: The title is the source of truth. Write the article the reader actually wants to read — not the article the brand wants to sell. Only bring in Mooria Group / B2B / export / manufacturing content when it truly belongs to the topic.
        `;
    // ============================================
    // GEMINI API
    // ============================================

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "GEMINI_API_KEY is not configured",
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: systemPrompt,
              },
            ],
          },

          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `The title of the post is: "${postTitle}"`,
                },
              ],
            },
          ],

          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("Gemini API Error:", JSON.stringify(data, null, 2));

      return res.status(response.status).json({
        message: "Error from Gemini API",
        error: data.error?.message || "Unknown Gemini API error",
      });
    }

    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      console.error(
        "Unexpected Gemini response:",
        JSON.stringify(data, null, 2)
      );

      return res.status(500).json({
        message: "Gemini returned an empty response",
      });
    }
    let aiData;

    try {
      aiData = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Gemini returned invalid JSON:", responseText);

      return res.status(500).json({
        message: "Gemini returned invalid JSON",
        error: parseError.message,
      });
    }
    let parsedGalleryMeta = [];

    if (galleryMeta) {
      try {
        parsedGalleryMeta = JSON.parse(galleryMeta);
      } catch (err) {
        console.error("Error parsing galleryMeta:", err);
      }
    }
    const uploadedImage = await cloudinaryUploadImage(featuredImageFile.path);

    let uploadedGallery = [];

    if (galleryImageFiles.length > 0) {
      const uploadPromises = galleryImageFiles.map((file) =>
        cloudinaryUploadImage(file.path)
      );

      const results = await Promise.all(uploadPromises);

      uploadedGallery = results.map((result, i) => ({
        url: result.secure_url,
        publicId: result.public_id,
        alt: parsedGalleryMeta[i]?.alt || "",
        index: parsedGalleryMeta[i]?.index
          ? Number(parsedGalleryMeta[i].index)
          : null,
      }));
    }
    
    if ((!aiData.tags, !aiData.metaTitle, !aiData.metaDescription)) {
      return res.status(500).json({
        message: "tags and meta are required!",
      });
    }
    const newBlog = await BlogService.createBlog({
      title: postTitle,
      slug: aiData.slug,
      category: aiData.category,
      tags: aiData.tags,
      metaTitle: aiData.metaTitle,
      metaDescription: aiData.metaDescription,
      featuredImageAlt: featuredImageAlt,
      user: user,
      image: {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      },
      galleryImages: uploadedGallery,
      content: aiData.content,
    });

    // ============================================
    // SUCCESS
    // ============================================

    return res.status(201).json({
      message: "AI Blog generated and saved successfully for Mooria Group",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error creating AI blog:", error);

    return res.status(500).json({
      message: "Error creating AI blog",
      error: error.message || error,
    });
  }
};

exports.getallBlogsCtrl = async (req, res) => {
  try {
    // ✅ ADDED (pagination)
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({ accepted: true })
      .sort({ createdAt: -1 })
      .skip(skip) // ✅ ADDED
      .limit(limit) // ✅ ADDED
      .lean();

    if (!blogs || blogs.length === 0) {
      return res.status(200).json([]); // ✅ CHANGED (important for infinite scroll)
    }

    const formattedBlogs = blogs.map((blog) => ({
      _id: blog._id,
      postTitle: blog.title,
      slug: blog.slug,
      category: blog.category,
      publishedAt: blog.publishedAt,
      featuredImageAlt: blog.featuredImageAlt || blog.title,
      image: blog.image,
      createdAt: blog.createdAt,
    }));

    res.status(200).json(formattedBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

exports.updateblogCTRL = async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, metaTitle, metaDescription } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        slug,
        metaTitle,
        metaDescription,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog SEO:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating blog", error });
  }
};

exports.getSingleBlogCtrl = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ message: "Blog slug is required" });
    }

    const blog = await Blog.findOne({ slug, accepted: true })
      .select(
        "title content slug metaTitle category metaDescription featuredImageAlt publishedAt image galleryImages createdAt"
      )
      .lean();

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Format blog object for frontend
    const formattedBlog = {
      _id: blog._id,
      postTitle: blog.title,
      slug: blog.slug,
      category: blog.category,
      metaTitle: blog.metaTitle || blog.title,
      metaDescription: blog.metaDescription || blog.content?.substring(0, 150),
      featuredImageAlt: blog.featuredImageAlt || blog.title,
      image: blog.image,
      publishedAt: blog.publishedAt,
      galleryImages: blog.galleryImages || [],
      content: blog.content || "",
      createdAt: blog.createdAt,
    };

    res.status(200).json(formattedBlog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.getblogsCtrl = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .select(
        "title image accepted publishedAt createdAt metaDescription metaTitle slug"
      )
      .lean();

    if (!blogs || !blogs.length) {
      return res.status(404).json({ message: "No blogs found" });
    }

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error in getblogsCtrl:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getblogsitemapCtrl = async (req, res) => {
  try {
    const blogs = await Blog.find().select("slug").lean();

    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found" });
    }

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getlastBlogsCtrl = async (req, res) => {
  try {
    const blogs = await Blog.find({ accepted: true })
      .select("title image description")
      .sort({ _id: -1 })
      .limit(3)
      .lean();

    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found" });
    }

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching last blogs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getfalseBlogsCtrl = async (req, res) => {
  try {
    const blogs = await Blog.find({ accepted: false }).exec();

    if (blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error retrieving blogs:", error);
    res
      .status(500)
      .json({ message: "Error retrieving blogs", error: error.message });
  }
};

exports.rejectblogCtrl = async (req, res) => {
  try {
    const user = req.id;
    const { id } = req.body;

    if (!id || !user) {
      return res.status(400).json({ message: "ID and user are required." });
    }

    const deletedblog = await Blog.findOneAndDelete({
      _id: id,
    });

    if (!deletedblog) {
      return res
        .status(404)
        .json({ message: "booking not found or not authorized to delete." });
    }

    res
      .status(200)
      .json({ message: "Booking deleted successfully!", deletedblog });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
};

exports.acceptblogCtrl = async (req, res) => {
  try {
    const user = req.id;
    const { id } = req.body;

    if (!id || !user) {
      return res.status(400).json({ message: "ID and user are required." });
    }

    const updatedBooking = await Blog.findOneAndUpdate(
      { _id: id },
      { accepted: true, publishedAt: new Date() },
      { new: true }
    );

    if (!updatedBooking) {
      return res
        .status(404)
        .json({ message: "Booking not found or not authorized to accept." });
    }

    res
      .status(200)
      .json({ message: "Booking accepted successfully!", updatedBooking });
  } catch (error) {
    res.status(500).json({ message: "Error accepting booking", error });
  }
};
