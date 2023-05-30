import { AddImageIcon, SendIcon } from "../assets/icons";

const Input = () => {
  return (
    <div className="input flex border-t border-neutral-950 dark:border-neutral-50">
      <div className="inputForm w-full py-3 px-8 flex gap-4">
        <div className="inputLabel w-full flex gap-4 ">
          <input
            type="text"
            className="w-full outline-none bg-transparent"
            placeholder="Type something..."
          />
        </div>

        <div className="flex gap-4">
          <label>
            <input type="file" className=" hidden" />
            <AddImageIcon className="w-10 h-10 fill-neutral-950 dark:fill-neutral-50 cursor-pointer" />
          </label>
          <button className="">
            <SendIcon className="w-10 h-10 fill-teal-500 hover:fill-neutral-950 hover:dark:fill-neutral-50" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
