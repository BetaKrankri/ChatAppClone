import React, { useState } from "react";
import { SearchIcon } from "../assets/icons";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    //TODO: handle search
    console.log("searching for: ", searchTerm);
  };

  const handleEnter = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className="search border-b border-neutral-950 dark:border-neutral-50">
      <div className="searchForm w-full py-5 px-8">
        <div className="inputLabel flex gap-4 border-b pb-2 border-neutral-950 dark:border-neutral-50">
          <SearchIcon className="w-6 h-6 fill-slate-950 dark:fill-slate-50" />
          <input
            type="text"
            className="w-full outline-none bg-transparent"
            placeholder="Find a user"
            onKeyDown={handleEnter}
            onChange={(e) => setSearchTerm((st) => e.target.value)}
          />
        </div>
      </div>

      <div className="w-full flex gap-4 px-3 py-4 xl:px-5 xl:gap-6">
        <div className="rounded-full overflow-hidden w-14 h-14 grid place-items-center bg-teal-950">
          <img className="w-full h-full object-contain rounded-md overflow-hidden" />
        </div>
        <div className=" flex items-center overflow-hidden">
          <h1 className="font-bold text-xl">Juan Perez</h1>
        </div>
      </div>
    </div>
  );
};

export default Search;
