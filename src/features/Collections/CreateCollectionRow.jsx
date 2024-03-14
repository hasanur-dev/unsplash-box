import { useNavigate, useSearchParams } from "react-router-dom";

export default function CreateCollectionRow() {
  const [searchParams, setSearchParams] = useSearchParams();
  const imageId = searchParams.get("imageId");
  const navigate = useNavigate();
  const handleClick = () => {
    // navigate(-1);
    navigate(`?modal=createCollection&imageId=${imageId}`);
  };
  return (
    <div className="group mr-6 flex cursor-pointer  items-center rounded-md transition-colors duration-300 hover:bg-gray-light dark:hover:bg-gray-transparent">
      <div className=" w-full ">
        <button onClick={handleClick} className="h-16 w-full rounded-md border">
          Create a new collection
        </button>
      </div>
    </div>
  );
}
