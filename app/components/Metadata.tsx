export default function Metadata({ age, year }: { age: number; year: number }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <span>{year}</span>
      <span>•</span>
      <span>{age}+</span>
    </div>
  );
}
