"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import LoadingLink from "@/components/LoadingLink";

export default function EditStartupButton({ authorId, startupId }: { authorId: string, startupId: string }) {
  const { data: session } = useSession();

  if (session?.id !== authorId) return null;

  return (
    <Button asChild>
      <LoadingLink href={`/startup/${startupId}/edit`}>
        <PencilIcon className="size-4 mr-2" />
        Edit Pitch
      </LoadingLink>
    </Button>
  );
}
