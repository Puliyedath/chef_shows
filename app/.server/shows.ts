import { chefShowsDBClient } from "prisma/client";

export async function getShows({
  q,
  forwardCursorId,
  previousCursorId,
  limit,
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
    take: previousCursorId ? -limit : limit,
    ...(cursorId ? { skip: 1 } : {}),
    ...(q ? { where: { title: { contains: q, mode: "insensitive" } } } : {}),
    ...(age ? { where: { age: { gte: parseInt(age) } } } : {}),
    orderBy: {
      createdAt: "desc",
    },
    ...(cursorId ? { cursor: { id: Math.abs(parseInt(cursorId)) } } : {}),
  });

  return {
    shows,
    nextCursor: shows.length > 0 ? shows[shows.length - 1].id : undefined,
    prevCursor: shows.length > 0 ? shows?.[0]?.id : undefined,
  };
}
