import { getImages } from "../services/apiUnsplash";
import Search from "../ui/Search";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import ImagesDisplay from "../features/ImagesSearch/ImagesDisplay";
import Spinner from "../ui/Spinner";
import { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { useInView } from "react-intersection-observer";
import Modal from "../ui/Modal";
import AddToCollections from "../features/Collections/AddToCollections";

export default function SearchResults() {
  const [loadMore, setLoadMore] = useState(false);
  const { ref, inView, entry } = useInView({
    threshold: 0.1, // Adjust the threshold as needed
  });
  const { imageQuery } = useParams();
  const [images, setImages] = useState([]);
  // console.log(modal);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["images", imageQuery],
    queryFn: ({ pageParam }) => getImages(imageQuery, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  // console.log(data);
  const getMoreData = function () {
    setLoadMore(true);
  };
  useEffect(() => {
    if (inView && loadMore) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, loadMore]);

  useEffect(() => {
    if (!error) {
      setImages((prev) => {
        let temp = [];
        data?.pages?.forEach((page) => {
          temp = [...temp, ...page.images.results];
        });
        return temp;
      });
    }
  }, [error, data]);

  return (
    <main>
      <header className="relative left-0 right-0 top-0">
        <div className="relative ">
          <img
            src="/gradient-bg@2x.png"
            className="h-auto max-h-16 min-h-16 w-full"
            alt=""
          />
        </div>
        <div className="absolute left-0 top-1/2 flex w-full justify-center px-10">
          <Search defaultValue={imageQuery} />
        </div>
      </header>

      <InfiniteScroll
        dataLength={images.length}
        next={() => {
          console.log("fetchingNext");
          fetchNextPage();
        }}
        hasMore={true}
      >
        <div className="relative pb-20 pt-28" ref={ref}>
          {images && <ImagesDisplay images={images} />}
        </div>
      </InfiniteScroll>
      <div className="relative flex justify-center pb-28">
        <div className="absolute bottom-[600px]" ref={ref}></div>

        {isFetchingNextPage && <Spinner />}
        {!loadMore && (
          <button
            className="w-full border px-4 py-4 transition-colors duration-150 hover:bg-gray-light dark:hover:bg-gray-700 "
            onClick={() => getMoreData()}
          >
            {isFetchingNextPage ? <Spinner /> : "Load more"}
          </button>
        )}
      </div>
    </main>
  );
}
