import React from "react";
import TaskItem from "./TaskItem";

interface Task {
  id: string;
  time: string;
  description: string;
  status?: "OK" | "Pending" | "Missed";
  projectColor: string;
  cameraDetect?: boolean;
  blockSocialSites?: boolean;
}

interface DailyTaskTimelineProps {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void; // Nova prop para a função de exclusão de tarefa
}

const DailyTaskTimeline: React.FC<DailyTaskTimelineProps> = ({ tasks, onDeleteTask }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm font-sans text-dashboard-text-primary">
      <h2 className="text-xl font-bold mb-4">Tarefas do Dia</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} {...task} onDelete={() => onDeleteTask(task.id)} />
        ))}
        {tasks.length > 0 && (
          <div className="text-center text-gray-500 text-lg font-semibold">...</div>
        )}
        {tasks.length === 0 && (
          <p className="text-center text-gray-500">Nenhuma tarefa agendada para hoje.</p>
        )}
      </div>
    </div>
  );
};

export default DailyTaskTimeline;