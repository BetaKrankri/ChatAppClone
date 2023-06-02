import React, { useState } from "react";
import { SearchIcon } from "../assets/icons";
import { getDocs, query, collection, where, and, or } from "firebase/firestore";
import { db } from "../firebase";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [queryResult, setQueryResult] = useState([]);

  const handleSearch = async () => {
    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users"),
          or(
            and(
              where("displayName", ">=", searchTerm),
              where("displayName", "<=", searchTerm + "\uf8ff")
            )
          )
        )
      );
      setQueryResult(() => [...querySnapshot.docs.map((doc) => doc.data())]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="search ">
      <div className="searchForm w-full py-5 px-8">
        <div className="inputLabel flex gap-4 border-b pb-2 border-neutral-950 dark:border-neutral-50">
          <SearchIcon
            className="w-6 h-6 fill-slate-950 dark:fill-slate-50"
            onClick={handleSearch}
          />
          <input
            type="text"
            className="w-full outline-none bg-transparent"
            placeholder="Find a user"
            onKeyDown={(e) => e.code == "Enter" && handleSearch()}
            onChange={(e) => setSearchTerm(() => e.target.value)}
          />
        </div>
      </div>

      {queryResult.map((user) => (
        <div
          key={user.uid}
          className="w-full flex gap-4 px-3 py-4 xl:px-5 xl:gap-6 border-b border-neutral-950 dark:border-neutral-50"
        >
          <div className="rounded-full overflow-hidden w-14 h-14 grid place-items-center bg-teal-950">
            {user.photoURL && (
              <img
                className="w-full h-full object-contain rounded-md overflow-hidden"
                src={user.photoURL}
              />
            )}
          </div>
          <div className=" flex items-center overflow-hidden">
            <h1 className="font-bold text-xl">{user.displayName}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
