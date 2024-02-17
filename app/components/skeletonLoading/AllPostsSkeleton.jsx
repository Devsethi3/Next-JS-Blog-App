import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const AllPostsSkeleton = () => {
  return (
    <>
      <div className="flex mt-5 items-center flex-col lg:flex-row gap-14">
        <div className="flex-[6]">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex-[6]">
              <div className="flex flex-col w-[350px] lg:w-[900px] my-8 bg-gray-100 dark:bg-[#182442] p-5 rounded-md">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="relative w-[300px] lg:w-[400px] h-[300px] bg-gray-300 animate-pulse rounded-md"></div>
                  <div>
                    <div className="flex items-center gap-6">
                      <span className="text-sm bg-gray-300 inline-block h-5 w-20 rounded-full"></span>
                      <p className="text-xs py-1.5 px-5 bg-gray-300 text-white rounded-full">
                        {"Placeholder"}
                      </p>
                    </div>
                    <h2 className="text-2xl font-semibold mt-6 bg-gray-300 h-10 rounded-md"></h2>
                    <p className="mt-6 leading-tight bg-gray-300 h-20 rounded-md"></p>
                    <button className="mt-7 bg-gray-300 rounded-md py-2 px-6 text-gray-300 cursor-not-allowed"></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between mt-8">
            <button className="flex items-center gap-2 bg-gray-300 text-gray-300 py-2 px-5 rounded-md cursor-not-allowed">
              <MdKeyboardDoubleArrowLeft className="text-xl" />
              <span>{"Prev"}</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-300 text-gray-300 py-2 px-5 rounded-md cursor-not-allowed">
              <span>{"Next"}</span>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </button>
          </div>
        </div>
        <div className="flex-[2]">
          {/* Placeholder for RecentPosts */}
          <div className="my-8 w-[300px] lg:w-[500px] bg-gray-100 dark:bg-[#182442] p-5 rounded-md animate-pulse">
            <h2 className="text-lg font-semibold bg-gray-300 h-8 rounded-md"></h2>
            <div className="mt-4 space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-gray-300 w-12 h-12 rounded-full"></div>
                  <div className="flex-1 bg-gray-300 h-6 rounded-md"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPostsSkeleton;
