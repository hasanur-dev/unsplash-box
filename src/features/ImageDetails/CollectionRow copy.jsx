import { useMutation } from "@tanstack/react-query";
import { IoMdAdd } from "react-icons/io";
import { NavLink, useParams } from "react-router-dom";
import { addPhotoToCollection } from "../../services/apiUnsplash";
import { useUserContext } from "../../contexts/UserContext";
export default function CollectionRow({ collection }) {
  // console.log("collection", collection);
  const { user } = useUserContext();
  const { imageId } = useParams();
  const {
    id,
    cover_photo: {
      urls: { regular, small },
    },
    title,
    total_photos,
  } = collection;

  const { mutate, isPending } = useMutation({
    mutationFn: () => addPhotoToCollection(id, imageId, user),
    onSuccess: (data) => {
      console.log("success", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return (
    <div className="group flex cursor-pointer items-center gap-4 rounded-md p-2 pr-6 transition-colors duration-300 hover:bg-gray-transparent">
      <div className=" w-full ">
        <NavLink
          to={`/collections/${id}?name=${title}&total=${total_photos}`}
          className="flex items-center gap-4"
        >
          <div className={`h-16 w-16 overflow-hidden rounded-sm`}>
            <img src={small} alt="" className="h-full w-full object-cover" />
          </div>

          <div>
            <h3 className="">{title}</h3>
            <p className="text-sm font-thin">{total_photos} photos</p>
          </div>
        </NavLink>
      </div>
      <button
        onClick={mutate}
        className="flex items-center gap-2 transition-all duration-300 hover:gap-0 group-hover:opacity-100"
      >
        <IoMdAdd />
        Add
      </button>
    </div>
  );
}
