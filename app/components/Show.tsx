import { Shows } from "@prisma/client";
import Badge from "./Badge";
import Metadata from "./Metadata";
import ShowTitle from "./ShowTitle";
import RatingBadge from "./RatingBadge";

export default function Show({ show }: { show: Shows }) {
  return (
    <div className="relative group cursor-pointer overflow-hidden rounded-lg bg-[#e9e1d1] transition-all duration-300 hover:scale-105">
      <RatingBadge rating={show.imdb} />

      <div className="p-4 text-gray-900">
        <ShowTitle title={show.title} />
        <Metadata age={show.age} year={show.year} />
        <Badge source={show.source.replace("_", " ")} />
      </div>
    </div>
  );
}
