"use client";
import { usePostState } from "@/app/context/postContext/PostContext";
import { app } from "@/firebaseConfig";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const { listOfPins } = usePostState();
  const [title, setTitle] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const titles = listOfPins.map((pin) => pin.title);
    setTitle(titles);
  }, [listOfPins]);

  const filterPosts = async () => {
    const q = query(
      collection(db, "blog-post"),
      where("title", ">=", searchQuery)
    );
    const querySnapshot = await getDocs(q);
    const filteredPostsData = querySnapshot.docs.map((doc) => doc.data());
    setFilteredPosts(filteredPostsData);
  };

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
    <div className="flex items-center search-bar rounded-md py-2 px-4">
      <FaSearch className="text-gray-400 search-icon mr-3" />
      <input
        value={searchQuery}
        onChange={handleChange}
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
