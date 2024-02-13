"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="grid place-items-center mt-12">
        <Image
          src={user?.photoURL}
          width={180}
          height={180}
          alt="user-image"
          className="rounded-full"
        />
      </div>
    </>
  );
};

export default ProfilePage;
