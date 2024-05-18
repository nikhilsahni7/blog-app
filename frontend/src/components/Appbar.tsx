// Updated Appbar component
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
      <Link
        to={"/blogs"}
        className="text-2xl font-bold text-white cursor-pointer hover:text-gray-300 transition duration-200"
      >
        Medium
      </Link>
      <div className="flex items-center space-x-4">
        <Link to={`/publish`}>
          <button
            type="button"
            className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 transition duration-200"
          >
            New
          </button>
        </Link>

        <Avatar size={"big"} name="Nikhil" />
      </div>
    </div>
  );
};
