import React from "react";
import { Card } from "@heroui/react";
import {  Building2, SearchCode, Star } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      value: "50K",
      label: "Active Jobs",
      icon: Star,
    },
    {
      id: 2,
      value: "12K",
      label: "Companies",
      icon: Building2,
    },
    {
      id: 3,
      value: "2M",
      label: "Job Seekers",
      icon: SearchCode,
    },
    {
      id: 4,
      value: "97%",
      label: "Satisfaction Rate",
      icon: Star,
    },
  ];

  return (
    <section className="relative container mx-auto  text-white pt-100 px-4 overflow-hidden flex flex-col items-center justify-center">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl w-full z-10 text-center space-y-12">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Assisting over{" "}
          <span className="font-semibold text-white">15,000 job seekers</span>{" "}
          find their dream positions.
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.id}
                className="bg-zinc-900/90 border border-zinc-800/50 rounded-2xl p-6 text-left shadow-2xl backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-xl"
              >
                <Card.Content className="flex flex-col justify-between h-44 p-0">
                  {/* Icon */}
                  <div className="text-zinc-400">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>

                  {/* Value + Label */}
                  <div className="space-y-2">
                    <span className="text-5xl font-semibold tracking-tight text-white block">
                      {stat.value}
                    </span>
                    <span className="text-sm font-medium text-zinc-500 tracking-wide block">
                      {stat.label}
                    </span>
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}