import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY, STARTUPS_SEARCH_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/lib/sanityFetch";
import EmptyState from "@/components/ui/EmptyState";

export default async function StartupList({ query }: { query?: string }) {
  const params = query ? { search: `*${query}*` } : {};
  const activeQuery = query ? STARTUPS_SEARCH_QUERY : STARTUPS_QUERY;

  const posts = await sanityFetch<StartupTypeCard[]>(activeQuery, params);

  return (
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
  );
}
