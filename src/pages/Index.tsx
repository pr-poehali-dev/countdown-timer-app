import React, { useState } from "react";
import AddTimerForm from "@/components/AddTimerForm";
import TimerList from "@/components/TimerList";

interface Timer {
  id: string;
  title: string;
  targetDate: Date;
  type: "event" | "birthday";
  birthYear?: number;
}

const Index = () => {
  const [timers, setTimers] = useState<Timer[]>([
    {
      id: "1",
      title: "Новый год 2025",
      targetDate: new Date("2025-01-01T00:00:00"),
      type: "event",
    },
    {
      id: "2",
      title: "Анна",
      targetDate: new Date("2025-03-15T00:00:00"),
      type: "birthday",
      birthYear: 1990,
    },
  ]);

  const addTimer = (newTimer: Omit<Timer, "id">) => {
    const timer: Timer = {
      ...newTimer,
      id: Date.now().toString(),
    };
    setTimers((prev) => [...prev, timer]);
  };

  const deleteTimer = (id: string) => {
    setTimers((prev) => prev.filter((timer) => timer.id !== id));
  };

  const updateTimer = (updatedTimer: Timer) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === updatedTimer.id ? updatedTimer : timer,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            🚀 Космический Таймер
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Следите за важными событиями в реальном времени. Добавляйте даты и
            наблюдайте, как время приближает вас к цели.
          </p>
        </div>

        {/* Add Timer Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <AddTimerForm onAddTimer={addTimer} />
        </div>

        {/* Timers List */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold font-montserrat text-gray-800 mb-6">
            Активные таймеры ({timers.length})
          </h2>
          <TimerList
            timers={timers}
            onDeleteTimer={deleteTimer}
            onUpdateTimer={updateTimer}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
