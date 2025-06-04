import React from "react";
import TimerCard from "./TimerCard";

interface Timer {
  id: string;
  title: string;
  targetDate: Date;
  type: "event" | "birthday";
  birthYear?: number;
}

interface TimerListProps {
  timers: Timer[];
  onDeleteTimer: (id: string) => void;
  onUpdateTimer: (timer: Timer) => void;
}

const TimerList: React.FC<TimerListProps> = ({
  timers,
  onDeleteTimer,
  onUpdateTimer,
}) => {
  if (timers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⏰</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Пока нет активных таймеров
        </h3>
        <p className="text-gray-500">
          Добавьте свой первый таймер, чтобы начать отслеживать важные события
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {timers.map((timer) => (
        <TimerCard
          key={timer.id}
          timer={timer}
          onDelete={onDeleteTimer}
          onUpdateTimer={onUpdateTimer}
        />
      ))}
    </div>
  );
};

export default TimerList;
