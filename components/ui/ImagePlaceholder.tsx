import { MountainIcon } from "lucide-react";

interface ImagePlaceholderProps {
  width: number;
  height: number;
  className?: string;
}

export default function ImagePlaceholder({
  width,
  height,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-zinc-200 text-zinc-500 ${className}`}
      style={{ width, height }}
    >
      <MountainIcon className="w-8 h-8" />
      <span className="mt-2 text-xs font-semibold">No Image</span>
    </div>
  );
}
