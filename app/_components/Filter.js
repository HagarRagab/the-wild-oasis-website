"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterButton from "./FilterButton";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const filteredBy = searchParams.get("capacity") || "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <ul className="border-primary-900 flex border">
      <FilterButton
        onFilter={() => handleFilter("all")}
        isActive={filteredBy === "all"}
      >
        all cabins
      </FilterButton>
      <FilterButton
        onFilter={() => handleFilter("small")}
        isActive={filteredBy === "small"}
      >
        1&mdash;3 guests
      </FilterButton>
      <FilterButton
        onFilter={() => handleFilter("medium")}
        isActive={filteredBy === "medium"}
      >
        4&mdash;7 guests
      </FilterButton>
      <FilterButton
        onFilter={() => handleFilter("large")}
        isActive={filteredBy === "large"}
      >
        8&mdash;10 guests
      </FilterButton>
    </ul>
  );
}

export default Filter;
