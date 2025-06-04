import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface Timer {
  id: string;
  title: string;
  targetDate: Date;
}

interface AddTimerFormProps {
  onAddTimer: (timer: Omit<Timer, "id">) => void;
}

const AddTimerForm: React.FC<AddTimerFormProps> = ({ onAddTimer }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date || !time) {
      alert("Пожалуйста, заполните все поля");
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
    });

    setTitle("");
    setDate("");
    setTime("");
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
              Название события
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например, День рождения"
              className="border-purple-200 focus:border-purple-400"
            />
          </div>

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

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Создать таймер
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTimerForm;
