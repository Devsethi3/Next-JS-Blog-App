"use client"
import PostItem from "../components/posts/PostItem";
import { usePostState } from "../context/postContext/PostContext";

const BlogPage = () => {
  const { listOfPins } = usePostState();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {listOfPins.map((pin, index) => (
          <PostItem list={pin} key={index} />
        ))}
      </div>
    </>
  );
};

export default BlogPage;
