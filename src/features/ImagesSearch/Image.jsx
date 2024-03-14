import { NavLink, useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
export default function Image({ image }) {
  const navigate = useNavigate();

  const {
    id,
    alt_description: userAlt,
    urls: { regular },
    user: { name, profile_image },
  } = image;

  const handleClick = (e) => {
    e.preventDefault();
    console.log("hello");
    navigate(`?modal=addToCollection&imageId=${id}`);
  };

  return (
    <NavLink to={`/home/image/${id}`}>
      <div className=" group relative overflow-hidden rounded-sm hover:cursor-zoom-in">
        <img
          src={regular}
          alt={userAlt}
          className="transition-all duration-150 group-hover:brightness-[80%]"
        />

        <div className="absolute -bottom-14 flex w-full  items-center gap-2 bg-gray-transparent/40 py-3 pl-3 backdrop-blur-sm transition-all  duration-150 group-hover:bottom-0">
          <img className="rounded-full " src={profile_image.small} alt={name} />
          <span className="text-gray-very-light">{name}</span>
        </div>

        <div className="absolute right-3 top-3 flex -translate-y-14 items-center gap-2 transition-transform duration-150 group-hover:translate-y-0">
          <button
            onClick={handleClick}
            className="rounded-[4px] bg-gray-very-light px-3 py-2 text-xl text-gray-transparent transition-colors duration-150 hover:bg-white hover:text-gray-dark"
          >
            <IoMdAdd />
          </button>
        </div>
      </div>
    </NavLink>
  );
}
