import { Link, useSearchParams } from "@remix-run/react";

interface PageNationLinkProps {
  cursorId: string;
  children: React.ReactNode;
}

export default function PageNationLink({ cursorId, children }: PageNationLinkProps) {
  const [searchParams] = useSearchParams();
  const currentParams = new URLSearchParams(searchParams);

  // Update or add the page parameter
  currentParams.set("cid", cursorId.toString());
  // Create the search string
  const search = `?${currentParams.toString()}`;

  return (
    <Link to={search} className="inline-flex items-center text-sm font-medium">
      {children}
    </Link>
  );
}

export function PageNavigationLinks({
  nextCursor,
  prevCursor,
}: {
  nextCursor: number;
  prevCursor: number;
}) {
  return (
    <div className="flex self-start">
      {prevCursor > 0 && (
        <PageNationLink cursorId={`-${prevCursor}`}>
          <button className="ml-2 bg-blue-500 text-white rounded p-2">&larr;</button>
        </PageNationLink>
      )}
      {nextCursor && (
        <PageNationLink cursorId={`${nextCursor}`}>
          <button className="ml-2 bg-blue-500 text-white rounded p-2">&rarr;</button>
        </PageNationLink>
      )}
    </div>
  );
}
