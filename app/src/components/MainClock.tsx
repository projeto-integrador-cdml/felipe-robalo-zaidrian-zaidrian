import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MainClockProps {
  progress: number; // 0-100
  progressColor: string; // Tailwind color class
}

const MainClock: React.FC<MainClockProps> = ({ progress, progressColor }) => {
  const [time, setTime] = useState(new Date());
  const [isPM, setIsPM] = useState(time.getHours() >= 12);

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const displayHours = (hours % 12) === 0 ? 12 : (hours % 12);

  const circumference = 2 * Math.PI * 45; // For a radius of 45 (total circle size 100x100)
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center space-x-2 font-sans text-dashboard-text-primary">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-dashboard-clock-bg"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className={cn("transition-all duration-500 ease-out", progressColor)}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold"> {/* Alterado de text-4xl para text-3xl */}
            {displayHours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <button
          className={cn(
            "px-3 py-1 rounded-md text-xs font-semibold",
            isPM ? "bg-dashboard-highlight-red text-white" : "bg-gray-200 text-gray-700"
          )}
          onClick={() => setIsPM(false)}
        >
          AM
        </button>
        <button
          className={cn(
            "px-3 py-1 rounded-md text-xs font-semibold",
            isPM ? "bg-gray-200 text-gray-700" : "bg-dashboard-highlight-red text-white"
          )}
          onClick={() => setIsPM(true)}
        >
          PM
        </button>
      </div>
    </div>
  );
};

export default MainClock;