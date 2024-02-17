const FeatureSectionSkeleton = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 items-center gap-6 mt-[3rem]">
        <div className="img-container relative h-[450px] animate-pulse">
          <div className="bg-gray-300 w-full h-full rounded-md"></div>
        </div>
        <div className="content">
          <h1 className="animate-pulse text-5xl title mb-8 font-semibold">
            <span className="bg-gray-300 inline-block h-10 w-[80%] mb-4"></span>
            <span className="bg-gray-300 inline-block h-10 w-[80%] mb-4"></span>
          </h1>
          <p>
            <span className="bg-gray-300 inline-block h-5 w-2/3 mb-4"></span>
            <span className="bg-gray-300 inline-block h-5 w-2/3 mb-4"></span>
            <span className="bg-gray-300 inline-block h-5 w-2/3"></span>
          </p>
          <div className="mt-5 flex items-center gap-4">
            <div className="bg-gray-300 rounded-full w-14 h-14"></div>
            <div className="flex flex-col">
              <div className="bg-gray-300 h-5 w-32 mb-1"></div>
              <div className="bg-gray-300 h-5 w-44"></div>
            </div>
          </div>
          <button className="mt-[3rem] h-10 w-32 rounded-md bg-gray-300"></button>
        </div>
      </div>
    </>
  );
};

export default FeatureSectionSkeleton;
