"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { FaRegShareSquare } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import PostList from "../components/posts/PostList";

const ProfileSkeleton = () => (
  <div className="grid place-items-center mt-12">
    <div className="bg-gray-200 rounded-full w-36 h-36 animate-pulse"></div>
    <div className="flex mt-8 items-center gap-8">
      <div className="bg-gray-200 w-32 h-10 animate-pulse"></div>
      <div className="bg-gray-200 w-32 h-10 animate-pulse"></div>
    </div>
  </div>
);

const ProfilePage = ({ params }) => {
  const db = getFirestore(); // Initialize Firestore

  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // Changed from undefined to null
  const [isLoading, setIsLoading] = useState(true);
  const [listOfPins, setListOfPins] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Set user info directly from user object
        setUserInfo({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user?.email) {
      getUserPins();
    }
  }, [user]); // Changed from session to user

  const getUserPins = async () => {
    try {
      const q = query(
        collection(db, "blog-post"),
        where("email", "==", user?.email) 
      );
      const querySnapshot = await getDocs(q);
      const pinsData = querySnapshot.docs.map((doc) => doc.data());
      setListOfPins(pinsData);
      setIsLoading(false); 
    } catch (error) {
      console.error("Error fetching user pins:", error);
      setIsLoading(false);
    }
  };
  
  return (
    <>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <div className="grid place-items-center mt-12">
          <Image
            src={user?.photoURL}
            width={180}
            height={180}
            alt="user-image"
            className="rounded-full"
          />
          <div className="flex mt-8 items-center gap-8">
            <button className="bg-indigo-600 flex items-center gap-2 hover:bg-transparent hover:text-black py-2 border-2 border-indigo-600 hover:border-indigo-700 px-7 rounded-md text-white transition-colors duration-300">
              <FaRegShareSquare />
              <span>Share</span>
            </button>

            <button className="bg-red-500 hover:bg-transparent flex items-center gap-2 py-2 border-2 hover:text-black border-[#ffffff03] hover:border-red-600 px-7 rounded-md text-white transition-colors duration-300">
              <TbLogout className="text-xl" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
      <PostList listOfPins={listOfPins} />
    </>
  );
};

export default ProfilePage;
