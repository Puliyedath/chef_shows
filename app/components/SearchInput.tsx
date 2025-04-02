export default function SearchInput({ q }: { q: string | null }) {
  return (
    <input
      type="text"
      name="q"
      placeholder="Search title or age (e.g. 'title:inception or age:30')"
      className="border rounded p-2 w-full"
      defaultValue={q || ""}
    />
  );
}
