import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);

  const isOwner = message.senderId === currentUser.uid;

  return (
    <div
      className={`text-neutral-950 dark:text-neutral-50 max-w-[80%] lg:max-w-[55%]  flex flex-col ${
        isOwner ? "self-end items-end" : "self-start items-start"
      }`}
    >
      {message.content?.picture && (
        <img
          src={message.content.picture}
          className="object-contain w-full max-w-md rounded-xl mt-2"
        />
      )}
      <div
        className={`TextContainer ${
          isOwner
            ? "bg-teal-300 dark:bg-teal-700 justify-end rounded-ee-none"
            : "bg-teal-100 dark:text-teal-900 rounded-ss-none"
        } rounded-lg px-3 py-2 mt-2`}
      >
        {message.content?.text && <p>{message.content.text}</p>}
      </div>
      <span className="text-xs">16:44</span>
    </div>
  );
};

export default Message;
