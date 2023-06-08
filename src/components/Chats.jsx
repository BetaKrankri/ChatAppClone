import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { HomePageContext } from "../context/HomePageContext";
import { getRelTimeString } from "../utils/index";

const Chats = () => {
  const { userChats, setCurrentConversationID } = useContext(HomePageContext);

  const orderedArrayChats = Object.entries(userChats).map(([id, conver]) => ({
    ...conver,
    id,
  }));
  return (
    <div className="chats w-full pt-2">
      {/* Renderiza solo las conversaciones que tenga un ultimo mensaje */}
      {Object.entries(userChats).map(([id, conver]) => {
        return conver?.lastMessage ? (
          <div
            className="w-full flex gap-4 px-3 py-4 xl:px-5 xl:gap-6 hover:cursor-pointer hover:bg-teal-500/5 rounded-lg"
            key={id}
            onClick={() => {
              setCurrentConversationID(id);
            }}
          >
            <div className="rounded-full overflow-hidden w-14 h-14 grid place-items-center bg-teal-950 text-white">
              {conver.converPhoto && (
                <img
                  className="w-full h-full object-contain rounded-md overflow-hidden"
                  src={conver.converPhoto}
                />
              )}
            </div>
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              <h1 className="font-bold text-xl">{conver.chatName}</h1>
              <p className="line-clamp-1 text-sm">
                {conver.lastMessage.content.picture
                  ? conver.lastMessage.content.text
                    ? conver.lastMessage.content.text
                    : "Picture 📷"
                  : conver.lastMessage.content.text}
              </p>
            </div>
            <div>
              <span>
                {getRelTimeString(conver.lastMessage.timestamp.toDate())}
              </span>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default Chats;
