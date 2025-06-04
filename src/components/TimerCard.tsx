import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TimerDisplay from "./TimerDisplay";
import { Trash2, Calendar, Cake } from "lucide-react";

interface Timer {
  id: string;
  title: string;
  targetDate: Date;
  type: "event" | "birthday";
  birthYear?: number;
}

interface TimerCardProps {
  timer: Timer;
  onDelete: (id: string) => void;
  onUpdateTimer: (timer: Timer) => void;
}

const TimerCard: React.FC<TimerCardProps> = ({
  timer,
  onDelete,
  onUpdateTimer,
}) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const target = timer.targetDate.getTime();
    const difference = target - now;

    if (difference <= 0) {
      // Если это день рождения и он прошел, обновляем на следующий год
      if (timer.type === "birthday") {
        const nextYear = new Date(timer.targetDate);
        nextYear.setFullYear(nextYear.getFullYear() + 1);

        const updatedTimer = {
          ...timer,
          targetDate: nextYear,
        };

        onUpdateTimer(updatedTimer);

        // Пересчитываем с новой датой
        const newDifference = nextYear.getTime() - now;
        const days = Math.floor(newDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (newDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (newDifference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((newDifference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds, isExpired: false };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isExpired: false };
  };

  const getAge = () => {
    if (timer.type !== "birthday" || !timer.birthYear) return null;

    const targetYear = timer.targetDate.getFullYear();
    return targetYear - timer.birthYear;
  };

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [timer.targetDate]);

  const age = getAge();

  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-purple-500">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-xl font-montserrat text-gray-800">
                {timer.title}
              </CardTitle>
              <Badge variant="secondary" className="flex items-center gap-1">
                {timer.type === "birthday" ? (
                  <>
                    <Cake className="h-3 w-3" />
                    День рождения
                  </>
                ) : (
                  <>
                    <Calendar className="h-3 w-3" />
                    Событие
                  </>
                )}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">
              {timer.targetDate.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
                ...(timer.type === "event" && {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              })}
              {timer.type === "birthday" && age && (
                <span className="ml-2 text-purple-600 font-medium">
                  (исполнится {age}{" "}
                  {age % 10 === 1 && age !== 11
                    ? "год"
                    : age % 10 >= 2 && age % 10 <= 4 && (age < 10 || age > 20)
                      ? "года"
                      : "лет"}
                  )
                </span>
              )}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(timer.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <TimerDisplay timeLeft={timeLeft} isExpired={timeLeft.isExpired} />
      </CardContent>
    </Card>
  );
};

export default TimerCard;
