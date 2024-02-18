"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineArrowOutward } from "react-icons/md";

const AboutPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 items-center gap-6 mt-[3rem]">
        <div className="img-container relative h-[300px] lg:h-[450px]">
          <Image
            objectFit="cover"
            src="/images/culture.png"
            className="image rounded-md"
            fill
            alt="about"
          />
        </div>
        <div>
          <h1 className="text-3xl lg:text-5xl title mb-8 font-semibold">
            Discover Blogs: Your Gateway to Inspiring Content and Community
            Engagement
          </h1>
          <p>
            Welcome to <span className="italic text-teal-500">Lumina</span>,
            where inspiration meets community! Our platform is designed to
            empower users to explore, engage, and connect through a diverse
            range of content and conversations. Whether you're seeking
            insightful articles, captivating visuals, or meaningful discussions,{" "}
            <span className="italic text-teal-500">Lumina</span> has something
            for everyone. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Explicabo, recusandae.
          </p>
          <button
            onClick={() => router.push("/blogs")}
            className="bg-teal-600 flex items-center gap-2 hover:bg-teal-700 mt-10 py-2 px-6 rounded-md font-medium text-white"
          >
            <span>Explore Blogs</span>
            <MdOutlineArrowOutward className="text-xl font-bold" />
          </button>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default AboutPage;
