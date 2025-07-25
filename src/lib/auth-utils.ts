import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface SessionTokens {
  access_token: string | undefined;
  refresh_token: string | undefined;
}

interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  path?: string;
  sameSite?: boolean | "lax" | "strict" | "none";
  maxAge?: number;
}

// Simple in-memory token cache to avoid repeated validation
const tokenValidationCache = new Map<
  string,
  { isValid: boolean; expiry: number }
>();

// Cookie utility functions
export function serializeCookie(name: string, value: string, options: CookieOptions = {}): string {
  const opts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax" as const,
    ...options
  };

  let cookieString = `${name}=${encodeURIComponent(value)}`;

  if (opts.httpOnly) cookieString += "; HttpOnly";
  if (opts.secure) cookieString += "; Secure";
  if (opts.path) cookieString += `; Path=${opts.path}`;
  if (opts.sameSite) cookieString += `; SameSite=${opts.sameSite}`;
  if (opts.maxAge) cookieString += `; Max-Age=${opts.maxAge}`;

  return cookieString;
}

export function setAuthCookies(res: NextApiResponse, access_token: string, refresh_token: string) {
  res.setHeader("Set-Cookie", [
    serializeCookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour
    }),
    serializeCookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    }),
  ]);
}

export function getSessionToken(req: NextApiRequest): SessionTokens {
  const cookies = req.cookies;

  const access_token = cookies["access_token"] || undefined;
  const refresh_token = cookies["refresh_token"] || undefined;

  return {
    access_token,
    refresh_token,
  };
}

function isExpired(token: string): boolean {
  if (!token) return true;

  // Check cache first
  const cached = tokenValidationCache.get(token);
  if (cached && Date.now() < cached.expiry) {
    return !cached.isValid;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    const now = Math.floor(Date.now() / 1000);
    const isValid = payload.exp >= now;

    // Cache the result for 30 seconds
    tokenValidationCache.set(token, {
      isValid,
      expiry: Date.now() + 30000,
    });

    return !isValid;
  } catch {
    // Invalid token format
    return true;
  }
}

export async function refreshIfNeeded(session: {
  access_token: string | undefined;
  refresh_token: string | undefined;
}) {
  let { access_token } = session;
  const { refresh_token } = session;

  if (!access_token && !refresh_token) {
    throw new Error("UNAUTHORIZED");
  }

  if (!access_token || isExpired(access_token)) {
    if (!refresh_token) {
      throw new Error("UNAUTHORIZED");
    }

    const url = `${process.env.SUPABASE_API_URL}/auth/v1/token?grant_type=refresh_token`;
    try {
      const { data } = await axios.post(
        url,
        {
          refresh_token,
        },
        {
          headers: {
            apikey: process.env.SUPABASE_ANON_KEY,
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 second timeout for auth requests
        }
      );

      access_token = data.access_token;

      return {
        access_token,
        refresh_token: data.refresh_token,
      };
    } catch {
      throw new Error("UNAUTHORIZED");
    }
  }

  return {
    access_token,
    refresh_token,
  };
}

// Clean up expired cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [token, cached] of tokenValidationCache.entries()) {
    if (now >= cached.expiry) {
      tokenValidationCache.delete(token);
    }
  }
}, 60000); // Clean up every minute
