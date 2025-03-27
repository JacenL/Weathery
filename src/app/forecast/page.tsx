import Forecast from "../../components/forecast"
import { Suspense } from "react";

export default function ForecastPage() {
    return (
      <div className="flex justify-center items-start min-h-screen">
        <div className="mt-10">
          <Suspense fallback={<div>Loading...</div>}>
            <Forecast />
          </Suspense>
        </div>
      </div>
    );
  }