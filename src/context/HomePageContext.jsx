import { createContext, useState, useEffect, useContext } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { AuthContext } from "./AuthContext";
import { db } from "../firebase";

export const HomePageContext = createContext();

export const HomePageContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const [currentConversationID, setCurrentConversationID] = useState("");
  const [userChats, setUserChats] = useState({});
  const [currentParticipants, setCurrentParticipants] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        const currentUserChats = doc.data();
        setUserChats(() => currentUserChats);
      });

      return () => {
        unsub();
      };
    };

    // Actualiza el estado cuando se actualiza el documento (siempre y cuando exista un usuario autenticado)
    currentUser?.uid && getChats();
  }, [currentUser.uid]);

  useEffect(() => {
    console.log(
      "HomePageContext currentConversationID =>",
      currentConversationID
    );
  }, [currentConversationID]);
  useEffect(() => {
    console.log("HomePageContext userChats =>", userChats);
  }, [userChats]);

  return (
    <HomePageContext.Provider
      value={{
        currentParticipants,
        setCurrentParticipants,

        currentConversationID,
        setCurrentConversationID,
        userChats,
        setUserChats,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};
