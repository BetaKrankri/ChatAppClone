import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "../assets/icons";

const ColorModeSwitch = () => {
  const [isDark, setIsDark] = useState(null);

  useEffect(() => {
    const initialTheme = document.documentElement.classList.contains("dark");
    setIsDark(initialTheme);
    // initialTheme en chrome solo regresaba dark mientras que Mozzila y Edge isDark false 11:27pm 20/05
  }, []);

  useEffect(() => {
    if (isDark === null) return;
    localStorage.theme = isDark ? "dark" : "light";
    if (localStorage.theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [isDark]);

  return (
    <div
      className="ColorSwitchMode h-full cursor-pointer z-10 "
      onClick={() => {
        setIsDark((id) => !id);
      }}
    >
      {isDark && <SunIcon className="w-full h-full " />}
      {!isDark && <MoonIcon className="w-full h-full " />}
    </div>
  );
};

export default ColorModeSwitch;
