import React from "react";
import { Badge } from "@/components/ui/badge";
import { Camera, Shield, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  time: string;
  description: string;
  status?: "OK" | "Pending" | "Missed";
  projectColor: string; // Tailwind color class for the vertical bar
  cameraDetect?: boolean;
  blockSocialSites?: boolean;
  onDelete: () => void; // Nova prop para a ação de exclusão
}

const TaskItem: React.FC<TaskItemProps> = ({
  time,
  description,
  status,
  projectColor,
  cameraDetect,
  blockSocialSites,
  onDelete,
}) => {
  const statusColor = status === "OK" ? "bg-green-500" : status === "Pending" ? "bg-yellow-500" : "bg-gray-400";

  return (
    <div className="flex items-start space-x-4 py-2 relative group">
      <div className={cn("w-2 h-full min-h-16 rounded-full", projectColor)}></div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">{time}</span>
          {status && (
            <Badge className={cn("rounded-full px-3 py-1 text-xs text-white", statusColor)}>
              {status}
            </Badge>
          )}
        </div>
        <p className="text-gray-700 text-base">{description}</p>
        {(cameraDetect || blockSocialSites) && (
          <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
            {cameraDetect && (
              <span className="flex items-center space-x-1 bg-gray-200 px-2 py-1 rounded-full">
                <Camera className="h-3 w-3" />
                <span>Camera detect</span>
              </span>
            )}
            {blockSocialSites && (
              <span className="flex items-center space-x-1 bg-gray-200 px-2 py-1 rounded-full">
                <Shield className="h-3 w-3" />
                <span>Block social sites</span>
              </span>
            )}
          </div>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500" /* Alterado de top-2 para top-4 */
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TaskItem;