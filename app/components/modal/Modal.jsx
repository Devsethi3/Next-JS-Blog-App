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
        } rounded-md text-white py-4 px-10 fixed top-[10%] left-[40%]`}
      >
        <div className="flex items-center justify-between">
          <p>{text}</p>
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
