import React, { useContext, useState } from "react";
import { SearchIcon } from "../assets/icons";
import {
  updateDoc,
  setDoc,
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
  and,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { HomePageContext } from "../context/HomePageContext";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [queryResult, setQueryResult] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { setCurrentConversationID } = useContext(HomePageContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      await getDocs(
        query(
          collection(db, "users"),
          and(
            where("displayName", ">=", searchTerm),
            where("displayName", "<=", searchTerm + "\uf8ff")
          )
        )
      ).then((qSnap) => {
        const qResult = qSnap.docs
          .map((doc) => doc.data())
          .filter((user) => user.uid !== currentUser.uid);
        setQueryResult(qResult);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = async (selectedUser) => {
    // Genera el uid de la conversacion
    const combinedId =
      currentUser.uid >= selectedUser.uid
        ? currentUser.uid + selectedUser.uid
        : selectedUser.uid + currentUser.uid;

    //revisa si existe una conversacion en firestore
    try {
      const conversation = await getDoc(
        doc(db, "conversations", combinedId)
      ).then(async (res) => {
        // si el documento no existe crea uno (conversations).
        if (!res.exists()) {
          // console.log("creating a new conversation doc...");
          const newConversation = {
            id: combinedId,
            participants: [
              {
                displayName: currentUser.displayName,
                uid: currentUser.uid,
                photoURL: currentUser.photoURL,
              },
              {
                displayName: selectedUser.displayName,
                uid: selectedUser.uid,
                photoURL: selectedUser.photoURL,
              },
            ],
            messages: [],
          };
          // Tambien crea una conversacion
          await setDoc(doc(db, "conversations", combinedId), newConversation);
          // Agrega la conversacion al registro de conversaciones del usuario con sesion iniciada.
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId]: {
              converPhoto: selectedUser.photoURL,
              chatName: selectedUser.displayName,
            },
          });
          return newConversation;
        }
        return res.data();
        // then() end;
      });

      setCurrentConversationID(conversation.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search ">
      <div className="searchForm w-full py-5 px-8">
        <form
          className="inputLabel flex gap-4 border-b pb-2 border-neutral-950 dark:border-neutral-50"
          onSubmit={handleSearch}
        >
          <SearchIcon
            className="w-6 h-6 fill-slate-950 dark:fill-slate-50"
            onClick={handleSearch}
          />
          <input
            type="text"
            className="w-full outline-none bg-transparent"
            placeholder="Find a user"
            onKeyDown={(e) => e.code == "Enter" && handleSearch(e)}
            onChange={(e) => setSearchTerm(() => e.target.value)}
          />
        </form>
      </div>

      {queryResult.map((user) =>
        user.uid === currentUser.uid ? null : (
          <div
            key={user.uid}
            className="w-full flex gap-4 px-3 py-4 xl:px-5 xl:gap-6 border-b border-neutral-950 dark:border-neutral-50 hover:cursor-pointer hover:bg-teal-500/5 rounded-lg"
            onClick={() => handleSelect(user)}
          >
            <div className="rounded-full overflow-hidden w-14 h-14 grid place-items-center bg-teal-950">
              {user.photoURL && (
                <img
                  className="w-full h-full object-contain rounded-md overflow-hidden"
                  src={user.photoURL}
                />
              )}
            </div>
            <div className=" flex items-center overflow-hidden">
              <h1 className="font-bold text-xl">{user.displayName}</h1>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Search;
