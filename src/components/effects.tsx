"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function EffectHandler() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/forecast") {
      document.body.className = "min-h-screen w-full bg-gray-900 transition-colors duration-700";
    }
  }, [pathname]);

  return null;
}
