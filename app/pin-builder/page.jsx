"use client";

import { app, auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoadingSkeleton from "../components/userLoadingSkeleton/LoadingSkeleton";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const db = getFirestore(app);
  const storage = getStorage(app);
  const router = useRouter();
  const postId = Date.now().toString();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [link, setLink] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const uploadFile = () => {
    const storageRef = ref(storage, "posts/" + file.name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("File Uploaded");
      })
      .then((res) => {
        getDownloadURL(storageRef).then(async (url) => {
          console.log("Download url", url);
          const postData = {
            id: postId,
            title: title,
            desc: desc,
            link: link,
            image: url,
            userName: session.user.name,
            email: session.user.email,
            userImage: session.user.image,
          };
          await setDoc(doc(db, "blog-post", postId), postData).then(
            (response) => {
              router.push("/" + user.email);
            }
          );
        });
      });
  };

  const handleSave = () => {
    if (!title || !desc || !link || !file) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    uploadFile();
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-10 items-center mt-5">
        <div className="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-[78vh] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#e2ffec] hover:bg-[#d8ffe6]"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-[80px] h-[80px] text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-xl text-gray-500 mt-4 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
        </div>
        <div className="">
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-gray-500">
              Give A Title To Your Subject :
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="bg-gray-100 py-2 px-4 text-2xl rounded-md border-2 border-gray-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none focus-visible:border-teal-600"
              placeholder="How rain affect me..."
            />
            <span className="text-gray-400 text-sm">
              It should not exceed the word limit of 15-20. It may affect your
              post.
            </span>
          </div>
          {isLoading ? (
            <div>
              <LoadingSkeleton />
            </div>
          ) : (
            <div className="mt-5 flex items-center gap-2">
              <Image
                className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
                src={user?.photoURL}
                width={54}
                height={54}
                alt="user"
              />
              <div className="flex flex-col">
                <p className="text-gray-800">{user?.displayName}</p>
                <span className="text-sm text-gray-600 mt-[-3px]">
                  {user?.email}
                </span>
              </div>
            </div>
          )}
          <div className="flex flex-col mt-8 gap-1">
            <label htmlFor="title" className="text-gray-500">
              Blog Description :
            </label>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              rows={6}
              className="bg-gray-100 py-2 px-4 resize-none text-lg rounded-md outline-none border-2 border-gray-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              placeholder="This is how I make this beautiful..."
            />
          </div>
          <div className="flex flex-col gap-1 mt-12">
            <label htmlFor="title" className="text-gray-500">
              Add Link To The Subject
            </label>
            <input
              onChange={(e) => setLink(e.target.value)}
              type="text"
              className="bg-gray-100 py-2 px-4 text-2xl rounded-md border-2 border-gray-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none focus-visible:border-teal-600"
              placeholder="https://youtube.com"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="float-end py-2.5 px-8 rounded-md bg-teal-600 text-white my-8"
      >
        Publish
      </button>
    </>
  );
};

export default CreatePost;
