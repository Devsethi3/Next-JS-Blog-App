"use client";
import { app, auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { FaShareSquare } from "react-icons/fa";
import LikePost from "@/app/components/likePost/LikePost";

const SinglePostPage = ({ params }) => {
  const db = getFirestore(app);
  const [postId, setPostId] = useState();
  const [postDetail, setPostDetail] = useState([]);
  const [user, setUser] = useState();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPostId(params.postId);

    const getPinDetail = async () => {
      const docRef = doc(db, "blog-post", params.postId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPostDetail(docSnap.data());
        setIsLoading(false);
      } else {
        console.log("No such document!");
      }
    };

    getPinDetail();
  }, [params.postId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const createdAtDate = new Date(parseInt(postId)).toLocaleDateString();

  const handleGoBack = () => {
    router.back();
  };

  const handleShare = async () => {
    await navigator.share({
      title: document.title,
      url: window.location.href,
    });
  };

  const SinglePostSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
      <div className="text-center md:text-left animate-pulse">
        <div className="bg-gray-300 h-10 w-3/4 mb-6"></div>
        <div className="flex mt-20 items-center gap-2">
          <div className="rounded-full bg-gray-300 w-14 h-14"></div>
          <div className="flex flex-col">
            <div className="bg-gray-300 h-6 w-24 mb-1"></div>
            <div className="bg-gray-300 h-4 w-20"></div>
          </div>
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
  );
  

  return (
    <>
      <div onClick={handleGoBack}>
        <FaArrowLeftLong className="text-5xl p-3 cursor-pointer text-gray-800 rounded-full hover:bg-gray-100" />
      </div>
      {isLoading ? (
        <SinglePostSkeleton />
      ) : postDetail ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
            <div className="text-center md:text-left">
              <h1 className="text-5xl leading-[3.3rem] text-gray-800 font-bold">
                {postDetail.title}
              </h1>
              <div className="flex mt-20 items-center gap-2">
                <Image
                  className="rounded-full"
                  src={user?.photoURL}
                  width={50}
                  height={50}
                  alt="user"
                />
                <div className="flex flex-col">
                  <p className="text-xl font-medium">{user?.displayName}</p>
                  <span className="mt-[-5px]">{createdAtDate}</span>
                </div>
              </div>
              <div className="mt-16 flex items-center gap-5">
                <LikePost postId={postId} />
                <div
                  onClick={handleShare}
                  className="flex flex-col items-center"
                >
                  <FaShareSquare className="text-[3.2rem] p-3 hover:bg-gray-100 cursor-pointer rounded-md" />
                  <span className="mt-[-5px] text-sm text-gray-700">Share</span>
                </div>
              </div>
            </div>
            <div className="relative z-[-10] w-full h-[80vh]">
              <Image
                src={postDetail?.image}
                layout="fill"
                objectFit="cover"
                alt={postDetail?.title}
              />
            </div>
          </div>
          <div className="flex items-center gap-10 mt-16">
            <div className="flex-[6] ">
              <p className="text-justify text-xl">{postDetail?.desc}</p>
              <p>{postDetail.desc}</p>
              <p>{postDetail.desc}</p>
            </div>
            <h1 className="flex-[2]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              consequatur similique enim voluptates dignissimos sed quibusdam
              iste asperiores quia magni deserunt voluptate veniam praesentium,
              quam vitae cum nobis corrupti cumque!
            </h1>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SinglePostPage;
