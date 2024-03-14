import { GoLock } from "react-icons/go";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addPhotoToCollection,
  createCollection,
} from "../../services/apiUnsplash";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreateCollectionForm({ onClose }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const imageId = searchParams.get("imageId");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useUserContext();

  const { mutate: addPhoto, isPending: isAdding } = useMutation({
    mutationFn: (collectionId) =>
      addPhotoToCollection(collectionId, imageId, user),

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

  const { mutate } = useMutation({
    mutationFn: (data) => createCollection(data, user),
    onSuccess: (data) => {
      toast.success("Collection created successfully");
      navigate(-1);
      console.log(data);
      addPhoto(data.id);
      // queryClient.invalidateQueries(["personalCollection"]);
      queryClient.setQueryData((oldData) => [data, ...oldData]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onSubmit = (data, e) => {
    e.preventDefault();
    mutate(data);
  };
  const { register, handleSubmit } = useForm();
  return (
    <form
      id="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col gap-8 "
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm">
          Name
        </label>
        <input
          className=" rounded-md px-3 py-2 outline outline-1 outline-gray-light transition-colors duration-300 focus:outline-2 focus:outline-gray-dark dark:bg-gray-dark dark:outline-gray-light/40 dark:focus:outline-gray-light"
          type="text"
          id="name"
          {...register("title", { required: "This field is required" })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="desc">
          Description <span className="text-gray-medium">(optional)</span>
        </label>
        <textarea
          className="h-28 resize-none rounded-md px-3 py-2 outline outline-1 outline-gray-light transition-colors duration-300 focus:outline-2 focus:outline-gray-dark dark:bg-gray-dark dark:outline-gray-light/40 dark:focus:outline-gray-light"
          id="desc"
          {...register("description")}
        />
      </div>
      <div className="flex gap-2">
        <input
          type="checkbox"
          className=""
          id="private"
          {...register("private")}
        />
        <label htmlFor="private" className="flex items-center gap-2">
          Make collection private{" "}
          <span>
            <GoLock />
          </span>
        </label>
      </div>
      <div className="mt-5 flex justify-between">
        <button onClick={onClose}>Cancel</button>

        <Button>Create collection</Button>
      </div>
    </form>
  );
}
