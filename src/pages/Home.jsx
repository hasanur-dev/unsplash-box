import { useMutation } from "@tanstack/react-query";
import { useUserContext } from "../contexts/UserContext";
import Search from "../ui/Search";
import { testFn } from "../services/apiUnsplash";
export default function Home() {
  const { user, setUser } = useUserContext();
  const { mutate } = useMutation({
    mutationFn: testFn,
    onSuccess: () => {
      console.log("success");
    },
  });
  return (
    <main className=" flex h-[80%] justify-center overflow-hidden">
      <div className="hero pointer-events-none fixed left-1/2 block  h-[90%] w-[1280px] -translate-x-1/2 overflow-hidden"></div>
      <div className="mt-40 flex w-full flex-col items-center">
        <h1 className="text-4xl font-semibold tracking-tighter dark:text-gray-very-light">
          Search
        </h1>
        <p className="mt-3 font-normal tracking-tight text-gray-transparent/90 dark:text-gray-medium">
          Search high-resolution images from Unsplash
        </p>
        <div className="mt-7 flex w-full justify-center">
          <Search />
        </div>
        <button className="bg-gray-400 p-3" onClick={mutate}>
          hello
        </button>
      </div>
    </main>
  );
}
