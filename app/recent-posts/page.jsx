"use client";
import { app, auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUserState } from "../context/userContext/UserContext";

const RecentPostPage = () => {
  const { user } = useUserState();

  // useEffect(() => {
  //   if (user?.email) {
  //     getUserPins();
  //   }
  // }, [user]);

  // const getUserPins = async () => {
  //   try {
  //     const q = query(collection(db, "blog-post"));
  //     const querySnapshot = await getDocs(q);
  //     const pinsData = querySnapshot.docs.map((doc) => doc.data());
  //     setListOfPins(pinsData);
  //   } catch (error) {
  //     console.error("Error fetching user pins:", error);
  //   }
  // };

  return (
    <>
      <div className="mt-5">
        <h1 className="text-center text-3xl text-gray-700 border-b-2 border-teal-600 pb-2 my-8 font-semibold">
          Explore Recent Posts
        </h1>
        <table className="w-full">
          {/* <tr className="border-2">
            <td className="border-2 w-20 py-2 px-3 bg-gray-100">S.No.</td>
            <td className="border-2 py-2 px-3 bg-gray-100">Title</td>
            <td className="border-2 py-2 px-3 bg-gray-100">Desc</td>
            <td className="border-2 py-2 px-3 bg-gray-100">Post By</td>
            <td className="border-2 py-2 px-3 bg-gray-100">Created Date</td>
          </tr>
          <tr>
            <td className="border-2 py-2 px-3">1</td>
            <td className="border-2 py-2 px-3">Title</td>
            <td className="border-2 py-2 px-3">Desc</td>
            <td className="border-2 py-2 px-3">Post By</td>
            <td className="border-2 py-2 px-3">20/10/2024</td>
          </tr> */}
        </table>
      </div>
    </>
  );
};

export default RecentPostPage;
