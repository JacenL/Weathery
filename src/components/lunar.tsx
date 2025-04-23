"use client";

import { useEffect, useState, ReactElement } from "react";
import { fetchLunarPhase } from "@/utils/fetchLunar";

export default function LunarClock() {
    const [date, setDate] = useState(new Date());
    const [phase, setPhase] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [stars, setStars] = useState<ReactElement[]>([]);

    useEffect(() => {
        async function loadPhase() {
            const formattedDate = date.toISOString().split("T")[0];
            const phaseValue = await fetchLunarPhase("Earth", formattedDate);
            setPhase(phaseValue);
            setLoading(false);
        }
      
        loadPhase();
    }, [date]);
      
    useEffect(() => {
      const newStars = Array.from({ length: 100 }).map((_, i) => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 2 + Math.random() * 2;

        const base = Math.random();
        const size = 0.8 + base * base * 5;
    
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle opacity-100"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      });
    
      setStars(newStars);
    }, []);
    

    const angle = phase !== null ? phase * 360 : 0;
    const moonPhases = [
        { emoji: "🌑", angle: -90 },
        { emoji: "🌒", angle: -45 },
        { emoji: "🌓", angle: 0 },
        { emoji: "🌔", angle: 45 },
        { emoji: "🌕", angle: 90 },
        { emoji: "🌖", angle: 135 },
        { emoji: "🌗", angle: 180 },
        { emoji: "🌘", angle: -135 },
    ];

    function getPhaseName(value: number): string {
        if (value < 0.125) return "New Moon";
        if (value < 0.25) return "Waxing Crescent";
        if (value < 0.375) return "First Quarter";
        if (value < 0.5) return "Waxing Gibbous";
        if (value < 0.625) return "Full Moon";
        if (value < 0.75) return "Waning Gibbous";
        if (value < 0.875) return "Last Quarter";
        return "Waning Crescent";
    }

    const fraction = phase! < 0.5
    ? phase! * 2
    : (1 - phase!) * 2

    return (
        <div
            className="relative flex flex-col items-center min-h-screen w-full transition-all duration-700 overflow-hidden"
            style={{
                background:
                    phase! < 0.5
                        ? `linear-gradient(to right, rgba(10, 10, 10, 1) ${100 - fraction * 100 - 5}%, rgba(255, 215, 0, 0.6) ${100 - fraction * 100 + 5}%)`
                        : `linear-gradient(to left, rgba(10, 10, 10, 1) ${100 - fraction * 100 - 5}%, rgba(255, 215, 0, 0.6) ${100 - fraction * 100 + 5}%)`,
              }}
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {stars}
            </div>
            <h1 className="text-2xl font-bold mt-50 mb-6 text-white drop-shadow-lg">
                Lunar Phase Clock
            </h1>
        
            {loading ? (
            <p className="mt-10 text-white">Loading...</p>
            ) : phase !== null ? (
            <>
                <div className="relative w-64 h-64 rounded-full border-4 border-white flex items-center justify-center my-14">
                <div
                    className="absolute w-1 h-27 bg-yellow-500"
                    style={{
                    left: "50%",
                    transform: `rotate(${angle}deg) translateX(0%) translateY(-50%)`,
                    transformOrigin: "0% 50%",
                    }}
                />
                <div className="w-4 h-4 bg-white rounded-full z-10" />
        
                {moonPhases.map(({ emoji, angle }, index) => {
                    const radius = 40;
                    const rad = (angle * Math.PI) / 180;
                    const x = 50 + radius * Math.cos(rad);
                    const y = 50 + radius * Math.sin(rad);
        
                    return (
                    <div
                        key={index}
                        className="absolute text-white text-sm"
                        style={{
                        top: `${y}%`,
                        left: `${x}%`,
                        transform: "translate(-50%, -50%)",
                        }}
                    >
                        {emoji}
                    </div>
                    );
                })}
                </div>

                <div className="flex items-center justify-center mt-1 mb-6 text-white">
                    <button
                        onClick={() => setDate((prev) => new Date(prev.getTime() - 86400000))}
                        className="px-4 py-2 rounded-full border border-white text-white bg-white/10 hover:bg-white/20 shadow-white shadow-sm transition"
                    >
                        ←
                    </button>

                    <div className="text-sm w-60 text-center">
                        {date.toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        })}
                    </div>

                    <button
                        onClick={() => setDate((prev) => new Date(prev.getTime() + 86400000))}
                        className="px-4 py-2 rounded-full border border-white text-white bg-white/10 hover:bg-white/20 shadow-white shadow-sm transition"
                    >
                        →
                    </button>
                </div>
        
                <p className="mt-4 text-lg text-white">
                    Moon Phase: {getPhaseName(phase)}
                </p>
            </>
            ) : (
            <p className="mt-20 text-white">Unable to fetch lunar phase.</p>
            )}
        </div>
    );
}
