import { useEffect, useState } from "react";
import ImagesColumn from "./ImagesColumn";

export default function ImagesDisplay({ images }) {
  const [imagesSplit, setImagesSplit] = useState([]);
  const [cols, setCols] = useState(0);
  // const [width, setWidth] = useState(() => window.innerWidth);
  const numImagesPerCol = images?.length / cols;

  useEffect(() => {
    const getWidth = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setCols(1);
      } else if (width >= 600 && width < 800) {
        setCols(2);
      } else if (width >= 800 && width < 1000) {
        setCols(3);
      } else if (width >= 1000) {
        setCols(4);
      }
    };
    getWidth();
    window.addEventListener("resize", getWidth);

    return () => {
      // console.log("remove");
      window.removeEventListener("resize", getWidth);
    };
  }, [cols, numImagesPerCol]);

  useEffect(() => {
    function splitImages() {
      for (let i = 0; i < cols; i++) {
        const part = images.slice(
          i * numImagesPerCol,
          i * numImagesPerCol + numImagesPerCol,
        );
        // console.log(part, `loop ${i}`);
        setImagesSplit((images) => [...images, part]);
      }
    }
    setImagesSplit([]);
    splitImages();
  }, [images, cols, numImagesPerCol]);

  return (
    <div
      className={` grid grid-cols-1 gap-6 min-[600px]:grid-cols-2 min-[800px]:grid-cols-3 min-[1000px]:grid-cols-4`}
    >
      {imagesSplit.map((images) => (
        <ImagesColumn key={Math.random()} images={images} />
      ))}
    </div>
  );
}
