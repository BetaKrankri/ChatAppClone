import { useContext, useState } from "react";
import { AddImageIcon, SendIcon } from "../assets/icons";
import { updateDoc, doc, arrayUnion, Timestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { HomePageContext } from "../context/HomePageContext";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Input = () => {
  const [content, setContent] = useState({ text: "", picture: null });
  const { currentConversationID, currentParticipants } =
    useContext(HomePageContext);
  const { currentUser } = useContext(AuthContext);

  const handleSend = async (e) => {
    e.preventDefault();
    // - si existe un contenido :
    if (content?.text || content?.picture) {
      // --crea un nuevo mensaje
      let newMessage = {
        id: uuidv4(),
        content: {},
        senderId: currentUser.uid,
        timestamp: Timestamp.now(),
      };

      if (content?.text) {
        newMessage.content.text = content.text;
      }
      // -- - Si el mensaje lleva una imagen
      else if (content?.picture) {
        const extension = content.picture.name.match(new RegExp("[^.]+$"));
        // - Sube a firestore/storage la imagen, luego obtiene su url
        const pictureURL = await uploadBytes(
          ref(
            storage,
            `conversations/${currentConversationID}/${newMessage.id}.${extension}`
          ),
          content.picture
        ).then(async (uploadResult) => await getDownloadURL(uploadResult.ref));
        // agrega la url al contenido
        newMessage.content.picture = pictureURL;
      }

      // update de conversation with a new Message
      await updateDoc(doc(db, "conversations", currentConversationID), {
        messages: arrayUnion(newMessage),
      })
        .catch((error) => console.error(error))
        .then(() => {
          // update each participant userChat doc lastMessage
          currentParticipants.forEach((participant) => {
            const updatedChatData = {
              [currentConversationID + ".lastMessage"]: newMessage,
            };
            if (participant.uid !== currentUser.uid) {
              updatedChatData[currentConversationID + ".converPhoto"] =
                currentUser.photoURL;
              updatedChatData[currentConversationID + ".chatName"] =
                currentUser.displayName;
            }

            updateDoc(doc(db, "userChats", participant.uid), updatedChatData);
          });

          // reset form
        })
        .then(() => setContent({ text: "", picture: "" }));
    }
    return;
  };

  return (
    <div className="input flex border-t border-neutral-950 dark:border-neutral-50">
      <form
        className="inputForm w-full py-3 px-8 flex gap-4"
        onSubmit={handleSend}
      >
        <div className="inputLabel w-full flex gap-4 ">
          <input
            type="text"
            className="w-full outline-none bg-transparent"
            placeholder="Type something..."
            name="text"
            value={content.text}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                text: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex gap-4">
          <label>
            <input
              type="file"
              className=" hidden"
              name="picture"
              onChange={(e) =>
                setContent((c) => ({
                  ...c,
                  picture: e.target.files[0],
                }))
              }
            />
            <AddImageIcon className="w-10 h-10 fill-neutral-950 dark:fill-neutral-50 cursor-pointer" />
          </label>
          <button className="" type="submit">
            <SendIcon className="w-10 h-10 fill-teal-500 hover:fill-neutral-950 hover:dark:fill-neutral-50" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
