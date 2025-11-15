import React from "react";
import { User } from "lucide-react";

const ProfileCard: React.FC = () => {
  return (
    <div className="w-20 h-20 bg-dashboard-profile-card-bg rounded-lg shadow-sm flex items-center justify-center cursor-pointer hover:bg-dashboard-profile-card-bg/80 transition-colors">
      <User className="h-10 w-10 text-gray-600" />
    </div>
  );
};

export default ProfileCard;