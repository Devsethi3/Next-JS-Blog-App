"use client";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

const LikePost = ({ postId }) => {
  const [like, setLike] = useState(0);

  useEffect(() => {
    // Retrieve like data from localStorage on component mount
    const storedLike = localStorage.getItem(`like_${postId}`);
    if (storedLike) {
      setLike(parseInt(storedLike, 10));
    }
  }, [postId]);

  const handleLike = () => {
    const newLike = like === 1 ? 0 : 1;
    setLike(newLike);
    // Update like data in localStorage for this specific post
    localStorage.setItem(`like_${postId}`, newLike.toString());
  };

  return (
    <div>
      <div onClick={handleLike} className="flex flex-col items-center">
        <FaHeart
          className={`text-[3.2rem] p-3 hover:bg-gray-100 ${
            like ? "text-red-500" : null
          } cursor-pointer rounded-md`}
        />
        <span className="mt-[-5px] text-sm text-gray-700">Like({like})</span>
      </div>
    </div>
  );
};

export default LikePost;
