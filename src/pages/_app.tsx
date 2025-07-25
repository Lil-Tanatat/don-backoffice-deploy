import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/components/AuthProvider";
import { RouteGuard } from "@/components/RouteGuard";
import { Layout } from "@/components/layout/layout";
import { useRouter } from "next/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Pages that should NOT use the sidebar layout
const pagesWithoutLayout = ["/login"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const shouldUseLayout = !pagesWithoutLayout.includes(router.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider>
        <RouteGuard> */}
          {shouldUseLayout ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
          <ReactQueryDevtools initialIsOpen={false} />
        {/* </RouteGuard>
      </AuthProvider> */}
    </QueryClientProvider>
  );
}
