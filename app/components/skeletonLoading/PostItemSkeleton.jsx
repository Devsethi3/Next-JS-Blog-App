const PostItemSkeleton = () => {
  return (
    <>
      <div className="p-2 bg-gray-100 rounded-md animate-pulse">
        <div className="h-80 w-full relative"></div>{" "}
        <h3 className="text-xl py-3 title font-semibold bg-gray-200 h-7 w-4/5"></h3>{" "}
        <p className="text-sm bg-gray-200 h-5 w-4/5"></p>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-gray-200 w-6 h-6"></div>{" "}
          <div className="bg-gray-200 w-24 h-5"></div>{" "}
        </div>
      </div>
    </>
  );
};

export default PostItemSkeleton;
