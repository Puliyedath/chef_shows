import { test, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRemixStub } from "@remix-run/testing";
import * as RemixReact from "@remix-run/react";
import Index from "../app/routes/_index";

// Mock the Form component
vi.mock("@remix-run/react", async () => {
  const actual = (await vi.importActual("@remix-run/react")) as typeof RemixReact;
  return {
    ...actual,
    Form: ({ children, ...props }: RemixReact.FormProps) => <form {...props}>{children}</form>,
  };
});

describe("Index route", () => {
  test("renders empty state when no shows", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: Index,
        loader: () => ({ shows: [] }),
      },
    ]);

    render(<RemixStub />);

    // Verify no show cards are rendered
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
  test("renders shows and search form", async () => {
    // Mock show data
    const mockShows = [
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
    ];

    // Create a stub of your route
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: Index,
        loader: () => ({ shows: mockShows }),
      },
    ]);

    render(<RemixStub />);

    // Test show card elements
    expect(await screen.findByText("Breaking Bad")).toBeInTheDocument();
    expect(await screen.findByText("2008")).toBeInTheDocument();
    expect(await screen.findByText("18+")).toBeInTheDocument();
    expect(await screen.findByText("9.4")).toBeInTheDocument();
    expect(await screen.findByText("NETFLIX")).toBeInTheDocument();
  });
});
