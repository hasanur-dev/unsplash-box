import { useNavigate, useParams } from "react-router-dom";
import { useQueryContext } from "../contexts/QueryContext";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";

export default function Search({ defaultValue }) {
  // const { imageQuery } = useParams();

  const navigate = useNavigate();
  // const { searchQuery, setSearchQuery } = useQueryContext();
  const [searchQuery, setSearchQuery] = useState();
  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(searchQuery);
    navigate(`/home/images/${searchQuery}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full max-w-[530px]"
    >
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-gray-very-light bg-white px-6 py-4 placeholder-gray-medium/70 shadow-sm transition-colors duration-300 focus:outline-none dark:border-gray-very-light/10 dark:bg-gray-transparent"
        placeholder="Enter your keywords..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer text-2xl">
        <IoSearchOutline className="text-gray-medium/40" />
      </button>
    </form>
  );
}
