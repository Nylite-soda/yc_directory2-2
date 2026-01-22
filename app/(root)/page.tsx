import SearchForm from "../../components/SearchForm";
import { sanityFetch } from "@/lib/sanityFetch";
import EmptyState from "@/components/ui/EmptyState";
import StartupList from "@/components/StartupList";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const revalidate = 3600;
export const experimental_ppr = true;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches and Get Noticed in Virtual
          Competitions
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <Suspense fallback={<ul className="mt-7 card_grid">{[...Array(6)].map((_, i) => <Skeleton key={i} className="startup-card_skeleton h-[400px] w-full" />)}</ul>}>
          <StartupList query={query} />
        </Suspense>
      </section>
    </>
  );
}
