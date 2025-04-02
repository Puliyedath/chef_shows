import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import Show from "~/components/Show";
import { Shows } from "@prisma/client";
import { getShows } from "~/.server/shows";

export default function Index() {
  const { shows } = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen p-8">
      <div className="flex items-center justify-between">
        <Form method="post" className="mb-6 flex items-center flex-1">
          <input
            type="text"
            name="q"
            placeholder="Search title or age (e.g. 'title:inception or age:30')"
            className="border rounded p-2 w-full"
          />
          <button type="submit" className="ml-2 bg-blue-500 text-white rounded p-2">
            Search
          </button>
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
  return redirect(`/?q=${q}`);
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const limit = parseInt(params.limit || "40");
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || undefined;
  const title = q?.match(/title:([^\s]+)/i) ?? undefined;
  const age = q?.match(/age:(\d+)/i) ?? undefined;
  const cursorId = params.cursorId;
  const shows = await getShows({ q: title?.[1], cursorId, limit, age: age?.[1] });
  return Response.json({ shows });
}
