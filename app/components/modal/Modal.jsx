import { motion } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ text, theme, toggleModal }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`${
          theme === "error" ? "bg-red-600" : "bg-teal-500"
        } rounded-md text-white lg:py-4 px-6 lg:px-10 py-2 fixed top-[10%] lg:left-[40%] md:left-[0]`}
      >
        <div className="flex items-center justify-between">
          <p className="lg:text-normal text-sm">{text}</p>
          <RiCloseLine
            onClick={toggleModal}
            className="text-4xl hover:bg-red-500 rounded-full p-2 font-bold cursor-pointer"
          />
        </div>
      </motion.div>
    </>
  );
};

export default Modal;
