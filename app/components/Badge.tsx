export default function Badge({ source }: { source: string }) {
  return (
    <div className="mt-3 ">
      <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-[#8B4513] text-white">
        {source}
      </span>
    </div>
  );
}
