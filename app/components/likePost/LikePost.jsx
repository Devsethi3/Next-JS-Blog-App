"use client";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const LikePost = ({ postId }) => {
  const [like, setLike] = useState(0);

  useEffect(() => {
    const storedLike = localStorage.getItem(`like_${postId}`);
    if (storedLike) {
      setLike(parseInt(storedLike, 10));
    }
  }, [postId]);

  const handleLike = () => {
    const newLike = like === 1 ? 0 : 1;
    setLike(newLike);
    localStorage.setItem(`like_${postId}`, newLike.toString());
  };

  return (
    <div>
      <motion.div
        whileTap={{ scale: .9 }}
        onClick={handleLike}
        className="flex cursor-pointer flex-col items-center"
      >
        <FaHeart
          className={`text-[3.2rem] p-3 ${
            like ? "text-red-500" : null
          } rounded-md`}
        />
        <span className="mt-[-5px] text-sm post-action-text">Like({like})</span>
      </motion.div>
    </div>
  );
};

export default LikePost;
