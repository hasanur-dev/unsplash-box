import { RxCross2 } from "react-icons/rx";

import CreateCollectionForm from "./CreateCollectionForm";

export default function CreateCollection({ onClose }) {
  return (
    <div className=" flex h-[592px] w-[597px] flex-col gap-6 p-8  ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium text-gray-dark dark:text-gray-very-light">
          Create new collection
        </h2>
        <button
          onClick={onClose}
          className="rounded-sm border border-gray-transparent  p-2 text-xl text-gray-dark transition-all duration-300 hover:bg-gray-very-light hover:text-gray-dark dark:border-gray-light dark:text-gray-light"
        >
          <RxCross2 className="" />
        </button>
      </div>
      <CreateCollectionForm onClose={onClose} />
    </div>
  );
}
