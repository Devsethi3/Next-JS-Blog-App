"use client";
import { app } from "@/firebaseConfig";
import { collection, getFirestore, query } from "firebase/firestore";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [postData, setPostData] = useState();
  const db = getFirestore(app);

  const filterPost = async (e) => {
    const value = e.target.value;
    const q = query(collection(db, "blog-post"));
    const querySnapshot = await getDocs(q);
    const pinsData = querySnapshot.docs.map((doc) => doc.data());
    setPostData(pinsData);

    const filteredPosts = pinsData.filter((postData) =>
      postData.title.toLowerCase().includes(value.toLowerCase())
    );
    return filteredPosts;
  };

  return (
    <div className="flex items-center search-bar rounded-md py-2 px-4">
      <FaSearch className="text-gray-400 search-icon mr-3" />
      <input
        onChange={filterPost}
        type="text"
        className="bg-transparent outline-none"
        name="search"
        id="search"
        placeholder="Search Here..."
      />
    </div>
  );
};

export default SearchBar;
