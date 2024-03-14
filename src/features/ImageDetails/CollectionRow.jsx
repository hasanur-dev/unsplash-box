import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IoMdAdd } from "react-icons/io";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import {
  addPhotoToCollection,
  getCollectionPhotos,
  removePhotoFromCollection,
} from "../../services/apiUnsplash";
import { useUserContext } from "../../contexts/UserContext";
import toast from "react-hot-toast";
import SpinnerTwo from "../../ui/SpinnerTwo";
import { IoRemove } from "react-icons/io5";
export default function CollectionRow({ collection }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const imageId = searchParams.get("imageId");
  // console.log("collection", collection);
  const { user } = useUserContext();
  const { imageId: imageIdParam } = useParams();
  const finalImageId = imageId || imageIdParam;
  const { id: collectionId, title, total_photos, preview_photos } = collection;
  console.log("imageId", finalImageId);
  const { data, isFetching } = useQuery({
    queryKey: ["collectionImages", collectionId],
    queryFn: () =>
      getCollectionPhotos({
        collectionId,
        pageParam: 1,
        perPage: total_photos,
        user,
      }),
  });
  // console.log(title, data?.images);
  const queryClient = useQueryClient();

  const { mutate: addPhoto, isPending: isAdding } = useMutation({
    mutationFn: () => addPhotoToCollection(collectionId, finalImageId, user),

    onSuccess: (data) => {
      console.log("success", data);
      toast.success("Photo added to collection successfully");
      queryClient.setQueryData(["personalCollections"], (dataOld) => {
        console.log(dataOld);
        const filtered = dataOld.filter(
          (collection) => collection.id !== data.collection.id,
        );
        filtered.unshift(data.collection);

        return filtered;
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  const { mutate: removePhoto, isPending: isRemoving } = useMutation({
    mutationFn: () =>
      removePhotoFromCollection(collectionId, finalImageId, user),

    onSuccess: (data) => {
      console.log("success", data);
      toast.success("Photo removed from collection successfully");

      queryClient.setQueryData(["personalCollections"], (dataOld) => {
        console.log(dataOld);
        const filtered = dataOld.filter(
          (collection) => collection.id !== data.collection.id,
        );
        filtered.unshift(data.collection);

        return filtered;
      });

      // queryClient.invalidateQueries({
      //   queryKey: ["personalCollections"],
      // });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const isInCollection = data?.images.some(
    (image) => image.id === finalImageId,
  );
  console.log(title, isInCollection);
  // console.log(preview_photos?.at(0).urls.small);

  return (
    <div className="group flex cursor-pointer items-center  rounded-md p-2 pr-6 transition-colors duration-300 hover:bg-gray-light dark:hover:bg-gray-transparent">
      <div className="w-full ">
        <NavLink
          to={`/collections/${collectionId}?name=${title}&total=${total_photos}`}
          className="flex items-center gap-4"
        >
          <div className={`h-16 w-16 overflow-hidden rounded-sm`}>
            <img
              src={preview_photos?.at(0).urls.small}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm font-normal">{total_photos} photos</p>
          </div>
        </NavLink>
      </div>
      <div className="w-full max-w-max">
        {isFetching ? (
          <SpinnerTwo />
        ) : isInCollection ? (
          <button
            onClick={removePhoto}
            className="flex items-center gap-2  py-4 text-sm font-medium tracking-tight transition-all duration-300 hover:gap-0  "
          >
            {isRemoving ? (
              <SpinnerTwo />
            ) : (
              <>
                <IoRemove />
                Remove
              </>
            )}
          </button>
        ) : (
          <button
            onClick={addPhoto}
            className="flex  items-center gap-2 py-4 text-sm font-medium tracking-tight transition-all duration-300 hover:gap-0"
          >
            {isAdding ? (
              <SpinnerTwo />
            ) : (
              <>
                <IoMdAdd />
                Add to collection
              </>
            )}
          </button>
        )}
      </div>
      {/* <button></button> */}
    </div>
  );
}
