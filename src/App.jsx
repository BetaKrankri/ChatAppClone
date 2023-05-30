import { useEffect, useState } from "react";
import ColorModeSwitch from "./components/ColorModeSwitch";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <div className={`h-screen w-full dark:bg-red-950 bg-red-100`}>
      <Register />
      {/* <Login /> */}
      {/* <Home /> */}
    </div>
  );
}

export default App;
