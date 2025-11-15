import React from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthlyCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = React.useState(selectedDate);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const firstDayOfMonth = startOfMonth(currentMonth).getDay(); // 0 for Sunday, 1 for Monday

  const daysOfWeek = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm font-sans text-dashboard-text-primary">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
        </h2>
        <Button variant="ghost" size="icon" onClick={handleNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {daysOfWeek.map((day, index) => (
          <div key={day} className="font-bold text-xs text-gray-500">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8 w-8"></div>
        ))}
        {daysInMonth.map((day, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`h-8 w-8 rounded-md p-0 text-sm font-medium
              ${isSameDay(day, selectedDate)
                ? "bg-dashboard-highlight-red text-white hover:bg-dashboard-highlight-red/90"
                : "bg-dashboard-calendar-inactive-day-bg text-dashboard-text-primary hover:bg-dashboard-calendar-inactive-day-bg/80"
              }`}
            onClick={() => onDateSelect(day)}
          >
            {format(day, "d")}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MonthlyCalendar;