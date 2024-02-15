"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import SearchBar from "../searchBar/SearchBar";

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("notauthenticated");
  const [user, setUser] = useState(null); // State to hold user information

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setStatus("authenticated");
        setUser(user); // Set the user state when authenticated
      } else {
        setStatus("notauthenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleProfile = async () => {
    try {
      router.push(`/${user.email}`);
    } catch (error) {
      console.error("Error navigating to profile:", error.message);
    } finally {
      setIsOpen(false); // Close the dropdown menu
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error.message);
    } finally {
      setIsOpen(false); // Close the dropdown menu
    }
  };

  return (
    <>
      <header className="">
        <div className="flex h-[5rem] items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link href="/">
              <p className="text-3xl font-bold">BLOGAPP</p>
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-8">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/">About</Link>
                </li>
                <li>
                  <Link href="/">Trending</Link>
                </li>
              </ul>
            </nav>
          </div>
          <SearchBar user={user} />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {status === "notauthenticated" ? (
              <div className="sm:flex ml-4 sm:gap-4">
                <Link
                  className="rounded-md bg-teal-600 text-white px-5 py-2.5 font-medium shadow"
                  href="/login"
                >
                  Login
                </Link>

                <div className="hidden sm:flex">
                  <a
                    className="rounded-md bg-gray-100 px-5 py-2.5 font-medium text-teal-600"
                    href="#"
                  >
                    Register
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-8">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex relative cursor-pointer items-center"
                >
                  <Image
                    className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
                    src={user.photoURL}
                    width={54}
                    height={54}
                    alt="user"
                  />
                  <RiArrowDropDownLine
                    className={`text-3xl transition-transform transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {isOpen && (
                  <div className="absolute top-16 mt-2 w-48 rounded-md bg-white shadow-lg z-[100]">
                    <ul className="py-1">
                      <li className="hover:bg-gray-200 cursor-pointer px-4 py-2">
                        <button
                          className="flex items-center gap-2"
                          onClick={handleProfile}
                        >
                          <FaUserCircle />
                          <span>Profile</span>
                        </button>
                      </li>
                      <li className="hover:bg-gray-200 cursor-pointer px-4 py-2">
                        <button
                          className="flex items-center gap-2"
                          onClick={handleLogout}
                        >
                          <MdLogout />
                          Logout
                        </button>
                      </li>
                      <li className="flex items-center px-2 bg-slate-50 py-2">
                        <Image
                          className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
                          src={user.photoURL}
                          width={40}
                          height={40}
                          alt="user"
                        />
                        <div className="flex flex-col">
                          <p className="text-sm text-gray-800">
                            {user.displayName}
                          </p>
                          <span className="text-xs text-gray-600 mt-[-3px]">
                            {user.email}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                <button
                  onClick={() => router.push("/pin-builder")}
                  className="rounded-md flex items-center gap-2 hover:bg-teal-600 hover:text-white transition-all px-5 py-2 border-2 border-teal-600 font-medium shadow"
                >
                  <span>Create Post</span>
                  <IoMdAddCircleOutline className="text-xl" />
                </button>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-teal-600 text-white px-5 py-2.5 font-medium shadow"
                >
                  Logout
                </button>
              </div>
            )}

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <LuMenu />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
