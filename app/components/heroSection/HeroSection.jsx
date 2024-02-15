"use client";
import { app, auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getFirestore, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import UserTag from "../userTag/UserTag";
import { FaBook } from "react-icons/fa";

const Featured = () => {
  const db = getFirestore(app);
  const [pinPost, setPinPost] = useState(null); // Initialize pinPost state with null

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getUserPins();
  }, []);

  const getUserPins = async () => {
    try {
      const docRef = doc(collection(db, "blog-post"), "1707983476964");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const pinData = docSnap.data();
        setPinPost(pinData); // Set the pinPost state with retrieved data
        setIsLoading(false);
      } else {
        console.error("No such document exists!");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user pin:", error);
      setIsLoading(false);
    }
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const FeaturedSkeleton = () => (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 items-center gap-6 mt-[3rem]">
      <div className="img-container relative h-[450px] animate-pulse">
        <div className="bg-gray-300 w-full h-full rounded-md"></div>
      </div>
      <div className="content">
        <h1 className="animate-pulse text-5xl title mb-8 font-semibold">
          <span className="bg-gray-300 inline-block h-12 w-96 mb-4"></span>
        </h1>
        <p>
          <span className="bg-gray-300 inline-block h-5 w-96 mb-4"></span>
          <span className="bg-gray-300 inline-block h-5 w-96 mb-4"></span>
          <span className="bg-gray-300 inline-block h-5 w-96"></span>
        </p>
        <div className="mt-5 flex items-center gap-2">
          <div className="bg-gray-300 rounded-full w-14 h-14"></div>
          <div className="flex flex-col">
            <div className="bg-gray-300 h-5 w-32 mb-1"></div>
            <div className="bg-gray-300 h-5 w-44"></div>
          </div>
        </div>
        <button className="mt-[3rem] px-5 py-2 rounded-md bg-gray-300 hover:bg-gray-400"></button>
      </div>
    </div>
  );

  return (
    <div className="my-[2rem] featured">
      <h1 className="text-7xl home-text">
        <strong>Hey, Dev Sethi Here!</strong> Discover my stories, thoughts and
        creative ideas
      </h1>
      {pinPost ? (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 items-center gap-6 mt-[3rem]">
          <>
            <div className="img-container relative h-[450px]">
              <Image
                objectFit="cover"
                src={pinPost.image}
                className="image rounded-md"
                fill
              />
            </div>
            <div className="content">
              <h1 className="text-5xl hero-text title mb-8 font-semibold">
                {truncateDescription(pinPost.title, 70)}
              </h1>
              <p>{truncateDescription(pinPost.desc, 300)}</p>
              <UserTag user={user} />
              <button className="bg-teal-600 mt-8 hover:bg-transparent flex items-center gap-2 py-2 border-2 hover:text-teal-500 border-[#ffffff03] hover:border-teal-700 px-7 rounded-md text-white transition-colors duration-300">
                <FaBook className="text-xl" />
                <span>Read More</span>
              </button>
            </div>
          </>
        </div>
      ) : (
        <FeaturedSkeleton />
      )}
    </div>
  );
};

export default Featured;

//1707983476964
