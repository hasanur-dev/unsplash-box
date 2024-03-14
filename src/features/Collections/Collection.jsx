import { NavLink } from "react-router-dom";

export default function Collection({ collection }) {
  const { id, preview_photos, total_photos, title } = collection;
  // console.log({ id, preview_photos, total_photos, title });
  // console.log(collection);
  return (
    <div className="group w-full max-w-[360px] justify-self-center">
      <NavLink to={`/collections/${id}?name=${title}&total=${total_photos}`}>
        <div className="grid h-[230px] w-full  grid-cols-4 grid-rows-2 gap-1 overflow-hidden rounded-[4px] transition-all duration-300 group-hover:brightness-90">
          {preview_photos.map((p, i) => {
            if (i === 3) return null;
            return (
              <img
                src={p.urls.small}
                className={`test h-full w-full ${i === 0 ? "col-span-3 row-span-2" : ""} object-cover`}
                key={p.id}
              />
            );
          })}
        </div>
        <div className=" py-4">
          <h2>{title}</h2>
          <span className="text-gray-medium ">{total_photos} photos</span>
        </div>
      </NavLink>
    </div>
  );
}
