import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY, STARTUPS_SEARCH_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import EmptyState from "@/components/ui/EmptyState";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  try {
    const query = (await searchParams).query;

    const params = query ? { search: `*${query}*` } : {};
    const activeQuery = query ? STARTUPS_SEARCH_QUERY : STARTUPS_QUERY;

    const { data: posts } = await sanityFetch({
      query: activeQuery,
      params,
    });

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

          <ul className="mt-7 card_grid">
            {posts?.length ? (
              posts.map((post: StartupTypeCard) => (
                <StartupCard key={post._id} post={post as StartupTypeCard} />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState message="No Startups Found" />
              </div>
            )}
          </ul>
        </section>

        <SanityLive />
      </>
    );
  } catch (error) {
    console.error("Failed to fetch startups:", error);
    return (
      <section className="section_container">
        <h1 className="heading">Something Went Wrong</h1>
        <p className="sub-heading">
          We couldn't load the startups. Please try again later.
        </p>
      </section>
    );
  }
}
