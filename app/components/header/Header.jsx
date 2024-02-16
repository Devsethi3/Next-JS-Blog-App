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
import { RiArrowDropDownLine, RiCloseCircleLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import SearchBar from "../searchBar/SearchBar";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const router = useRouter();
  const [navToggle, setNavToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("notauthenticated");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setStatus("authenticated");
        setUser(user);
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
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
    } finally {
      setIsOpen(false);
    }
  };

  const toggle = () => {
    setNavToggle(!navToggle);
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     setNavToggle(!navToggle);
  //   });
  // }, [navToggle]);

  const onCreateClick = () => {
    if (user) {
      router.push("/pin-builder");
      toggle();
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <header className="">
        <div className="flex border-b-2 header-border h-[5rem] items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/images/favicon.ico"
                width={35}
                height={35}
                alt="logo"
              />
              <p className="text-[1.8rem] font-bold nav-logo-text">BLOGAPP</p>
            </Link>
          </div>
          <SearchBar user={user} />
          <ThemeToggle />

          <div
            className={`flex items-center nav-menu ${
              navToggle ? "show-menu" : "nav-menu"
            } w-[50%]`}
          >
            <RiCloseCircleLine
              onClick={toggle}
              className="text-5xl nav-close p-2 rounded-full cursor-pointer absolute top-[3%] right-[5%]"
            />
            <div className="nav-list">
              <nav aria-label="Global">
                <ul className="flex items-center nav-links gap-8">
                  <li>
                    <Link onClick={toggle} href="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link onClick={toggle} href="/">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={toggle}
                      href="/recent-posts"
                      className="whitespace-nowrap"
                    >
                      Recent Posts
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex nav-right-links items-center ml-auto nav-right-section gap-4">
              {status === "notauthenticated" ? (
                <div className="sm:flex ml-4 sm:gap-4">
                  <Link
                    onClick={toggle}
                    className="rounded-md login-button bg-teal-600 text-white px-5 py-2.5 font-medium shadow"
                    href="/login"
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <div className="flex profile-actions items-center gap-8">
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex relative cursor-pointer items-center"
                  >
                    <Image
                      className="rounded-full cursor-pointer p-2 profile-picture"
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
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="absolute profile-toggle top-16 mt-2 w-48 rounded-md bg-white shadow-lg z-[100]"
                      >
                        <ul className="py-1">
                          <li className="profile-toggle-text cursor-pointer px-4 py-2">
                            <button
                              className="flex items-center gap-2"
                              onClick={handleProfile}
                            >
                              <FaUserCircle />
                              <span>Profile</span>
                            </button>
                          </li>
                          <li className="profile-toggle-text cursor-pointer px-4 py-2">
                            <button
                              className="flex items-center gap-2"
                              onClick={handleLogout}
                            >
                              <MdLogout />
                              Logout
                            </button>
                          </li>
                          <li className="flex items-center px-2 py-2">
                            <Image
                              className="rounded-full cursor-pointer p-2"
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button
                    onClick={onCreateClick}
                    className="rounded-md whitespace-nowrap flex items-center gap-2 hover:bg-teal-600 hover:text-white transition-all px-5 py-2 border-2 border-teal-600 font-medium shadow"
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
            </div>
          </div>
          <div onClick={toggle} className="block md:hidden">
            <button className="rounded nav-toggle p-2 text-gray-600 transition hover:text-gray-600/75">
              <LuMenu className="text-xl" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
