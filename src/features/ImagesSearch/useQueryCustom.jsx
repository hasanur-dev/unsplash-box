import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getImages } from "../../services/apiUnsplash";

export default function useQueryCustom(imageQuery, pages = 1) {
  console.log(imageQuery, pages);
  const [images, setImages] = useState([]);

  for (let i = 1; i <= pages; i++) {
    const {
      data: imagesData,
      isPending: isLoading,
      isSuccess,
      error,
    } = useQuery({
      queryKey: ["images", imageQuery, i],
      queryFn: () => getImages(imageQuery, i),
    });
    if (isSuccess) {
      setImages((prev) => [...prev, imagesData]);
    }
    console.log("customHook", imagesData);
  }

  return { images };
}
