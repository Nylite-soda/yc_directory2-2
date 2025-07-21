import { auth } from "@/auth";
import { StartupCardSkeleton } from "@/components/StartupCard";
import EmptyState from "@/components/ui/EmptyState";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import UserStartups from "@/components/UserStartups";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  try {
    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

    if (!user) return notFound();

    return (
      <>
        <section className="profile_container">
          import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
          import EmptyState from "@/components/ui/EmptyState"; // ... other
          imports // ... inside page component
          <div className="profile_card">
            <div className="profile_title">
              <h3 className="text-24-black uppercase text-center line-clamp-1">
                {user.name}
              </h3>
            </div>
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "user avatar"}
                width={220}
                height={220}
                className="profile_image"
              />
            ) : (
              <ImagePlaceholder
                width={220}
                height={220}
                className="profile_image"
              />
            )}

            <p className="text-20-medium !text-blue-500 mt-7 text-center line-clamp-1">
              @{user?.username}
            </p>
            <div className="mt-2 w-full">
              {user.bio ? (
                <p className="text-14-normal text-center">{user.bio}</p>
              ) : (
                <EmptyState
                  message="No bio provided."
                  className="text-sm py-4"
                />
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
            <p className="text-30-bold !text-blue-500">
              {session.id == id ? "Your" : "All"} Startups
            </p>
            <ul className="card_grid-sm">
              <Suspense
                fallback={
                  <>
                    <StartupCardSkeleton />
                    <StartupCardSkeleton />
                    <StartupCardSkeleton />
                    <StartupCardSkeleton />
                  </>
                }
              >
                <UserStartups id={id} />
              </Suspense>
            </ul>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return (
      <section className="section_container">
        <h1 className="heading">Something Went Wrong</h1>
        <p className="sub-heading">
          We couldn't load the user profile. Please try again later.
        </p>
      </section>
    );
  }
};

export default page;
