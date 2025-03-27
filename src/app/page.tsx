import Weather from "../components/weather";
import { Suspense } from "react";

export default function Current() {
  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="mt-10">
        <Suspense fallback={<div>Loading...</div>}>
          <Weather />
        </Suspense>
      </div>
    </div>
  );
}
