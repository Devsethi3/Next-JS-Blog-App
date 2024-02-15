"use client";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      <div
        onClick={() => setDarkMode(!darkMode)}
        className="w-[70px] theme-button h-[30px]  relative rounded-full cursor-pointer flex items-center justify-between px-2"
      >
        <FaMoon className="text-red-500 dark:text-white" />
        <span
          style={
            darkMode
              ? { left: "7px", backgroundColor: "#fff" }
              : { right: "7px", backgroundColor: "#fff" }
          }
          className="absolute right-2 w-[18px] h-[18px] rounded-full"
        ></span>
        <FaSun className="dark:text-yellow-400" />
      </div>
    </>
  );
};

export default ThemeToggle;
