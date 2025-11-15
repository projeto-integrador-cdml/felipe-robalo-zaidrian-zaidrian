import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
  return (
    <Button
      className="w-40 h-20 bg-dashboard-highlight-red text-white rounded-lg shadow-sm text-4xl font-bold hover:bg-dashboard-highlight-red/90 transition-colors"
      onClick={onClick}
    >
      <Plus className="h-10 w-10" />
    </Button>
  );
};

export default AddTaskButton;