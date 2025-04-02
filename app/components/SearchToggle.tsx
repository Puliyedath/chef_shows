import { useSearchParams } from "@remix-run/react";
import SearchInput from "./SearchInput";
import { useState, useRef, useEffect } from "react";

export default function SearchInputWithToggle() {
  const [searchParams] = useSearchParams();
  const [prefix, setPrefix] = useState(searchParams.get("q")?.includes("age:") ? "age" : "title");
  const q = useRef(searchParams.get("q"));
  useEffect(() => {
    q.current = "";
  }, [q]);

  return (
    <div className="flex items-center flex-col flex-1">
      <SearchInput key={prefix} prefix={`${prefix}:`} defaultValue={q.current} />
      <div className="flex self-start py-2">
        <label>
          <input
            type="radio"
            name="searchType"
            value="title"
            defaultChecked={prefix === "title"}
            onChange={() => setPrefix("title")}
          />
          <span className="ml-2">Search Title</span>
        </label>
        <label className="ml-4">
          <input
            type="radio"
            name="searchType"
            value="age"
            defaultChecked={prefix === "age"}
            onChange={() => setPrefix("age")}
          />
          <span className="ml-2">Search Age</span>
        </label>
      </div>
    </div>
  );
}
