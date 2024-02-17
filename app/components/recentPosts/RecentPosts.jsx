"use client";
import { usePostState } from "@/app/context/postContext/PostContext";
import Image from "next/image";

const RecentPosts = ({ number }) => {
  const { listOfPins } = usePostState();
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const recentPosts = listOfPins.slice(0, number);

  return (
    <>
      <div>
        <h1 className="text-3xl border-b-2 table-data pb-2 font-semibold opacity-80 mb-6">
          Recent Posts
        </h1>
        {recentPosts.map((pin, index) => (
          <div
            key={index}
            className="flex my-3 border-b-2 py-2 dark:border-gray-800 items-center gap-4"
          >
            <div className="relative w-[90px] h-[60px] rounded-full">
              <Image
                src={pin?.image}
                fill
                alt={pin?.title}
                className="rounded-full"
                objectFit="cover"
              />
            </div>
            <h4 className="text-lg leading-tight font-medium">
              {truncateDescription(pin?.title, 46)}
            </h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentPosts;
