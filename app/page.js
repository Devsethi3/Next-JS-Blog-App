"use client";
import { useEffect, useState } from "react";
import HeroSection from "./components/heroSection/HeroSection";
import PostList from "./components/posts/PostList";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { app } from "@/firebaseConfig";

const page = () => {
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

      setListOfPins(pinsData);
    } catch (error) {
      console.error("Error fetching user pins:", error);
      setError(error);
    }
  };

  return (
    <div>
      <HeroSection />
      <PostList listOfPins={listOfPins} />
    </div>
  );
};

export default page;
