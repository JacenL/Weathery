"use client";
import React from "react";

interface OutfitProps {
  suggestion: string;
}

const Outfit: React.FC<OutfitProps> = ({ suggestion }) => {
  return (
    <div className="rounded-xl shadow p-4 bg-white">
      <h2 className="text-xl font-semibold mb-2">Outfit Suggestion</h2>
      <p>{suggestion}</p>
    </div>
  );
};

export default Outfit;