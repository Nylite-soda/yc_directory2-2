import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const startup = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!startup) return notFound();

  if (session?.id !== startup.author._id) {
    return (
      <section className="section_container">
        <h1 className="heading">Unauthorized</h1>
        <p className="sub-heading">
          You are not authorized to edit this startup.
        </p>
      </section>
    );
  }

  return (
    <section className="section_container">
      <h1 className="heading">Edit Startup</h1>
      <div className="mt-10">
        <StartupForm type="edit" startup={startup} />
      </div>
    </section>
  );
};

export default Page;
