import Weather from "../components/weather";

export default function Home() {
  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="mt-10">
        <Weather />
      </div>
    </div>
  );
}
