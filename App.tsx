import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LiquidGlassBackdrop } from "@/components/LiquidGlassBackdrop";
import Index from "./pages/Index.tsx";

const Product = lazy(() => import("./pages/Product.tsx"));
const Terms = lazy(() => import("./pages/Terms.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const ChatwootWidget = lazy(() => import("@/components/ChatwootWidget"));
const CookieNotice = lazy(() =>
  import("@/components/CookieNotice").then((m) => ({ default: m.CookieNotice })),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const RouteFallback = () => (
  <div className="min-h-svh w-full bg-background" aria-hidden />
);

const HashScrollHandler = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const targetId = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    const maxAttempts = 24;
    let retryTimer: number | null = null;

    const tryScroll = () => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (attempts < maxAttempts) {
        attempts += 1;
        retryTimer = window.setTimeout(tryScroll, 50);
      }
    };

    tryScroll();

    return () => {
      if (retryTimer !== null) {
        window.clearTimeout(retryTimer);
      }
    };
  }, [hash, pathname]);

  return null;
};

const RoutedOverlays = () => {
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);
  const hideFloatingOverlays = pathname === "/privacy" || pathname === "/terms";

  useEffect(() => {
    if (hideFloatingOverlays) return;

    let cancelled = false;

    const markReady = () => {
      if (!cancelled) setReady(true);
    };

    const onFirstInteraction = () => {
      markReady();
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };

    window.addEventListener("pointerdown", onFirstInteraction, { once: true });
    window.addEventListener("touchstart", onFirstInteraction, { once: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });

    if ("requestIdleCallback" in window) {
      requestIdleCallback(markReady, { timeout: 5000 });
    } else {
      window.setTimeout(markReady, 2500);
    }

    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, [hideFloatingOverlays]);

  if (hideFloatingOverlays) return null;
  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <ChatwootWidget />
      <CookieNotice />
    </Suspense>
  );
};

const App = () => (
  <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem={false}
    forcedTheme="dark"
    storageKey="vite-ui-theme"
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LiquidGlassBackdrop />
        <div className="relative z-[1] min-h-screen min-w-0 bg-background text-foreground">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <HashScrollHandler />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/product" element={<Product />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <RoutedOverlays />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
