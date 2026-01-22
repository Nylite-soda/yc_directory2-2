import { client } from "@/sanity/lib/client";

export async function sanityFetch<T>(
  query: string,
  params: Record<string, any> = {},
  revalidate: number = 86400 // 24 hours default
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate },
  });
}
