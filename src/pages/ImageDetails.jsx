import { useNavigate, useParams } from "react-router-dom";
import { getSingleImage } from "../services/apiUnsplash";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import PersonalCollections from "../features/ImageDetails/PersonalCollections";
import Button from "../ui/Button";
import DownloadButton from "../ui/DownloadButton";

// import Form from "../features/Collections/Form";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ImageDetails() {
  const navigate = useNavigate();
  const { imageId } = useParams();
  const { data: imageData, isPending: isLoading } = useQuery({
    queryKey: ["images", imageId],
    queryFn: () => getSingleImage(imageId),
  });
  const handleClick = (e) => {
    e.preventDefault();
    console.log("hello");
    navigate(`?modal=addToCollection&imageId=${imageId}`);
  };
  console.log(imageData);

  if (isLoading) return <Spinner />;
  const {
    alt_description,
    urls: { full },
    user: { updated_at, name, profile_image },
  } = imageData;
  const uploadDate = new Date(updated_at);

  const handleDownload = () => {
    const downloadUrl = `/.netlify/functions/downloadImage?imageUrl=${encodeURIComponent(full)}&imageName=${encodeURIComponent(alt_description)}`;
    window.location.href = downloadUrl;
  };

  return (
    <div className=" mx-auto grid max-w-[550px] gap-14 pb-36 pt-16 xl:grid xl:max-w-[1130px] xl:grid-cols-2 xl:gap-10">
      <img src={full} className="rounded-md" alt={alt_description} />

      <div className=" flex flex-col gap-5">
        <div className="flex items-center gap-3 text-sm font-light">
          <img
            className="w-9 rounded-full"
            src={profile_image?.medium}
            alt=""
          />
          <span>{name}</span>
        </div>
        <p className="text-xs font-light">
          Published on {months[uploadDate.getMonth()]} {uploadDate.getDate()},{" "}
          {uploadDate.getFullYear()}
        </p>
        <div className=" flex max-w-52 flex-col gap-4 sm:max-w-max sm:flex-row">
          <Button onClick={handleClick} icon={<IoMdAdd />}>
            Add to collection
          </Button>

          <Button
            onClick={handleDownload}
            icon={<MdOutlineDownloadForOffline />}
          >
            Download
          </Button>
        </div>
        <div className="mt-6 grid gap-4">
          <h2 className="text-2xl">Collections</h2>
          <PersonalCollections />
        </div>
      </div>
    </div>
  );
}
