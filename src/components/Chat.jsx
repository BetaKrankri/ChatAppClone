import { AddContactIcon, SearchIcon } from "../assets/icons";
import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Top */}
      <div className="chatBar py-2 px-4 flex justify-between items-center bg-teal-500">
        <div className="rounded-full overflow-hidden w-14 h-14 grid place-items-center bg-teal-950">
          <img
            className="w-full h-full object-contain rounded-md overflow-hidden"
            src=""
          />
        </div>
        <h1 className="font-bold text-xl text-neutral-50 dark:text-neutral-950">
          Juan Macanei
        </h1>
        <div className="flex gap-4 items ">
          <button
            className={`p-1 fill-neutral-50 dark:fill-neutral-950 hover:fill-neutral-950 dark:hover:fill-neutral-50`}
          >
            <SearchIcon className="w-6 h-6" />
          </button>
          <button
            className={`p-1 stroke-neutral-50 dark:stroke-neutral-950 hover:stroke-neutral-950 dark:hover:stroke-neutral-50`}
          >
            <AddContactIcon className="w-7 h-7" />
          </button>
        </div>
      </div>
      {/* Center */}
        <Messages />
      {/* Bottom */}
      <Input />
    </div>
  );
};

export default Chat;
