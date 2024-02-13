import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex items-center bg-gray-100 rounded-md py-2 px-4">
      <FaSearch className="text-gray-400 mr-3" />
      <input
        type="text"
        className="bg-transparent focus:outline-none flex-1"
        name="search"
        id="search"
        placeholder="Search Here..."
      />
    </div>
  );
};

export default SearchBar;
