"use client";

import { LoaderCircle } from "lucide-react";

// Loading Screen Component
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center space-y-4">
        <LoaderCircle className="animate-spin text-blue-500 w-10 h-10" />
        <p className="text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}
