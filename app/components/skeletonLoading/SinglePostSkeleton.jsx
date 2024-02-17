const SinglePostSkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
        <div className="text-center md:text-left animate-pulse">
          <div className="bg-gray-300 h-10 w-3/4 mb-6"></div>
          <div className="bg-gray-300 h-10 w-3/4 mb-6"></div>
          <div className="bg-gray-300 h-10 w-3/4 mb-6"></div>
          <div className="bg-gray-300 mt-12  rounded-full h-8 w-[30%]"></div>
          <div className="flex mt-20 items-center gap-[6rem]">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gray-300 w-14 h-14"></div>
              <div className="flex flex-col">
                <div className="bg-gray-300 h-6 w-24 mb-1"></div>
                <div className="bg-gray-300 h-4 w-20"></div>
              </div>
            </div>
            <div className="bg-gray-300 h-12 w-32"></div>
          </div>
          <div className="mt-20 flex items-center gap-5">
            <div className="flex flex-col items-center">
              <div className="bg-gray-300 rounded-full w-14 h-14"></div>
              <div className="bg-gray-300 h-4 w-12 mt-2"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-300 rounded-full w-14 h-14"></div>
              <div className="bg-gray-300 h-4 w-12 mt-2"></div>
            </div>
          </div>
        </div>
        <div className="relative z-[-10] w-full h-[80vh] animate-pulse">
          <div className="bg-gray-300 w-full h-full"></div>
        </div>
      </div>
    </>
  );
};

export default SinglePostSkeleton;
