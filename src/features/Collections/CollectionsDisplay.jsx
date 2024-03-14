import Collection from "./Collection";

export default function CollectionsDisplay({ collections }) {
  // export default function CollectionsDisplay() {
  // console.log(collections);
  return (
    <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-3">
      {collections?.map((collection) => (
        <Collection key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
