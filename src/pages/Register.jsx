import { LogoIcon, AddImageIcon } from "../assets/icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const imgFile = e.target[3].files[0];

    try {
      // new user creation
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCredentialImpl) => userCredentialImpl.user);

      // upload image
      let avatarURL = "";
      if (imgFile) {
        const newAvatarRef = ref(
          storage,
          `avatars/${newUser.uid}/${imgFile.name}`
        );
        const uploadTask = uploadBytesResumable(newAvatarRef, imgFile);
        uploadTask.on("state_changed", {
          error: (error) => console.log("uploadTask error =>", error),

          // si se sube correctamente,
          complete: async () => {
            avatarURL = await getDownloadURL(uploadTask.snapshot.ref);
            // actualiza el perfil del usuario.
            await updateProfile(newUser, { displayName, photoURL: avatarURL });
            // crea un nuevo documento en la coleccion de users en al bd
            await setDoc(doc(db, "users", newUser.uid), {
              uid: newUser.uid,
              photoURL: avatarURL,
              color: "teal",
              displayName: displayName,
              email: email,
            });
            // crea un documento en la coleccion de userChats en la bd
            await setDoc(doc(db, "userChats", newUser.uid), {});
            e.target.reset();
            navigate("/");
          },
        });
      } else {
        // actualiza el perfil del usuario.
        await updateProfile(newUser, { displayName });
        // actualiza la lista de usuarios en la bd
        await setDoc(doc(db, "users", newUser.uid), {
          uid: newUser.uid,
          photoURL: avatarURL,
          color: "teal",
          displayName: displayName,
          email: email,
        });
        // crea un documento en la coleccion de userChats
        await setDoc(doc(db, "userChats", newUser.uid), {});
        e.target.reset();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="formWrapper h-full w-full flex justify-center items-center bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-neutral-50">
      <div className="formContainer flex flex-col items-center gap-2 px-5 py-4 w-11/12  max-w-[450px] md:max-w-[400px] font-mono">
        <div className="logo flex items-center gap-4">
          <LogoIcon className="w-14 h-14 stroke-teal-500 dark:stroke-teal-600" />
          <p className="text-4xl ">Quiubo</p>
        </div>

        <p className="text-sm font-thin">Register</p>

        <form
          className="flex flex-col items-center w-full gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="display name"
            className="w-full px-4 py-3 border-b border-neutral-950 dark:border-neutral-50 bg-transparent "
          />
          <input
            type="text"
            placeholder="email"
            className="w-full px-4 py-3 border-b border-neutral-950 dark:border-neutral-50 bg-transparent "
          />
          <input
            type="password"
            placeholder="password"
            className="w-full px-4 py-3 border-b border-neutral-950 dark:border-neutral-50 bg-transparent "
          />
          <label className="cursor-pointer flex items-center self-start mt-3 gap-3 px-3">
            <input
              type="file"
              placeholder="Add an avatar"
              className="hidden"
              accept="image/png, image/jpeg, image/jpg"
            />
            <AddImageIcon className="w-12 h-12 fill-teal-5 00 fill-teal-500 dark:fill-teal-600" />
            <span>{`Add an Avatar`}</span>
          </label>

          <button className="font-medium text-xl px-10 py-3 rounded-md bg-teal-500 dark:bg-teal-600 text-neutral-50 dark:text-neutral-950 ">
            <p>Sign up</p>
          </button>
        </form>

        <p className=" text-xs mt-5">
          Do you have an account?{" "}
          <Link
            to="/login"
            className="font-bold underline hover:text-teal-500 text-neutral-950 hover:no-underline dark:text-neutral-50 dark:hover:text-teal-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
