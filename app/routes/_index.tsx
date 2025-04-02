import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import Show from "~/components/Show";
import { Shows } from "@prisma/client";
import { getShows } from "~/.server/shows";
import { PageNavigationLinks } from "~/components/PageNationLink";
import EmptyResults from "~/components/EmptyResults";
import SearchInputWithToggle from "~/components/SearchToggle";

export default function Index() {
  const { shows, nextCursor, prevCursor } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  if (shows.length === 0) {
    return <EmptyResults />;
  }
  return (
    <div className="min-h-screen p-8">
      {actionData?.errors?.message && (
        <div className="text-red-500">{actionData.errors.message}</div>
      )}
      <div className="flex items-center justify-between">
        <Form method="post" className="mb-6 flex items-center flex-1">
          <SearchInputWithToggle />
          <button type="submit" className="ml-2 bg-blue-500 text-white rounded p-2 self-start">
            Search
          </button>
          <PageNavigationLinks nextCursor={nextCursor} prevCursor={prevCursor} />
        </Form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {shows.map((show: Shows) => (
          <Show key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const q = formData.get("q") as string | undefined;
  const cid = formData.get("cid") as string | undefined;
  const redirectUrl = new URL("/", request.url);
  if (q) redirectUrl.searchParams.set("q", q);
  if (cid) redirectUrl.searchParams.set("cid", cid);
  const age = q?.match(/age:\s*(\d+)/i) ?? undefined;
  if (q?.includes("age:") && !age) {
    return Response.json({
      errors: { message: "Age should be a number" },
    });
  }
  return redirect(redirectUrl.toString());
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || undefined;
  const title = q?.match(/title:\s*([^\s]+)/i) ?? undefined;
  const age = q?.match(/age:\s*(\d+)/i) ?? undefined;
  const cursorId = url.searchParams.get("cid") || undefined;
  // cid is positive for forward and negative for previous
  const { shows, nextCursor, prevCursor } = await getShows({
    q: title?.[1],
    ...(cursorId && parseInt(cursorId) < 0
      ? { previousCursorId: cursorId }
      : { forwardCursorId: cursorId }),
    age: age?.[1],
  });
  return Response.json({ shows, nextCursor, prevCursor });
}
