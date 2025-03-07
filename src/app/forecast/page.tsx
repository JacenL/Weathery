import Forecast from "../../components/forecast"

export default function ForecastPage() {
    return (
      <div className="flex justify-center items-start min-h-screen">
        <div className="mt-10">
          <Forecast />
        </div>
      </div>
    );
  }