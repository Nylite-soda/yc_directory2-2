"use client";

import Link, { LinkProps } from "next/link";
import { useLoading } from "@/components/LoadingScreen";

export default function LoadingLink({
  children,
  ...props
}: LinkProps & { children: React.ReactNode }) {
  const { setLoading } = useLoading();

  return (
    <Link
      {...props}
      onClick={() => setLoading(true)} // Show loading screen on click
      className="transition-colors hover:text-blue-500"
    >
      {children}
    </Link>
  );
}
