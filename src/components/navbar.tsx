"use client"

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [city, setCity] = useState("");
  const pathname = usePathname();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let searchUrl = `/?city=${city}`;
      if (pathname.startsWith("/forecast")) {
        searchUrl = `/forecast?city=${city}`;
      }
      window.location.href = searchUrl;
    }
  };

  return (
    <nav className="bg-blue-500 bg-opacity-70 text-white p-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          🌤️ Weathery
        </Link>
        <div className="relative w-1/3 max-w-md">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border border-white text-white rounded-full px-5 py-2 focus:outline-none placeholder-gray-200"
          />
          <button
            onClick={() => window.location.href = `/?city=${city}`}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
          >
            <Image
              src="/search-icon.png"
              alt="Search"
              width={20}
              height={20}
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
          </button>
        </div>
        <div className="hidden md:flex space-x-10 mr-2">
          <Link href="/" className="hover:underline">
            Current Weather
          </Link>
          <Link href="/forecast" className="hover:underline">
            Forecast
          </Link>
          <Link href="/lunar" className="hover:underline">
            Lunar Phases
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
