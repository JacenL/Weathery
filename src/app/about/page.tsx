export default function About() {
    return (
      <div className="flex flex-col justify-start items-start min-h-screen bg-blue-100">
        <div className="ml-5 mt-50">
            <h1 className="text-3xl font-bold mb-4 text-gray-600">About Weathery</h1>
            <p className="text-lg text-gray-500">
            Weathery is a weather forecasting application that provides accurate and up-to-date weather information.<br />
            This website was built for the 2nd sprint in the Future of Programming Languges course.
            </p>
        </div>
      </div>
    );
  }