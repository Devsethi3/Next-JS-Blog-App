"use client";
import { useEffect, useState } from "react";
import HeroSection from "./components/heroSection/HeroSection";
import PostList from "./components/posts/PostList";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { app } from "@/firebaseConfig";
import AllPosts from "./components/allPosts/AllPosts";
import LocomotiveScroll from "locomotive-scroll";

const Page = () => {
  const locomotiveScroll = new LocomotiveScroll();

  const [listOfPins, setListOfPins] = useState([]);

  const db = getFirestore(app);

  useEffect(() => {
    getAllPins();
  }, []);

  const getAllPins = async () => {
    try {
      const q = query(collection(db, "blog-post"));
      const querySnapshot = await getDocs(q);
      const pinsData = querySnapshot.docs.map((doc) => doc.data());
      setListOfPins(pinsData.slice(0, 4));
    } catch (error) {
      console.error("Error fetching user pins:", error);
    }
  };

  return (
    <div>
      <HeroSection />
      <h2 className="text-3xl dark:text-gray-200 border-b-2 dark:border-gray-700 pb-2 font-semibold text-gray-800 mt-20">
        Trending Posts By Users
      </h2>
      <PostList listOfPins={listOfPins} />
      <h2 className="text-3xl dark:text-gray-200 border-b-2 dark:border-gray-700 pb-2 font-semibold text-gray-800 mt-20">
        Explore More Posts
      </h2>
      <AllPosts />
    </div>
  );
};

export default Page;
