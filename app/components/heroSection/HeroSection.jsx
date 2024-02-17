"use client";
import { app } from "@/firebaseConfig";
import { collection, doc, getFirestore, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import UserTag from "../userTag/UserTag";
import { FaBook } from "react-icons/fa";
import FeatureSectionSkeleton from "../skeletonLoading/FeatureSectionSkeleton";
import { useUserState } from "@/app/context/userContext/UserContext";

const Featured = () => {
  const db = getFirestore(app);
  const { user } = useUserState();
  const [pinPost, setPinPost] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserPins();
  }, []);

  const getUserPins = async () => {
    try {
      const docRef = doc(collection(db, "blog-post"), "1708158602381");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const pinData = docSnap.data();
        setPinPost(pinData);
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

  console.log(pinPost);

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
              <div className="mt-5 flex items-center gap-2">
                <Image
                  className="rounded-full cursor-pointer p-2 profile-picture"
                  src={pinPost?.userImage}
                  width={54}
                  height={54}
                  alt="user"
                />
                <div className="flex flex-col">
                  <p className="opacity-70 font-medium">{pinPost?.userName}</p>
                  <span className="text-sm text-gray-600 mt-[-3px]">
                    {pinPost?.email}
                  </span>
                </div>
              </div>
              <button className="bg-teal-600 mt-8 hover:bg-transparent flex items-center gap-2 py-2 border-2 hover:text-teal-500 border-[#ffffff03] hover:border-teal-700 px-7 rounded-md text-white transition-colors duration-300">
                <FaBook className="text-xl" />
                <span>Read More</span>
              </button>
            </div>
          </>
        </div>
      ) : (
        <FeatureSectionSkeleton />
      )}
    </div>
  );
};

export default Featured;
