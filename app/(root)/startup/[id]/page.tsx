import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingLink from "@/components/LoadingLink";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import EmptyState from "@/components/ui/EmptyState";
import { sanityFetch } from "@/lib/sanityFetch";
import { formatDate } from "@/lib/utils";
import EditStartupButton from "@/components/EditStartupButton";

export const revalidate = 86400;
export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  try {
    const [post, playlist] = await Promise.all([
      sanityFetch<any>(STARTUP_BY_ID_QUERY, { id }),
      sanityFetch<any>(PLAYLIST_BY_SLUG_QUERY, {
        slug: "editor-picks",
      }),
    ]);

    const editorPicks = playlist?.select || [];
    if (!post) return notFound();

    return (
      <>
        <section className="pink_container !min-h-[230px]">
          <p className="tag">{formatDate(post?._createdAt)}</p>
          <h1 className="heading">{post.title}</h1>
          <p className="sub-heading !max-w-5xl">{post?.description}</p>
        </section>

        <section className="section_container flex flex-col justify-center items-center">
          {post.image ? (
            <Image
              src={post.image}
              alt="thumbnail"
              width={900}
              height={500}
              className="w-auto !max-h-[500px] rounded-xl"
            />
          ) : (
            <ImagePlaceholder
              width={900}
              height={500}
              className="w-full !max-h-[500px] rounded-xl"
            />
          )}

          <div className="space-y-5 mt-10 max-w-4xl mx-auto">
            <div className="flex-between gap-5">
              <LoadingLink href={`/user/${post.author?._id}`}>
                <div className="flex gap-2 items-center mb-3">
                  {post.author?.image ? (
                    <Image
                      src={post.author.image}
                      alt="avatar"
                      width={64}
                      height={64}
                      className="rounded-full drop-shadow-lg"
                    />
                  ) : (
                    <ImagePlaceholder
                      width={64}
                      height={64}
                      className="rounded-full drop-shadow-lg"
                    />
                  )}
                  <div>
                    <p className="text-20-medium">{post.author?.name}</p>
                    <p className="text-16-medium !text-black-300">
                      @{post.author?.username}
                    </p>
                  </div>
                </div>
              </LoadingLink>
              <p className="category-tag">{post.category}</p>
            </div>
            <div className="flex-between">
              <h3 className="text-30-bold">Pitch Details</h3>
              <EditStartupButton authorId={post.author?._id} startupId={id} />
            </div>
            {post.pitch ? (
              <div className="prose prose-lg mx-auto max-w-3xl p6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post?.pitch}
                </ReactMarkdown>
              </div>
            ) : (
              <EmptyState message="No Pitch Details Provided" />
            )}
          </div>

          <hr className="divider" />

          {editorPicks?.length > 0 && (
            <div className="max-w-4xl mx-auto w-full">
              <p className="text-30-semibold">Editor Picks</p>
              <ul className="mt-7 card_grid-sm">
                {editorPicks.map((post: StartupTypeCard) => (
                  <StartupCard
                    key={post._id}
                    post={post as unknown as StartupTypeCard}
                  />
                ))}
              </ul>
            </div>
          )}

          <Suspense fallback={<Skeleton className="view_skeleton" />}>
            <View id={id} />
          </Suspense>
        </section>
      </>
    );
  } catch (error) {
    console.error("Failed to fetch startup data:", error);
    return (
      <section className="section_container">
        <h1 className="heading">Something Went Wrong</h1>
        <p className="sub-heading">
          We couldn't load the startup details. Please try again later.
        </p>
      </section>
    );
  }
};

export default page;
