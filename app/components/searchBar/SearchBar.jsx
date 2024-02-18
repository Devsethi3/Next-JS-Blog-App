"use client";
import { usePostState } from "@/app/context/postContext/PostContext";
import { app } from "@/firebaseConfig";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const { listOfPins } = usePostState();
  const [title, setTitle] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const db = getFirestore(app);

  const filterPosts = async () => {
    const q = query(
      collection(db, "blog-post"),
      where("title", ">=", searchQuery)
    );
    const querySnapshot = await getDocs(q);
    const filteredPostsData = querySnapshot.docs.map((doc) => doc.data());
    setFilteredPosts(filteredPostsData);
  };

  useEffect(() => {
    const titles = listOfPins.map((pin) => pin.title);
    setTitle(titles);
  }, [listOfPins, filterPosts]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      filterPosts();
    } else {
      setFilteredPosts([]);
    }
  }, [searchQuery]);

  return (
    <div className="flex items-center bg-gray-100 rounded-md dark:bg-[#18233e] px-4 py-2 w-[150px] lg:w-[300px]">
      <FaSearch className="text-gray-500 lg:mr-3 mr-0" />
      <input
        value={searchQuery}
        onChange={handleChange}
        type="text"
        className="bg-transparent outline-none"
        name="search"
        id="search"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
