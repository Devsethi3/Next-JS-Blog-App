const LoadingSkeleton = () => {
  return (
    <>
      <div className="animate-pulse flex items-center gap-2 mt-5">
        <div className="rounded-full bg-gray-300 w-12 h-12"></div>
        <div className="flex flex-col">
          <div className="bg-gray-300 h-4 w-32 rounded"></div>
          <div className="bg-gray-300 h-3 w-24 mt-1 rounded"></div>
        </div>
      </div>
    </>
  );
};

export default LoadingSkeleton;
