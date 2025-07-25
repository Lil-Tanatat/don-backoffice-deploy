import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStatus } from "@/hooks/auths/useAuthStatus";

interface RouteGuardProps {
  children: React.ReactNode;
}

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/dashboard",
  "/companies"
];

export const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, token, isLoading } = useAuthStatus();

  useEffect(() => {
    // Don't redirect during initial loading
    if (isLoading) return;

    const checkAuth = () => {
      const currentPath = router.asPath;

      // Check if current route is public
      const isPublicRoute = PUBLIC_ROUTES.some((route) =>
        currentPath.startsWith(route)
      );

      // If not authenticated and trying to access protected route
      if (!isAuthenticated && !token && !isPublicRoute) {
        console.log("No authentication token found, redirecting to login...");
        router.push("/dashboard");
        return;
      }

      // If authenticated and trying to access login/register, redirect to dashboard
      if (
        isAuthenticated &&
        token &&
        (currentPath === "/login" || currentPath === "/register")
      ) {
        console.log("User already authenticated, redirecting to dashboard...");
        router.push("/dashboard");
        return;
      }
    };

    // Only check auth after loading is complete
    checkAuth();
  }, [router.asPath, isAuthenticated, token, router, isLoading]);

  // Show loading during initial auth check
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  // Check if current route is public
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    router.asPath.startsWith(route)
  );

  // Show loading for protected routes while redirecting
  if (!isPublicRoute && !isAuthenticated && !token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
