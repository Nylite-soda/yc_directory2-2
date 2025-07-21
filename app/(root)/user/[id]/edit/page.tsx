import { auth } from "@/auth";
import UserEditForm from "@/components/UserEditForm";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  if (session?.id !== id) {
    return (
      <section className="section_container">
        <h1 className="heading">Unauthorized</h1>
        <p className="sub-heading">
          You are not authorized to edit this profile.
        </p>
      </section>
    );
  }

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) return notFound();

  return (
    <section className="section_container">
      <h1 className="heading">Edit Profile</h1>
      <div className="mt-10">
        <UserEditForm user={user} />
      </div>
    </section>
  );
};

export default Page;
