"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegShareSquare } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import PostList from "../components/posts/PostList";
import ProfileSkeleton from "../components/skeletonLoading/ProfileSkeleton";
import { useUserState } from "../context/userContext/UserContext";

const ProfilePage = () => {
  const db = getFirestore();
  const { user } = useUserState();

  const [isLoading, setIsLoading] = useState(true);
  const [listOfPins, setListOfPins] = useState([]);

  useEffect(() => {
    if (user?.email) {
      getUserPins();
    }
  }, [user]);

  const getUserPins = async () => {
    try {
      if (!user?.email) {
        return;
      }

      const q = query(
        collection(db, "blog-post"),
        where("email", "==", user.email)
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
            <button className="bg-indigo-600 flex items-center gap-2 py-2.5 px-7 rounded-md text-white transition-colors hover:bg-indigo-700 duration-300">
              <FaRegShareSquare />
              <span>Share</span>
            </button>

            <button className="bg-red-500 flex items-center gap-2 py-2.5 px-7 rounded-md text-white transition-colors hover:bg-red-600 duration-300">
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
