import React from "react";
import {
  FaFileAlt,
  FaUsers,
  FaBolt,
  FaCheckCircle,
} from "react-icons/fa";

// Reusable Card Component
const StatCard = ({ icon, label, value }) => {
  return (
    <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-2xl p-6 flex flex-col justify-between min-h-[160px]">
      <div className="bg-[#2c2c2e] text-[#a1a1a6] w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg">
        {icon}
      </div>

      <div>
        <p className="text-[#8e8e93] text-sm font-medium mb-1">{label}</p>
        <p className="text-white text-3xl font-semibold tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
};

export default function StatsBar() {
  const stats = [
    {
      icon: <FaFileAlt />,
      label: "Total Job Posts",
      value: "48",
    },
    {
      icon: <FaUsers />,
      label: "Total Applicants",
      value: "1,284",
    },
    {
      icon: <FaBolt />,
      label: "Active Jobs",
      value: "18",
    },
    {
      icon: <FaCheckCircle />,
      label: "Jobs Closed",
      value: "32",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl p-6 bg-[#121212]">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
        />
      ))}
    </div>
  );
}