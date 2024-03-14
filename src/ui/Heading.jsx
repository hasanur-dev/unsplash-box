export default function Heading({ title }) {
  return (
    <h1 className="bg-[url('/gradient-bg.svg')] bg-cover bg-clip-text bg-[40%] text-4xl font-medium capitalize text-transparent ">
      {title}
    </h1>
  );
}
