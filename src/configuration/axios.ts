import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get token from localStorage (for axios interceptor)
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Function to clear token and redirect (for axios interceptor)
const handleUnauthorized = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    // Clear the auth store by triggering a storage event
    window.dispatchEvent(new Event("storage"));

    // Only redirect if not already on login page
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.log("401 Unauthorized - clearing auth and redirecting to login");
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default api;
