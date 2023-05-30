import { useState } from "react";
import { LogoIcon } from "../assets/icons";

const Submenu = ({ menuList, className }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div onClick={() => setIsShown((is) => !is)}>
      <LogoIcon className={className} />
      <div
        className={`${
          isShown ? "inline-block" : "hidden"
        } bg-slate-800 p-1 absolute top-11 right-2 z-10`}
      >
        {menuList.map((menuItem, i) => (
          <button
            key={i}
            className="border-t  border-slate-950 p-1 whitespace-nowrap w-full"
            onClick={() => {
              menuItem.handleFn();
              setIsShown((is) => !is);
            }}
          >
            {menuItem.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Submenu;
