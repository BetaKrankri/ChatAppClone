import { LogoIcon } from "../assets/icons";

const Login = () => {
  return (
    <div className="formWrapper h-full w-full flex justify-center items-center bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-neutral-50">
      <div className="formContainer flex flex-col items-center gap-2 px-5 py-4 w-11/12  max-w-[450px] md:max-w-[400px] font-mono">
        <div className="logo flex items-center gap-4">
          <LogoIcon className="w-14 h-14 stroke-teal-500 dark:stroke-teal-600" />
          <p className="text-4xl ">Quiubo</p>
        </div>

        <p className="text-sm font-thin">Log in</p>

        <form className="flex flex-col items-center w-full gap-2">
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
          <button className="font-medium text-xl px-10 py-3 rounded-md mt-6 bg-teal-500 dark:bg-teal-600 text-neutral-50 dark:text-neutral-950 ">
            <p>Log in</p>
          </button>
        </form>

        <p className=" text-xs mt-5">
          Do not have an account?{" "}
          <a
            href="#"
            className="font-bold underline hover:text-teal-500 text-neutral-950 hover:no-underline dark:text-neutral-50 dark:hover:text-teal-600"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
