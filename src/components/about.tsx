"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      className="flex flex-col justify-start items-start min-h-screen bg-blue-200"
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }} 
    >
      <motion.div
        className="ml-5 mt-20"
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="ml-10 mt-50">
            <h1 className="text-3xl font-bold mb-4 text-gray-600">About Weathery</h1>
            <motion.p
            className="text-lg text-gray-500"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            >
            Weathery is a weather forecasting application that provides accurate and up-to-date weather information.<br />
            This website was built for the 2nd sprint in the Future of Programming Languages course.
            </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
