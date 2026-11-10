import axiosInstance from "../utils/axiosInstance";

export const StaffregisterAPI = async (fullName, phone, email, password) => {
  if (typeof window === "undefined") return;
  try {
    const response = await axiosInstance.post("/api/user/register", {
      fullName,
      phone,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
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

export const userLoginAPI = async (email, password) => {
  try {
    const response = await axiosInstance.post("/api/user/login", {
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getallblogsAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/blog/getallblogs");
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
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

export const getSingleBlogAPI = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/blog/${id}`);
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};
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

    const response = await axiosInstance.post("/api/blog/AddBlog", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error during blog creation:", error);
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
/* ================= CREATE PROPERTY ================= */
export const createPropertyAPI = async (data) => {
  if (typeof window === "undefined") return;

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  const {
    title,
    slug,
    price,
    category,
    prestation,
    city,
    address,
    surface,
    bedrooms,
    bathrooms,
    pool,
    metaTitle,
    metaDescription,
    description,
    mainImage,
    gallery,
  } = data;

  try {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("prestation", prestation); // sale / rent
    formData.append("city", city);
    formData.append("address", address);
    formData.append("surface", surface);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("pool", pool);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("description", description);
    
    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    if (gallery && gallery.length > 0) {
      gallery.forEach((img) => {
        formData.append("gallery", img);
      });
    }

    // Bdel endpoint ila kanet katsta3ml `/api/properties/add` wla 3la 7sab backend dyalk
    const response = await axiosInstance.post(
      "/api/properties/add", 
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
};/* ================= GET ALL PUBLIC PROPERTIES ================= */
export const getAllPropertiesAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/properties/getallproperties");
    return response;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

/* ================= UPDATE PROPERTY ================= */
export const updatePropertyAPI = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/api/properties/update/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};

/* ================= GET PROPERTIES (ADMIN / USER) ================= */
export const getPropertiesAPI = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  try {
    const response = await axiosInstance.get("/api/properties/getproperties", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

/* ================= GET SINGLE PROPERTY ================= */
export const getSinglePropertyAPI = async (slug) => {
  try {
    const response = await axiosInstance.get(`/api/properties/${slug}`);
    return response;
  } catch (error) {
    console.error("Error fetching property:", error);
    throw error;
  }
};

/* ================= REJECT PROPERTY ================= */
export const rejectPropertyAPI = async (id) => {
  if (typeof window === "undefined") return;

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  try {
    const response = await axiosInstance.post(
      "/api/properties/delete",
      { id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error rejecting property:", error);
    throw error;
  }
};

/* ================= ACCEPT PROPERTY ================= */
export const acceptPropertyAPI = async (id) => {
  if (typeof window === "undefined") return;

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  try {
    const response = await axiosInstance.post(
      "/api/properties/acceptproperty",
      { id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error accepting property:", error);
    throw error;
  }
};