"use client";

import { app, auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoadingSkeleton from "../components/userLoadingSkeleton/LoadingSkeleton";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import UploadImage from "../components/uploadImage/UploadImage";
import UserTag from "../components/userTag/UserTag";

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
            userName: user.displayName,
            email: user.email,
            userImage: user.photoURL,
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
      <div className="grid ggrid-cols-1 lg:grid-cols-2 gap-10 items-center mt-5">
        <UploadImage setFile={setFile} />
        <div className="">
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-gray-500">
              Give A Title To Your Subject :
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="input-field py-2 px-4 text-2xl rounded-md border-2 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none focus-visible:border-teal-600"
              placeholder="How rain affect me..."
            />
            <span className="text-gray-400 text-sm">
              It should not less than 15-20 words. It make blog understandable
            </span>
          </div>
          {isLoading ? (
            <div>
              <LoadingSkeleton />
            </div>
          ) : (
            <UserTag user={user} />
          )}
          <div className="flex flex-col mt-8 gap-1">
            <label htmlFor="title" className="text-gray-500">
              Blog Description :
            </label>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              rows={6}
              className="input-field py-2 px-4 resize-none text-lg rounded-md outline-none border-2 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
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
              className="input-field py-2 px-4 text-xl rounded-md border-2 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none focus-visible:border-teal-600"
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
