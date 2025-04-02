import { chefShowsDBClient } from "prisma/client";

export async function getShows({
  q,
  cursorId,
  limit,
  age,
}: {
  q?: string;
  cursorId?: string;
  limit: number;
  age?: string;
}) {
  const shows = await chefShowsDBClient.shows.findMany({
    take: limit,
    // This conditionally adds a filter to the query to search for shows where the title contains the search query (q), ignoring case sensitivity.
    ...(q ? { where: { title: { contains: q, mode: "insensitive" } } } : {}),
    ...(age ? { where: { age: { gte: parseInt(age) } } } : {}),
    orderBy: {
      createdAt: "desc",
    },
    ...(cursorId ? { cursor: { id: parseInt(cursorId) } } : {}),
  });
  return shows;
}
