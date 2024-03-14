import Image from "./Image";

export default function ImagesColumn({ images }) {
  // console.log(images);
  return (
    <div className="flex flex-col gap-6">
      {images.map((image) => (
        <Image key={image.id} image={image} />
      ))}
    </div>
  );
}
