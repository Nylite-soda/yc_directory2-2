"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import LoadingLink from "@/components/LoadingLink";

export default function EditUserButton({ userId }: { userId: string }) {
  const { data: session } = useSession();

  if (session?.id !== userId) return null;

  return (
    <Button asChild>
      <LoadingLink href={`/user/${userId}/edit`}>
        <PencilIcon className="size-4 mr-2" />
        Edit Profile
      </LoadingLink>
    </Button>
  );
}
