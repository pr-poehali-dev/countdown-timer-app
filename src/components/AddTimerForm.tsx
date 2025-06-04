import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Calendar, Cake } from "lucide-react";

interface Timer {
  id: string;
  title: string;
  targetDate: Date;
  type: "event" | "birthday";
  birthYear?: number;
}

interface AddTimerFormProps {
  onAddTimer: (timer: Omit<Timer, "id">) => void;
}

const AddTimerForm: React.FC<AddTimerFormProps> = ({ onAddTimer }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState<"event" | "birthday">("event");
  const [birthYear, setBirthYear] = useState("");

  const getNextBirthday = (birthDate: Date) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextBirthday = new Date(
      currentYear,
      birthDate.getMonth(),
      birthDate.getDate(),
    );

    if (nextBirthday < today) {
      nextBirthday.setFullYear(currentYear + 1);
    }

    return nextBirthday;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    if (type === "birthday") {
      if (!birthYear) {
        alert("Пожалуйста, укажите год рождения");
        return;
      }

      const birthDate = new Date(
        `${birthYear}-${date.split("-")[1]}-${date.split("-")[2]}`,
      );
      const nextBirthday = getNextBirthday(birthDate);

      onAddTimer({
        title,
        targetDate: nextBirthday,
        type: "birthday",
        birthYear: parseInt(birthYear),
      });
    } else {
      if (!time) {
        alert("Пожалуйста, укажите время события");
        return;
      }

      const targetDate = new Date(`${date}T${time}`);

      if (targetDate <= new Date()) {
        alert("Дата должна быть в будущем");
        return;
      }

      onAddTimer({
        title,
        targetDate,
        type: "event",
      });
    }

    setTitle("");
    setDate("");
    setTime("");
    setBirthYear("");
    setType("event");
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-montserrat text-purple-800">
          <Plus className="h-5 w-5" />
          Добавить новый таймер
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тип события
            </label>
            <Select
              value={type}
              onValueChange={(value: "event" | "birthday") => setType(value)}
            >
              <SelectTrigger className="border-purple-200 focus:border-purple-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Обычное событие
                  </div>
                </SelectItem>
                <SelectItem value="birthday">
                  <div className="flex items-center gap-2">
                    <Cake className="h-4 w-4" />
                    День рождения
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {type === "birthday" ? "Имя именинника" : "Название события"}
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                type === "birthday"
                  ? "Например, Анна"
                  : "Например, Встреча с друзьями"
              }
              className="border-purple-200 focus:border-purple-400"
            />
          </div>

          {type === "birthday" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дата рождения (день и месяц)
                </label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Год рождения
                </label>
                <Input
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  placeholder="1990"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дата
                </label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Время
                </label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium"
          >
            {type === "birthday" ? (
              <>
                <Cake className="h-4 w-4 mr-2" />
                Добавить день рождения
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Создать таймер
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTimerForm;
