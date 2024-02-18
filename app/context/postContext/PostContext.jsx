"use client";
import { app } from "@/firebaseConfig";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

export const postContext = createContext();

export const usePostState = () => {
  return useContext(postContext);
};

export const PostContextProvider = ({ children }) => {
  const [listOfPins, setListOfPins] = useState([]);

  const db = getFirestore(app);

  useEffect(() => {
    getAllPins();
  }, []);

  const getAllPins = async () => {
    try {
      const q = query(collection(db, "blog-post"));
      const querySnapshot = await getDocs(q);
      const postData = querySnapshot.docs.map((doc) => doc.data());

      setListOfPins(postData);
    } catch (error) {
      console.error("Error fetching user pins:", error);
    }
  };

  return (
    <postContext.Provider value={{ listOfPins }}>
      {children}
    </postContext.Provider>
  );
};
