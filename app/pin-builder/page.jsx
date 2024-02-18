"use client";
import { app, auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import UploadImage from "../components/uploadImage/UploadImage";
import UserTag from "../components/userTag/UserTag";
import Modal from "../components/modal/Modal";
import UserPinBuilderSkeleton from "../components/skeletonLoading/UserPinBuilderSkeleton";

const CreatePost = () => {
  const db = getFirestore(app);
  const storage = getStorage(app);
  const router = useRouter();
  const postId = Date.now().toString();

  const [loading, setLoading] = useState(false);

  const [fieldsError, setFieldsError] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [file, setFile] = useState();
  const [category, setCategory] = useState();
  const [tags, setTags] = useState([]);
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
            category: tags.join(", "),
            authorId: user.uid, // <-- Here's the author's ID
            userName: user.displayName,
            email: user.email,
            userImage: user.photoURL,
          };
          await setDoc(doc(db, "blog-post", postId), postData).then(
            (response) => {
              setLoading(true);
              router.push("/" + user?.email);
            }
          );
        });
      });
  };

  const handleSave = () => {
    if (!title || !desc || !file || !link || tags.length === 0) {
      toggleModal();
      return;
    }

    setCategory(tags.join(", "));
    setLoading(true);
    uploadFile();
  };

  const handleCategory = () => {
    if (!category) {  
      <Modal text="At least save 1 category for your blog" theme="error" />;
      return;
    }
    if (!category.trim()) return;
    setTags((prevTags) => [...prevTags, category.trim()]);
    setCategory("");
  };

  const toggleModal = () => {
    setFieldsError(!fieldsError);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-5">
        <UploadImage setFile={setFile} />
        <div className="">
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-gray-500">
              Give A Title To Your Subject :
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="input-field py-2 px-4 text-xl lg:text-2xl rounded-md border-2 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none focus-visible:border-teal-600"
              placeholder="Their Impact on the Digital..."
            />
            <span className="text-gray-400 text-sm">
              It should not less than 15-20 words. It make blog understandable
            </span>
          </div>
          {isLoading ? (
            <div>
              <UserPinBuilderSkeleton />
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
              className="input-field py-2 px-4 resize-none text-normal lg:text-lg rounded-md outline-none border-2 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              placeholder="Why are they causing such a..."
            />
          </div>
          <div className="flex flex-col gap-1 mt-12">
            <label htmlFor="title" className="text-gray-500">
              Add Category to your blog
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-teal-600 flex items-center gap-3 text-white px-3 py-1 rounded-md"
                >
                  {tag}
                  <button
                    onClick={() =>
                      setTags((prevTags) =>
                        prevTags.filter((_, i) => i !== index)
                      )
                    }
                    className="text-red-200 font-bold text-xs hover:text-white focus:outline-none"
                  >
                    &#10005;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex w-[100%] items-center gap-2">
              <input
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                type="text"
                className="input-field py-2 category-input w-[85%] px-4 text-lg lg:text-xl rounded-md border-2 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none focus-visible:border-teal-600"
                placeholder="travel,food,fitness..."
              />
              <button
                onClick={handleCategory}
                className="bg-teal-600 category-btn w-[15%] px-5 text-white py-2.5 rounded-md"
              >
                Save
              </button>
            </div>
            <span className="text-gray-400 text-sm">
              Category related to your blog topic for better understanding
            </span>
          </div>
          <div className="flex flex-col gap-1 mt-10">
            <label htmlFor="title" className="text-gray-500">
              Add Link To The Subject
            </label>
            <input
              onChange={(e) => setLink(e.target.value)}
              type="text"
              className="input-field py-2 px-4 text-lg lg:text-xl rounded-md border-2 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none focus-visible:border-teal-600"
              placeholder="https://youtube.com"
            />
          </div>
        </div>
      </div>
      <div className="mb-24">
        <button
          onClick={handleSave}
          className="float-end py-2.5 px-8 rounded-md bg-teal-600 text-white my-8"
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>

      {fieldsError && (
        <Modal
          toggleModal={toggleModal}
          text="Please fill all the fields before publishing!"
          theme="error"
        />
      )}
    </>
  );
};

export default CreatePost;
