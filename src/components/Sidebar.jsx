import React, { useState } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats.jsx";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div
      className={`Wrapper ${
        isOpen ? "absolute" : "hidden"
      } h-full w-full lg:static lg:block lg:max-w-md xl:max-w-lg bg-neutral-50/70 dark:bg-neutral-950/70 z-10`}
    >
      <div className=" Container h-full w-full flex flex-col max-w-md lg:max-w-full bg-neutral-50 dark:bg-neutral-950 shadow-md shadow-neutral-950 dark:shadow-neutral-50">
        <Navbar />
        <Search />
        <Chats />
      </div>
    </div>
  );
};

export default Sidebar;
