import { useInfiniteQuery } from "@tanstack/react-query";
import { getCollectionPhotos } from "../services/apiUnsplash";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImagesDisplay from "../features/ImagesSearch/ImagesDisplay";
import Heading from "../ui/Heading";
import { useInView } from "react-intersection-observer";
import Spinner from "../ui/Spinner";
import { useUserContext } from "../contexts/UserContext";

export default function CollectionPhotos() {
  const [params, setParams] = useSearchParams();
  const [images, setImages] = useState([]);
  const { collectionId } = useParams();
  const totalPhotos = params.get("total");
  const title = params.get("name");
  const { user } = useUserContext();
  // console.log(user);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["images", collectionId],
    queryFn: ({ pageParam }) =>
      getCollectionPhotos({ collectionId, pageParam, user }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: Boolean(collectionId) && Boolean(user),
  });
  const { ref, inView, entry } = useInView({
    threshold: 0.1, // Adjust the threshold as needed
  });
  useEffect(() => {
    if (!error) {
      setImages((prev) => {
        let temp = [];
        data?.pages?.forEach((page) => {
          temp = [...temp, ...page.images];
        });
        return temp;
      });
    }
  }, [error, data]);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);
  return (
    <div className="relative flex flex-col gap-10 pb-32 pt-16">
      <div className="flex flex-col gap-2 text-center">
        <Heading title={title} />
        <span className="font-extralight">{totalPhotos} photos</span>
      </div>
      {isFetching && images.length === 0 ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <ImagesDisplay images={images} />
          <div className="absolute bottom-[600px]" ref={ref}></div>
          {isFetchingNextPage && <Spinner />}{" "}
        </>
      )}
    </div>
  );
}
