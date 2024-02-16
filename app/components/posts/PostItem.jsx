import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaShareSquare } from "react-icons/fa";

const PostItem = ({ list }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    await navigator.share({
      title: document.title,
      url: window.location.href,
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="p-2 bg-gray-100 rounded-md animate-pulse">
          <div className="h-80 w-full relative"></div>{" "}
          <h3 className="text-xl py-3 title font-semibold bg-gray-200 h-7 w-4/5"></h3>{" "}
          <p className="text-sm bg-gray-200 h-5 w-4/5"></p>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gray-200 w-6 h-6"></div>{" "}
            <div className="bg-gray-200 w-24 h-5"></div>{" "}
          </div>
        </div>
      ) : (
        <div className="p-2 singlepost-bg rounded-md">
          <div>
            <Image
              onClick={() => router.push("/post/" + list.id)}
              src={list?.image}
              width={500}
              height={500}
              alt="post"
              className="rounded-md cursor-pointer relative"
            />
            <h3 className="text-2xl pt-3 title font-semibold">
              {truncateDescription(list.title, 20)}
            </h3>
            <p className="text-sm leading-tight py-3">
              {truncateDescription(list.desc, 80)}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Image
                  src={list?.userImage}
                  width={25}
                  height={25}
                  alt="userImage"
                  className="rounded-full"
                />
                <div>
                  <h4 className="single-post-name text-sm font-semibold">
                    {list.userName}
                  </h4>
                </div>
              </div>
              <div onClick={handleShare} className="flex flex-col items-center">
                <FaShareSquare className="text-[3rem] p-3 text-teal-600 post-action cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostItem;
