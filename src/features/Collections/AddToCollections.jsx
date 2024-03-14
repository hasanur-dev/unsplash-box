import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import PersonalCollections from "../ImageDetails/PersonalCollections";
import CreateCollectionRow from "./CreateCollectionRow";

export default function AddToCollections({ onClose }) {
  return (
    <div className=" flex h-[592px] w-[597px] flex-col gap-6 p-5 pb-10 ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-dark dark:text-gray-very-light">
          Add to Collections
        </h2>
        <button
          // onClick={onClose}
          onClick={onClose}
          className="rounded-sm border border-gray-transparent  p-2 text-xl text-gray-dark transition-all duration-300 hover:bg-gray-very-light hover:text-gray-dark dark:border-gray-light dark:text-gray-light"
        >
          <RxCross2 className="" />
        </button>
      </div>
      <div
        //   onSubmit={handleSubmit}
        className="relative flex w-full "
      >
        <input
          type="text"
          // defaultValue={defaultValue}
          className="dark w-full rounded-lg border bg-transparent px-6 py-4 placeholder-gray-transparent/30 shadow-sm outline-none transition-all duration-150 focus:border-gray-dark/30 focus:text-gray-dark dark:border-gray-very-light/40 dark:text-gray-very-light dark:placeholder-gray-light dark:focus:border-gray-light "
          placeholder="Enter your keywords..."
          // onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer text-2xl">
          <IoSearchOutline />
        </button>
      </div>
      <div className="custom-scroll grid gap-4 overflow-y-scroll">
        <CreateCollectionRow />
        <PersonalCollections />
      </div>
    </div>
  );
}
