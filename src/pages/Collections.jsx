import { useInfiniteQuery } from "@tanstack/react-query";
import { useUserContext } from "../contexts/UserContext";
import CollectionsDisplay from "../features/Collections/CollectionsDisplay";
import { getAllCollections } from "../services/apiUnsplash";
import Spinner from "../ui/Spinner";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Heading from "../ui/Heading";

export default function Collections() {
  const { ref, inView, entry } = useInView({
    threshold: 0.1, // Adjust the threshold as needed
  });
  const { user } = useUserContext();
  const [collections, setCollections] = useState([]);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["collections"],
    queryFn: ({ pageParam }) => getAllCollections(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  useEffect(() => {
    const pages = data?.pages;
    let temp = [];
    pages?.forEach((page) => {
      temp = [...temp, ...page.collections];
    });
    setCollections(temp);
  }, [data]);

  useEffect(() => {
    if (inView) fetchNextPage();
    if (inView) console.log("inView");
  }, [inView, fetchNextPage]);

  // if (isFetching && collections.length === 0)
  //   return (
  //     <div className="py-16">
  //       <Spinner />
  //     </div>
  //   );
  return (
    <main className="relative flex flex-col gap-14 pb-16 pt-10">
      <div className="mx-auto flex max-w-96 flex-col items-center gap-4 text-center">
        <Heading title="Collections" />
        <p className="font-extralight">
          Explore the world through collections of beautiful photos free to use
          under the{" "}
          <a
            href="https://unsplash.com/license"
            className="font-normal underline"
          >
            Unsplash License
          </a>
          .
        </p>
      </div>
      {isFetching && collections.length === 0 ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <CollectionsDisplay collections={collections} />
          <div ref={ref} className="absolute bottom-[500px]"></div>
          {isFetchingNextPage && <Spinner />}
        </>
      )}
    </main>
  );
}
