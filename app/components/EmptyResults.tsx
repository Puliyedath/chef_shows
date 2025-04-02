export default function EmptyResults() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <g>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="none" />
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fill="currentColor"
            fontSize="12"
            fontWeight="bold"
          >
            !
          </text>
        </g>
      </svg>
      <h2 className="text-xl font-semibold text-gray-700">No Results Found</h2>
      <p className="text-gray-500">Try adjusting your search criteria.</p>
    </div>
  );
}
