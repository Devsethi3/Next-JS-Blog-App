import { IoMdAddCircleOutline } from "react-icons/io";

const Button = ({ data }) => {
  return (
    <button
      onClick={() => router.push("/pin-builder")}
      className="rounded-md flex items-center gap-2 hover:bg-teal-600 hover:text-white transition-all px-5 py-2 border-2 border-teal-600 font-medium shadow"
    >
      <span>{data}</span>
      <IoMdAddCircleOutline className="text-xl" />
    </button>
  );
};

export default Button;
