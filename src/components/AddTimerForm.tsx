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
import { Plus, Cake } from "lucide-react";

interface Timer {
  id: string;
  title: string;
  targetDate: Date;
  birthYear: number;
}

interface AddTimerFormProps {
  onAddTimer: (timer: Omit<Timer, "id">) => void;
}

const AddTimerForm: React.FC<AddTimerFormProps> = ({ onAddTimer }) => {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const months = [
    { value: "01", label: "Январь" },
    { value: "02", label: "Февраль" },
    { value: "03", label: "Март" },
    { value: "04", label: "Апрель" },
    { value: "05", label: "Май" },
    { value: "06", label: "Июнь" },
    { value: "07", label: "Июль" },
    { value: "08", label: "Август" },
    { value: "09", label: "Сентябрь" },
    { value: "10", label: "Октябрь" },
    { value: "11", label: "Ноябрь" },
    { value: "12", label: "Декабрь" },
  ];

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

    if (!title || !day || !month || !birthYear) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(birthYear);

    // Проверяем корректность даты
    if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12) {
      alert("Пожалуйста, введите корректную дату");
      return;
    }

    // Проверяем количество дней в месяце
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
    if (dayNum > daysInMonth) {
      alert(
        `В ${months[monthNum - 1].label.toLowerCase()} только ${daysInMonth} дней`,
      );
      return;
    }

    const birthDate = new Date(yearNum, monthNum - 1, dayNum);
    const nextBirthday = getNextBirthday(birthDate);

    onAddTimer({
      title,
      targetDate: nextBirthday,
      birthYear: yearNum,
    });

    setTitle("");
    setDay("");
    setMonth("");
    setBirthYear("");
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-montserrat text-purple-800">
          <Cake className="h-5 w-5" />
          Добавить день рождения
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя именинника
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например, Анна"
              className="border-purple-200 focus:border-purple-400"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                День
              </label>
              <Input
                type="number"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="15"
                min="1"
                max="31"
                className="border-purple-200 focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Месяц
              </label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className="border-purple-200 focus:border-purple-400">
                  <SelectValue placeholder="Выберите" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium"
          >
            <Cake className="h-4 w-4 mr-2" />
            Добавить день рождения
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTimerForm;
