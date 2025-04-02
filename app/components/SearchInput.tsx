export default function SearchInput({
  defaultValue,
  prefix,
}: {
  defaultValue: string | null;
  prefix: string;
}) {
  return (
    <input
      type="text"
      name="q"
      placeholder="Search title or age (e.g. 'title:inception or age:30')"
      className="border rounded p-2 w-full"
      defaultValue={defaultValue || ""}
      onChange={e => {
        const value = e.target.value;
        e.target.value = prefix + value.replace(prefix, "");
      }}
    />
  );
}
