import LoadingLink from "@/components/LoadingLink";
import { StartupCardSkeleton } from "@/components/StartupCard";
import EmptyState from "@/components/ui/EmptyState";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import UserStartups from "@/components/UserStartups";
import { sanityFetch } from "@/lib/sanityFetch";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import EditUserButton from "@/components/EditUserButton";

export const revalidate = 86400;
export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  try {
    const user = await sanityFetch<any>(AUTHOR_BY_ID_QUERY, { id });

    if (!user) return notFound();

    return (
      <>
        <section className="profile_container">
          <div className="profile_card bg-white rounded-xl p-8 shadow-sm">
            <div className="profile_title">
              <h3 className="text-24-bold uppercase text-center tracking-wider">
                {user.name}
              </h3>
            </div>
            <div className="mt-6 flex justify-center">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "user avatar"}
                  width={180}
                  height={180}
                  className="rounded-full border-4 border-white shadow-md"
                />
              ) : (
                <ImagePlaceholder
                  width={180}
                  height={180}
                  className="rounded-full border-4 border-white shadow-md"
                />
              )}
            </div>

            <p className="text-20-semibold text-blue-500 mt-6 text-center">
              @{user?.username}
            </p>
            <div className="mt-4 w-full bg-gray-50 p-4 rounded-lg">
              {user.bio ? (
                <p className="text-16-regular text-gray-700 text-left">
                  {user.bio}
                </p>
              ) : (
                <EmptyState
                  message="No bio provided."
                  className="text-sm py-4"
                />
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
            <div className="flex-between">
              <p className="text-30-bold !text-blue-500">
                {user.name}'s Startups
              </p>
              <EditUserButton userId={id} />
            </div>
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
