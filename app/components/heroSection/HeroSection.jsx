"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaBook } from "react-icons/fa";
import FeatureSectionSkeleton from "../skeletonLoading/FeatureSectionSkeleton";
import { useRouter } from "next/navigation";

const Featured = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-[2rem] featured">
      <h1 className="text-7xl home-text">
        <span className="font-bold">Hey, Dev Sethi Here!</span> Discover my stories, thoughts and
        creative ideas
      </h1>
      {!isLoading ? (
        <div className="grid lg:grid-cols-2 md:grid-cols-1 items-center gap-6 mt-[3rem]">
          <div className="img-container relative  h-[350px] lg:h-[450px]">
            <Image
              objectFit="cover"
              src="/images/culture.png"
              className="image rounded-md"
              fill
            />
          </div>
          <div className="content">
            <h1 className="text-5xl hero-text title mb-8 font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
              voluptatem et aperiam doloribus eveniet rem minus architecto
              recusandae ratione in obcaecati placeat nemo accusantium illo,
              asperiores fugiat pariatur quae ipsa! Officia perferendis vel
              porro repellat neque dolorem velit earum architecto voluptates
              cumque, dignissimos, id exercitationem tenetur sequi sed pariatur
              incidunt? Ex itaque quidem distinctio asperiores impedit? Rem cum
              doloremque sed ducimus ipsum consequatur dignissimos.
            </p>
            <button
              onClick={() => router.push("/about")}
              className="bg-teal-600 mt-8 hover:bg-transparent flex items-center gap-2 py-2 border-2 hover:text-teal-500 border-[#ffffff03] hover:border-teal-700 px-7 rounded-md text-white transition-colors duration-300"
            >
              <FaBook className="text-xl" />
              <span>Read More</span>
            </button>
          </div>
        </div>
      ) : (
        <FeatureSectionSkeleton />
      )}
    </div>
  );
};

export default Featured;
