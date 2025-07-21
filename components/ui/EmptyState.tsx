import { InboxIcon } from "lucide-react";

interface EmptyStateProps {
  message: string;
  className?: string;
}

export default function EmptyState({ message, className }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 bg-zinc-50 rounded-lg border-2 border-dashed border-zinc-200 text-zinc-500 ${className}`}
    >
      <InboxIcon className="w-12 h-12 mb-4" />
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
}
