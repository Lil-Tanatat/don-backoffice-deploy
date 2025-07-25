// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";
import { setAuthCookies } from "@/lib/auth-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Parse body manually since bodyParser might be disabled in [...path].ts
    let body;

    if (typeof req.body === "string") {
      try {
        body = JSON.parse(req.body);
      } catch (parseError) {
        console.log("Failed to parse JSON:", parseError);
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid JSON format",
          error: "Request body must be valid JSON",
        });
      }
    } else if (req.body && typeof req.body === "object") {
      console.log("Using body as object");
      body = req.body;
    } else {
      // If body is not parsed, read it from the request stream
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const rawBody = Buffer.concat(chunks).toString();

      if (!rawBody.trim()) {
        return res.status(400).json({
          statusCode: 400,
          message: "Request body is required",
          error: "Empty request body",
        });
      }

      try {
        body = JSON.parse(rawBody);
      } catch (parseError) {
        console.log("Failed to parse JSON from stream:", parseError);
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid JSON format",
          error: "Request body must be valid JSON",
        });
      }
    }

    // Validate required fields
    if (!body || typeof body !== "object") {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid request body",
        error: "Request body must be a valid object",
      });
    }

    // Check if Python API URL is configured
    if (!process.env.PYTHON_API_URL) {
      console.log("PYTHON_API_URL environment variable is not set");
      return res.status(500).json({
        statusCode: 500,
        message: "Server configuration error",
        error: "Python API URL not configured",
      });
    }

    console.log("Environment check:", {
      NODE_ENV: process.env.NODE_ENV,
      PYTHON_API_URL: process.env.PYTHON_API_URL,
      SUPABASE_API_URL: process.env.SUPABASE_API_URL,
    });

    console.log(
      "Making request to:",
      `${process.env.PYTHON_API_URL}/api/auth/login`
    );
    console.log("Request body:", JSON.stringify(body, null, 2));

    // Test connection to Python API first
    try {
      const healthCheck = await axios.get(
        `${process.env.PYTHON_API_URL}/health`,
        {
          timeout: 5000,
        }
      );
      console.log("Python API health check successful:", healthCheck.status);
    } catch (healthError: unknown) {
      const error = healthError as Error;
      console.warn(
        "Python API health check failed, but continuing with login attempt:",
        error.message
      );
    }

    const pythonResp = await axios.post(
      `${process.env.PYTHON_API_URL}/api/auth/login`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
      }
    );

    console.log("Python API response received:", {
      status: pythonResp.status,
      hasData: !!pythonResp.data,
      hasAccessToken: !!pythonResp.data?.data?.access_token,
    });

    const { access_token, refresh_token, user } = pythonResp.data.data;

    // Set HTTP-only cookies using utility function
    try {
      setAuthCookies(res, access_token, refresh_token);
      console.log("Cookies set successfully");
    } catch (cookieError) {
      console.log("Failed to set cookies:", cookieError);
      // Continue without cookies if there's an error
    }

    // Return both user data and access token for frontend localStorage
    return res.status(200).json({
      statusCode: 200,
      message: "Login successful",
      accessToken: access_token, // Add this so frontend can save to localStorage
      user,
    });
  } catch (err: unknown) {
    console.log("Login API error:", err);
    const axiosError = err as AxiosError<{ message: string }>;

    if (axiosError.response) {
      console.log("Python API response error:", {
        status: axiosError.response.status,
        statusText: axiosError.response.statusText,
        data: axiosError.response.data,
        url: axiosError.config?.url,
        method: axiosError.config?.method
      });
    } else if (axiosError.request) {
      console.log("Python API request error (no response):", {
        url: axiosError.config?.url,
        method: axiosError.config?.method,
        message: axiosError.message
      });
    } else {
      console.log("Python API setup error:", axiosError.message);
    }

    return res.status(401).json({
      statusCode: 401,
      message: "Login failed",
      error: axiosError?.response?.data || axiosError.message,
    });
  }
}
