"use client";
import { app } from "@/firebaseConfig";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

// Create the context
export const postContext = createContext();

// Custom hook to consume the post context
export const usePostState = () => {
  return useContext(postContext);
};

// Provider component to manage post data state
export const PostContextProvider = ({ children }) => {
  // State to hold the fetched post data
  const [listOfPins, setListOfPins] = useState([]);

  // Firestore database instance
  const db = getFirestore(app);

  // Fetch post data from Firestore on component mount
  useEffect(() => {
    getAllPins();
  }, []);

  // Function to fetch all posts from Firestore
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

  // Provide the post context to its children
  return (
    <postContext.Provider value={{ listOfPins }}>
      {children}
    </postContext.Provider>
  );
};
