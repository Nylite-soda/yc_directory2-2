"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { createContext, useContext } from "react";

// Create a Context to share loading state
const LoadingContext = createContext({
  isLoading: false,
  setLoading: (_: boolean) => {},
});

// Loading Provider to wrap the app
export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Hide loading screen whenever the path or search params change
    setLoading(false);
  }, [pathname, searchParams]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {isLoading && <LoadingScreen />}
      {children}
    </LoadingContext.Provider>
  );
}

// Custom hook to use loading state
export function useLoading() {
  return useContext(LoadingContext);
}

// Loading Screen Component
function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center space-y-4">
        <LoaderCircle className="animate-spin text-blue-500 w-10 h-10" />
        <p className="text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}
