import { test, expect, describe, vi } from "vitest";
import * as RemixReact from "@remix-run/react";
import { loader, action } from "~/routes/_index";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { FormHTMLAttributes } from "react";

// Mock the getShows function
vi.mock("~/.server/shows", () => ({
  getShows: vi.fn().mockResolvedValue({
    shows: [
      {
        id: 1,
        title: "Breaking Bad",
        year: 2008,
        age: 18,
        imdb: 9.4,
        rottenTomatoes: 100,
        source: "NETFLIX",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    nextCursor: 2,
    prevCursor: 0,
  }),
}));

// Mock the Form component
vi.mock("@remix-run/react", async () => {
  const actual = (await vi.importActual("@remix-run/react")) as typeof RemixReact;
  return {
    ...actual,
    Form: ({ children, ...props }: FormHTMLAttributes<HTMLFormElement>) => (
      <form {...props}>{children}</form>
    ),
  };
});

describe("Index Route", () => {
  describe("Loader", () => {
    test("returns shows with default parameters", async () => {
      const request = new Request("http://localhost:3000/");
      const response = await loader({ request, params: {} } as LoaderFunctionArgs);
      const data = await response.json();
      expect(data.shows).toHaveLength(1);
      expect(data.shows[0].title).toBe("Breaking Bad");
    });

    test("handles title search parameter", async () => {
      const request = new Request("http://localhost:3000/?q=title:breaking");
      const response = await loader({ request, params: {} } as LoaderFunctionArgs);
      const data = await response.json();

      expect(data.shows).toHaveLength(1);
      expect(data.shows[0].title).toBe("Breaking Bad");
    });

    test("handles age search parameter", async () => {
      const request = new Request("http://localhost:3000/?q=age:18");
      const response = await loader({ request, params: {} } as LoaderFunctionArgs);
      const data = await response.json();

      expect(data.shows).toHaveLength(1);
      expect(data.shows[0].age).toBe(18);
    });
  });

  describe("Action", () => {
    test("redirects with search query", async () => {
      const formData = new FormData();
      formData.append("q", "title:breaking");

      const request = new Request("http://localhost:3000/", {
        method: "POST",
        body: formData,
      });

      const response = await action({ request } as ActionFunctionArgs);

      expect(response.status).toBe(302); // Redirect status code
      expect(response.headers.get("Location")).toBe("http://localhost:3000/?q=title%3Abreaking");
    });

    test("handles empty search query", async () => {
      const formData = new FormData();
      const request = new Request("http://localhost:3000/", {
        method: "POST",
        body: formData,
      });

      const response = await action({ request } as ActionFunctionArgs);

      expect(response.status).toBe(302);
      expect(response.headers.get("Location")).toBe("http://localhost:3000/");
    });
  });
});
