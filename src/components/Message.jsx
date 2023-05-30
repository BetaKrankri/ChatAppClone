import React from "react";

const Message = ({ isOwner }) => {
  return (
    <div
      className={`text-neutral-950 dark:text-neutral-50 max-w-[80%] lg:max-w-[55%]  flex flex-col ${
        isOwner ? "self-end items-end" : "self-start items-start"
      }`}
    >
      {/* <img
        src="https://i.pinimg.com/originals/40/db/88/40db88db54a0fdcdb427db5481b6e511.jpg"
        className="object-contain w-full max-w-md rounded-xl mt-2"
      /> */}
      <div
        className={`TextContainer ${
          isOwner
            ? "bg-teal-300 dark:bg-teal-700 justify-end rounded-ee-none"
            : "bg-teal-100 dark:text-teal-900 rounded-ss-none"
        } rounded-lg px-3 py-2 mt-2`}
      >
        <p>
          Lorem accusamus et iusto odio dignissimos ducimus qui blanditiis
          praesentium voluptatum deleniti atque corruptKi quos dolores et quas
          molestias excepturi si
        </p>
      </div>
      <span className="text-xs">16:44</span>
    </div>
  );
};

export default Message;
