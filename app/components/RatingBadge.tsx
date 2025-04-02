export default function RatingBadge({ rating }: { rating: number }) {
  return (
    <div className="absolute bottom-2 right-2 z-10">
      <div className="flex items-center gap-1">
        <span className="text-yellow-800">★</span>
        <span className="text-gray-900 font-semibold">{rating}</span>
      </div>
    </div>
  );
}
