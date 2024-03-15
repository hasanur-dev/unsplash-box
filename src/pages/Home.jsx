import Search from "../ui/Search";
export default function Home() {
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
      </div>
    </main>
  );
}
