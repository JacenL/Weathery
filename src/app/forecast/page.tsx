import Forecast from "../../components/forecast";
import { Suspense } from "react";

export default function ForecastPage() {
  return (
    <div className="min-h-screen w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Forecast />
      </Suspense>
    </div>
  );
}