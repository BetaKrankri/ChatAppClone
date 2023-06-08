import { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { HomePageContext } from "../context/HomePageContext";
import { AuthContext } from "../context/AuthContext";

const Messages = () => {
  const { currentConversationID, setCurrentParticipants } =
    useContext(HomePageContext);
  // se podria crar un estado conversations. Se podria extraer participants al Contexto para ser usado por Inputs para actualizar uerChats.
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getConversation = () => {
      const conversationRef = doc(db, "conversations", currentConversationID);
      // al seleccionarse una conversacion se suscribe al documento conversacion en cuestion.
      const unsub = onSnapshot(conversationRef, (converSnap) => {
        if (!converSnap.exists()) return;
        // se obtiene la informacion del doc `conversations`
        const conversation = converSnap.data();
        console.log("conversation =>", conversation);
        // se actualiza el estado `messages` del componente
        setMessages(conversation.messages);
        setCurrentParticipants(conversation.participants);
      });
      return () => {
        unsub();
      };
    };
    currentConversationID && getConversation();
  }, [currentConversationID]);

  return (
    <div className="w-full h-full px-2 md:px-4 pb-2  flex flex-col overflow-y-scroll overflow-x-hidden bg-teal-500/10">
      {messages?.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export default Messages;
