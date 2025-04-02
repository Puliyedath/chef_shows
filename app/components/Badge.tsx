export default function Badge({ source }: { source: string }) {
  const colorMap: Record<string, string> = {
    NETFLIX: "bg-[#e50914]",
    AMAZON: "bg-[blue]",
    HULU: "bg-[green]",
    "DISNEY PLUS": "bg-[#85a7c3]",
    "PRIME VIDEO": "bg-[#79b8f3]",
  };
  return (
    <div className="mt-3 ">
      <span
        className={`inline-block px-2 py-1 text-xs font-semibold rounded ${colorMap[source]} text-white`}
      >
        {source}
      </span>
    </div>
  );
}
