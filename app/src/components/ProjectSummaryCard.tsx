import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectSummaryCardProps {
  projectName: string;
  totalTime: string;
  color: string; // Tailwind color class, e.g., "bg-dashboard-project-purple"
  onDelete: () => void; // Nova prop para a ação de exclusão
}

const ProjectSummaryCard: React.FC<ProjectSummaryCardProps> = ({ projectName, totalTime, color, onDelete }) => {
  return (
    <div className={`p-4 rounded-lg shadow-sm text-white flex flex-col justify-between h-28 relative ${color}`}>
      <h3 className="text-lg font-semibold">{projectName}</h3>
      <p className="text-3xl font-bold self-end">{totalTime}</p>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-white/80 hover:text-white"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProjectSummaryCard;