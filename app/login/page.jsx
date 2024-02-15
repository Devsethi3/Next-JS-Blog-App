"use client";
import { auth } from "@/firebaseConfig";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
    router.push("/");
  };

  const createUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      console.log("User created", userCredential.user);
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  return (
    <>
      <section className="">
        <div className="">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"></aside>

          <main className="flex items-center justify-center lg:col-span-7 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-12 login-heading text-center text-3xl font-bold sm:text-3xl md:text-4xl">
                Welcome to Name Lorem
              </h1>

              <p className="mt-4 text-center leading-relaxed text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem saepe natus <br />{" "}
                <p className="login-text">
                  tempore iure a necessitatibus veritatis, iste doloremque!
                  Voluptate, quo.
                </p>
              </p>

              <div>
                <button
                  onClick={signInWithGoogle}
                  className="flex w-full input-field justify-center py-2 mt-4 rounded-md items-center gap-3"
                >
                  <FcGoogle className="text-xl" />
                  <span>Login With Google</span>
                </button>
              </div>

              <form action="#" className="mt-10 grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block font-medium text-gray-700"
                  >
                    {" "}
                    Email{" "}
                  </label>

                  <input
                    placeholder="example@gmail.com"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    id="Email"
                    name="email"
                    className="mt-1 w-full rounded-md input-field py-2 border-2 border-transparent px-4 outline-none focus-visible:border-2 focus-visible:border-cyan-400 "
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Password"
                    className="block font-medium text-gray-700"
                  >
                    {" "}
                    Password{" "}
                  </label>

                  <input
                    placeholder="At Least 6 digits"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    id="Password"
                    name="password"
                    className="mt-1 w-full rounded-md input-field py-2 border-2 border-transparent px-4 outline-none focus-visible:border-2 focus-visible:border-cyan-400  "
                  />
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="MarketingAccept"
                    className="flex gap-4 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />

                    <span className="text-gray-600 text-sm">
                      I want to receive emails about events, product updates and
                      company announcements.
                    </span>
                  </label>
                </div>

                <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" className="text-gray-700 underline">
                      {" "}
                      terms and conditions{" "}
                    </a>
                    and
                    <a href="#" className="text-gray-700 underline">
                      privacy policy
                    </a>
                    .
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    onClick={createUser}
                    className="inline-block shrink-0 rounded-md border-2 border-teal-600 bg-teal-600 px-8 py-2.5 font-medium text-white transition hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-teal-500"
                  >
                    Create an account
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <a href="#" className="text-gray-700 underline">
                      Log in
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
