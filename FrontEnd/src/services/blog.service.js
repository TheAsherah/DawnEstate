import axiosInstance from "../utils/axiosInstance";

export const createBlogAPI = async (data) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  const {
    postTitle,
    slug,
    category,
    tags,
    metaTitle,
    metaDescription,
    featuredImageAlt,
    content,
    featuredImage,
    galleryItems,
  } = data;

  try {
    const formData = new FormData();
    formData.append("postTitle", postTitle);
    formData.append("slug", slug);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("featuredImageAlt", featuredImageAlt);
    formData.append("content", content);
    formData.append("featuredImage", featuredImage);

    if (galleryItems && galleryItems.length > 0) {
      const galleryMeta = [];

      galleryItems.forEach((item) => {
        formData.append("galleryImages", item.file);

        galleryMeta.push({
          alt: item.alt,
          index: item.index ? parseInt(item.index, 10) : null,
        });
      });
      formData.append("galleryMeta", JSON.stringify(galleryMeta));
    }

    const response = await axiosInstance.post("/api/blog/AddBlog", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error during blog creation:", error);
    throw error;
  }
};

export const getblogsAPI = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.get("/api/blog/getblogs", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const acceptblogAPI = async (id) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.post(
      "/api/blog/accepctblog",
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const updateBlogAPI = async (id, data) => {
  if (typeof window === "undefined") return; // L'7imaya dyal Next.js SSR
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  try {
    const response = await axiosInstance.put(
      `/api/blog/updateblog/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during blog update:", error); // Bdlt l'message dyal l'erreur
    throw error;
  }
};

export const getlastBlogsAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/blog/getlastBlogs");
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const getSingleBlogAPI = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/blog/${id}`);
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const getallblogsAPI = async (page = 1) => {
  try {
    const response = await axiosInstance.get(
      `/api/blog/getallblogs?page=${page}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const rejectblogAPI = async (id) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.post(
      "/api/blog/delete",
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const createAIBlogAPI = async (data) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  const {
    postTitle,
    featuredImageAlt,
    featuredImage,
    galleryItems,
  } = data;

  try {
    const formData = new FormData();
    formData.append("postTitle", postTitle);
    
    if (featuredImageAlt) {
      formData.append("featuredImageAlt", featuredImageAlt);
    }
    
    // T2ked bli dima kayna image 7it drnaha required f l-front
    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
    }

    if (galleryItems && galleryItems.length > 0) {
      const galleryMeta = [];

      galleryItems.forEach((item) => {
        formData.append("galleryImages", item.file);

        galleryMeta.push({
          alt: item.alt || "",
          index: item.index ? parseInt(item.index, 10) : null,
        });
      });
      formData.append("galleryMeta", JSON.stringify(galleryMeta));
    }

    // ⚠️ Endpoint jdid dyal AI li qadina f l-Backend
    const response = await axiosInstance.post("/api/blog/createaiblog", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error during AI blog creation:", error);
    throw error;
  }
};

export const createAIProductAPI = async (data) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  // Hna bedelna l-variables bash imchiw m3a l-form dyal l-product
  const {
    productName,
    price,
    discountPrice,
    mainImage,
    galleryItems,
  } = data;

  try {
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    
    // Nsifto discountPrice ghir ila kan m3mer
    if (discountPrice) {
      formData.append("discountPrice", discountPrice);
    }
    
    // T2ked bli dima kayna image 7it drnaha required f l-front
    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    if (galleryItems && galleryItems.length > 0) {
      const galleryMeta = [];

      galleryItems.forEach((item) => {
        formData.append("galleryImages", item.file);

        galleryMeta.push({
          alt: item.alt || "",
          index: item.index ? parseInt(item.index, 10) : null,
        });
      });
      formData.append("galleryMeta", JSON.stringify(galleryMeta));
    }

    // ⚠️ Endpoint jdid dyal AI Product (T2ked bli howa hada li 3ndk f l-backend)
    const response = await axiosInstance.post("/api/product/createaiproduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error during AI product creation:", error);
    throw error;
  }
};