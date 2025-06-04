import React from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerDisplayProps {
  timeLeft: TimeLeft;
  isExpired: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, isExpired }) => {
  if (isExpired) {
    return (
      <div className="text-center">
        <div className="text-4xl font-bold text-red-500 animate-pulse">
          🎉 Время истекло! 🎉
        </div>
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: "дней" },
    { value: timeLeft.hours, label: "часов" },
    { value: timeLeft.minutes, label: "минут" },
    { value: timeLeft.seconds, label: "секунд" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {timeUnits.map((unit, index) => (
        <div
          key={unit.label}
          className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-4 text-center border border-purple-200"
        >
          <div className="text-2xl md:text-3xl font-bold text-purple-800 font-mono">
            {unit.value.toString().padStart(2, "0")}
          </div>
          <div className="text-sm text-purple-600 font-medium">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimerDisplay;
