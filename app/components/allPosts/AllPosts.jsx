"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RecentPosts from "../recentPosts/RecentPosts";
import Image from "next/image";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const AllPosts = ({ listOfPins }) => {
  const formatDate = (id) => {
    const date = new Date(parseInt(id));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPins = listOfPins.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="flex mt-5 items-center gap-10">
        <div className="flex-[6]">
          {currentPins.map((pin, index) => (
            <div key={index} className="flex-[6]">
              <div className="flex flex-col my-8 bg-gray-100 dark:bg-[#182442] p-5 rounded-md">
                <div className="grid grid-cols-2 gap-8">
                  <div className="relative w-[400px] h-[300px]">
                    <Image
                      className="rounded-md"
                      src={pin?.image}
                      fill
                      alt="post-image"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-6">
                      <span className="text-sm">{formatDate(pin.id)}</span>
                      <p className="text-xs py-1.5 px-5 bg-teal-600 text-white rounded-full">
                        {pin.category}
                      </p>
                    </div>
                    <h2 className="text-2xl font-semibold mt-6">
                      {truncateDescription(pin.title, 70)}
                    </h2>
                    <p className="mt-6 leading-tight">
                      {truncateDescription(pin.desc, 230)}
                    </p>
                    <button
                      onClick={() => router.push("/post/" + pin.id)}
                      className="mt-7 bg-teal-600 rounded-md py-2 px-6 text-white"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex cursor-pointer items-center justify-between">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 bg-indigo-600 text-white py-2 px-5 rounded-md"
            >
              <MdKeyboardDoubleArrowLeft className="text-xl" />
              <span>Prev</span>
            </button>
            <button
              onClick={handleNextPage}
              disabled={indexOfLastItem >= listOfPins.length}
              className="flex cursor-pointer items-center gap-2 bg-indigo-600 text-white py-2 px-5 rounded-md"
            >
              <span>Next</span>
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </button>
          </div>
        </div>
        <div className="flex-[2]">
          <RecentPosts />
        </div>
      </div>
    </>
  );
};

export default AllPosts;
