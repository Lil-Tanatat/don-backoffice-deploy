// pages/api/proxy/[...path].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getSessionToken, refreshIfNeeded, setAuthCookies } from "@/lib/auth-utils";
import axios from "axios";
// import loginHandler from "./login";
// import resetPasswordHandler from "./reset-password";
// import registerHandler from "./register";
import formidable from "formidable";
import FormData from "form-data";
import fs from "fs";

// Configure axios with timeout and keep-alive
const apiClient = axios.create({
  timeout: 30000, // 30 second timeout
  maxRedirects: 5,
  headers: {
    Connection: "keep-alive",
    "Keep-Alive": "timeout=5, max=1000",
  },
});

// Disable body parsing to handle both file uploads and JSON manually
export const config = {
  api: {
    bodyParser: false,
  },
};

// Headers to exclude when forwarding to Python API
const EXCLUDED_HEADERS = new Set([
  "host",
  "connection",
  "cache-control",
  "upgrade-insecure-requests",
  "user-agent",
  "accept",
  "accept-encoding",
  "accept-language",
  "cookie",
  "referer",
  "sec-fetch-dest",
  "sec-fetch-mode",
  "sec-fetch-site",
  "sec-ch-ua",
  "sec-ch-ua-mobile",
  "sec-ch-ua-platform",
]);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const startTime = Date.now();

  const path = req.query.path
    ? Array.isArray(req.query.path)
      ? req.query.path.join("/")
      : req.query.path
    : "";

  // Handle login request specifically
  // if (path === "auth/login" && req.method === "POST") {
  //   return loginHandler(req, res);
  // } else if (path === "auth/reset-password" && req.method === "POST") {
  //   return resetPasswordHandler(req, res);
  // } else if (path === "auth/register" && req.method === "POST") {
  //   return registerHandler(req, res);
  // }
  try {
    // Get and refresh session token if needed
    const session = getSessionToken(req);
    const { access_token, refresh_token } = await refreshIfNeeded(session);

    // Set new cookies if tokens were refreshed
    if (refresh_token && access_token) {
      setAuthCookies(res, access_token, refresh_token);
    }

    const targetUrl = `${process.env.PYTHON_API_URL}/api/${path}${
      req.url?.split("?")[1] ? `?${req.url.split("?")[1]}` : ""
    }`;

    // Filter headers to only include necessary ones
    const filteredHeaders: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (
        !EXCLUDED_HEADERS.has(key.toLowerCase()) &&
        typeof value === "string"
      ) {
        filteredHeaders[key] = value;
      }
    }

    // Check if this is a multipart/form-data request (file upload)
    if (req.headers["content-type"]?.includes("multipart/form-data")) {
      // For file uploads, use formidable to parse multipart data
      const form = formidable({
        maxFileSize: 50 * 1024 * 1024, // 50MB limit
      });

      const [fields, files] = await form.parse(req);

      // Create new FormData for forwarding to Python API
      const formData = new FormData();

      // Add fields
      for (const [key, value] of Object.entries(fields)) {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(key, v));
        } else {
          formData.append(key, value);
        }
      }

      // Add files
      for (const [key, fileArray] of Object.entries(files)) {
        if (Array.isArray(fileArray)) {
          fileArray.forEach((file) => {
            formData.append(key, fs.createReadStream(file.filepath), {
              filename: file.originalFilename || "file",
              contentType: file.mimetype || "application/octet-stream",
            });
          });
        }
      }

      // Forward the request to Python API with FormData
      const response = await apiClient({
        method: req.method,
        url: targetUrl,
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${access_token}`,
        },
        data: formData,
      });

      // Clean up temporary files
      for (const fileArray of Object.values(files)) {
        if (Array.isArray(fileArray)) {
          fileArray.forEach((file) => {
            fs.unlink(file.filepath, () => {});
          });
        }
      }

      // Return the response to the frontend
      res.status(response.status).json(response.data);
    } else {
      // Handle regular JSON requests - parse body manually since bodyParser is disabled
      let body = null;

      if (req.method !== "GET" && req.method !== "HEAD") {
        // Read raw body for POST/PUT/PATCH requests
        const chunks: Buffer[] = [];
        for await (const chunk of req) {
          chunks.push(chunk);
        }
        const rawBody = Buffer.concat(chunks).toString();

        if (rawBody) {
          try {
            body = JSON.parse(rawBody);
          } catch {
            // If JSON parsing fails, send as string
            body = rawBody;
          }
        }
      }

      const response = await apiClient({
        method: req.method,
        url: targetUrl,
        headers: {
          ...filteredHeaders,
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        data: body,
      });

      // Return the response to the frontend
      res.status(response.status).json(response.data);
    }

    // Log performance for debugging
    const duration = Date.now() - startTime;
    if (duration > 1000) {
      console.warn(`Slow request to ${path}: ${duration}ms`);
    }
  } catch (error) {
    // const duration = Date.now() - startTime;

    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        res.status(504).json({ message: "Request timeout" });
      } else {
        res
          .status(error.response?.status || 500)
          .json(error.response?.data || { message: "Internal Server Error" });
      }
    } else if (error instanceof Error && error.message === "UNAUTHORIZED") {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
