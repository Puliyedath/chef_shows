import { chefShowsDBClient } from "prisma/client";
const LIMIT = 40;

export async function getShows({
  q,
  forwardCursorId,
  previousCursorId,
  age,
}: {
  q?: string;
  forwardCursorId?: string;
  previousCursorId?: string;
  limit: number;
  age?: string;
}) {
  const cursorId = forwardCursorId || previousCursorId || undefined;
  const shows = await chefShowsDBClient.shows.findMany({
    take: previousCursorId ? -(LIMIT + 1) : LIMIT + 1,
    skip: cursorId ? 1 : 0,
    ...(q ? { where: { title: { contains: q, mode: "insensitive" } } } : {}),
    ...(age ? { where: { age: { gte: parseInt(age) } } } : {}),
    orderBy: {
      id: "asc",
    },
    ...(cursorId ? { cursor: { id: Math.abs(parseInt(cursorId)) } } : {}),
  });

  return {
    shows: shows.slice(0, LIMIT),
    nextCursor: shows.length > LIMIT ? shows[shows.length - 2]?.id : undefined,
    prevCursor: shows.length > LIMIT ? shows?.[0]?.id : undefined,
  };
}
