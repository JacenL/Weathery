"use client";

import { useEffect, useState } from "react";
import { weatherSong } from "../utils/weatherSong";
import { Play, Pause } from "lucide-react";

export default function WeatherMusicPlayer({ condition }: { condition: string }) {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const track = weatherSong[condition] || weatherSong["Clear"];
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const handlePlay = () => {
        if (audio) {
            audio.play();
        } else {
            const newAudio = new Audio(track.previewUrl);
            newAudio.loop = true;
            newAudio.play().catch((err) => console.error("Playback failed:", err));
            setAudio(newAudio);

            newAudio.addEventListener("timeupdate", () => {
                const percentage = (newAudio.currentTime / newAudio.duration) * 100;
                setProgress(percentage);
            });

            newAudio.addEventListener("loadedmetadata", () => {
                setDuration(newAudio.duration);
            });
        }
    };

    const handlePause = () => {
        if (audio) {
            audio.pause();
        }
    };

    useEffect(() => {
        return () => {
            if (audio) {
                audio.pause();
                audio.removeEventListener("timeupdate", () => { });
                audio.removeEventListener("loadedmetadata", () => { });
            }
        };
    }, [audio]);

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audio && duration) {
            const newTime = (parseFloat(e.target.value) / 100) * duration;
            audio.currentTime = newTime;
            setProgress((newTime / duration) * 100);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!audio) return;

        const updateState = () => setIsPlaying(!audio.paused);

        audio.addEventListener("play", updateState);
        audio.addEventListener("pause", updateState);

        return () => {
            audio.removeEventListener("play", updateState);
            audio.removeEventListener("pause", updateState);
        };
    }, [audio]);

    return (
        <div className="group fixed bottom-4 left-4 z-50 inline-flex items-center backdrop-blur-md bg-white/10 border border-white/30 text-white p-3 rounded-2xl shadow-lg transition-all duration-300">
            <div className="text-sm font-medium text-white/80 max-w-[300px] truncate">
                {track.name}
            </div>

            <button
                onClick={isPlaying ? handlePause : handlePlay}
                className="ml-3 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white/70 hover:text-white transition"
            >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            <div className="ml-1 overflow-hidden max-w-0 group-hover:max-w-[999px] opacity-0 group-hover:opacity-100 slide-expand flex items-center space-x-2 flex-grow">
                <span className="text-xs text-white/70 w-10 text-right">
                    {formatTime(audio?.currentTime || 0)}
                </span>
                <input
                    type="range"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer custom-slider"
                />
                <span className="text-xs text-white/70 w-10 text-right">
                    {formatTime(duration)}
                </span>
            </div>
        </div>
    );
}
