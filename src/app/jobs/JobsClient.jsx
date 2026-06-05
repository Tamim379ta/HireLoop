// src/app/jobs/JobsClient.jsx
"use client";

import React, { useState, useMemo } from "react";
import JobCard from "./JobCard";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Dropdown, Label } from "@heroui/react";

const JOB_TYPES = ["All", "Full-time", "Part-time", "Contract", "Internship", "Freelance"];

const JobsClient = ({ jobs }) => {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
        job.companyName.toLowerCase().includes(search.toLowerCase()) ||
        job.location?.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        activeType === "All" ||
        job.jobType?.toLowerCase() === activeType.toLowerCase();

      return matchesSearch && matchesType;
    });
  }, [jobs, search, activeType]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Explore All Jobs 🚀
        </h1>
        <p className="text-gray-500 mt-1">
          Find your next opportunity from the latest openings
        </p>
      </div>

      {/* Search + Category Row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">

        {/* Search */}
        <div className="relative flex-1">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, company, or location..."
            className="w-full bg-[#161616] border border-[#2b2b2b] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#3f3f3f] transition-colors"
          />
        </div>

        {/* Category Dropdown */}
        <Dropdown>
          <Dropdown.Trigger>
            <div className="flex items-center gap-2 bg-[#161616] border border-[#2b2b2b] rounded-xl px-4 py-3 text-sm text-gray-300 hover:border-[#3f3f3f] hover:text-white transition-colors min-w-[160px] justify-between cursor-pointer select-none">
              <span className="flex items-center gap-2">
                <HiOutlineBriefcase className="text-gray-400" />
                {activeType}
              </span>
              <MdKeyboardArrowDown className="text-gray-400" />
            </div>
          </Dropdown.Trigger>

          <Dropdown.Popover className="bg-[#161616] border border-[#2b2b2b] rounded-xl shadow-xl shadow-black/40 overflow-hidden min-w-[160px]">
            <Dropdown.Menu className="p-1">
              {JOB_TYPES.map((type) => (
                <Dropdown.Item
                  key={type}
                  onAction={() => setActiveType(type)}
                  className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                    activeType === type
                      ? "bg-green-500/10 text-green-400"
                      : "text-gray-300 hover:bg-[#222] hover:text-white"
                  }`}
                >
                  <Label className="cursor-pointer">{type}</Label>
                  {activeType === type && (
                    <Dropdown.ItemIndicator className="text-green-400 text-xs">
                      ✓
                    </Dropdown.ItemIndicator>
                  )}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500 mb-4">
        {filtered.length} {filtered.length === 1 ? "job" : "jobs"} found
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-gray-400 font-medium">No jobs match your filters</p>
          <p className="text-gray-600 text-sm mt-1">Try a different search or category</p>
          <button
            onClick={() => { setSearch(""); setActiveType("All"); }}
            className="mt-4 text-sm text-green-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsClient;