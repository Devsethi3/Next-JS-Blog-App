"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[5rem] items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <p className="text-2xl font-bold">BLOGAPP</p>
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
                  <li>
                    <Link href="/">More Posts</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {status === "notauthenticated" ? (
                <div className="sm:flex sm:gap-4">
                  <Link
                    className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                    href="/login"
                  >
                    Login
                  </Link>

                  <div className="hidden sm:flex">
                    <a
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                      href="#"
                    >
                      Register
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-8">
                  <Image
                    className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
                    src={user.photoURL}
                    width={50}
                    height={50}
                    alt="user"
                  />
                  <button
                    onClick={handleLogout}
                    className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
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
        </div>
      </header>
    </div>
  );
};

export default Header;
