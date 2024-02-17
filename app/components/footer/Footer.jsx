import { FaDribbble, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-100 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl py-12 my-8">
          <div className="flex justify-center text-teal-600 dark:text-teal-300">
            <h2 className="text-2xl font-bold">BLOGAPP</h2>
          </div>

          <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
            consequuntur amet culpa cum itaque neque.
          </p>

          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            <li>
              <a
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                href="#"
              >
                About
              </a>
            </li>

            <li>
              <a
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                href="#"
              >
                Careers
              </a>
            </li>

            <li>
              <a
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                href="#"
              >
                History
              </a>
            </li>

            <li>
              <a
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                href="#"
              >
                Services
              </a>
            </li>

            <li>
              <a
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                href="#"
              >
                Projects
              </a>
            </li>

            <li>
              <a
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                href="#"
              >
                Blog
              </a>
            </li>
          </ul>

          <ul className="mt-12 flex justify-center items-center gap-4 md:gap-8">
            <li>
              <FaFacebook className="text-5xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-gray-300 text-gray-800 p-3 transition-all ease-linear rounded-full" />
            </li>

            <li>
              <FaInstagram className="text-5xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-gray-300 text-gray-800 p-3 transition-all ease-linear rounded-full" />
            </li>

            <li>
              <FaTwitter className="text-5xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-gray-300 text-gray-800 p-3 transition-all ease-linear rounded-full" />
            </li>

            <li>
              <FaDribbble className="text-5xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-gray-300 text-gray-800 p-3 transition-all ease-linear rounded-full" />
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
