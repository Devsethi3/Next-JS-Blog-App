"use client"
import PostItem from "../components/posts/PostItem";
import { usePostState } from "../context/postContext/PostContext";

const BlogPage = () => {
  const { listOfPins } = usePostState();
  return (
    <>
    <h1 className="lg:text-3xl text-2xl font-bold mt-8 text-center bg-gradient-to-r from-transparent via-teal-600 py-3 text-white to-transparent">Explore All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {listOfPins.map((pin, index) => (
          <PostItem list={pin} key={index} />
        ))}
      </div>
    </>
  );
};

export default BlogPage;
