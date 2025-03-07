import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-400 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          🌤️ Weathery
        </Link>

        <div className="space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/forecast" className="hover:underline">
            Forecast
          </Link>
        </div>
      </div>
    </nav>
  );
}