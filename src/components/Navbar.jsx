import ColorModeSwitch from "./ColorModeSwitch";
import { LogoIcon } from "../assets/icons";
import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isShown, setIsShown] = useState(false);

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="w-full px-4 md:py-2 py-2.5 flex justify-between items-center bg-teal-500 rounded-sm text-neutral-950 relative">
      <div className="flex items-center gap-4">
        <div className="rounded-full overflow-hidden w-14 h-14 grid place-items-center bg-teal-950">
          {currentUser.photoURL && (
            <img
              className="w-full h-full object-cover rounded-md overflow-hidden"
              src={currentUser.photoURL}
            />
          )}
        </div>
        <p className=" text-lg font-bold text-neutral-50 dark:text-neutral-950">
          {currentUser.displayName}
        </p>
      </div>

      {/* Submenu */}
      <div
        onClick={() => {
          setIsShown((is) => !is);
        }}
        className="relative"
      >
        <LogoIcon
          className={`w-10 h-10 ${
            isShown
              ? "stroke-neutral-950 dark:stroke-nautral-50"
              : "stroke-neutral-50 dark:stroke-neutral-950"
          }  cursor-pointer`}
        />

        <div
          className={`SubmenuBox ${
            isShown ? "inline-block" : "hidden"
          } absolute top-2/4 right-4 z-10 max-w-xs w-min grid grid-flow-row auto-rows-[40px] p-1 shadow rounded-sm bg-teal-500 shadow-neutral-950 dark:shadow-neutral-50 `}
        >
          {/* Botones */}
          <button
            className="whitespace-nowrap p-1 flex justify-start items-center stroke-neutral-50 dark:stroke-neutral-950 hover:stroke-neutral-950 hover:dark:stroke-neutral-50"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ColorModeSwitch />
          </button>
          <></>
          <button
            className="whitespace-nowrap p-1 flex justify-start items-center text-neutral-50 dark:text-neutral-950 hover:text-neutral-950 dark:hover:text-neutral-50"
            onClick={(e) => {
              e.stopPropagation();
              setIsShown((is) => !is);
              signOut(auth);
            }}
          >
            Log out
          </button>

          <div
            className="dummy fixed top-0 left-0 right-0 bottom-0 -z-10 "
            onClick={(e) => {
              e.stopPropagation();
              setIsShown((is) => !is);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
