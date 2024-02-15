import PostItem from "./PostItem";

const PostList = ({ listOfPins }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-10">
      {listOfPins.map((list, index) => (
        <PostItem key={index} list={list} />
      ))}
    </div>
  );
};

export default PostList;
