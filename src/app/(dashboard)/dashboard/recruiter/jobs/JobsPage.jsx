"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FaPlus, FaEye, FaPen, FaTrash } from "react-icons/fa6";
import { Plus } from "lucide-react";

export default function JobsPage({ initialJobs = [] }) {
  const [jobs, setJobs] = useState(initialJobs);

  const handleDelete = (id) => {
    if (!confirm("Delete this job?")) return;
    setJobs((prev) => prev.filter((j) => (j._id?.$oid || j._id) !== id));
  };

  return (
    <div className="min-h-screen bg-[#121212] px-6 py-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-xl font-semibold">Job Posts</h1>
        <Link href="/dashboard/recruiter/jobs/new">
          <Button
            size="sm"
            className="bg-[#1c1c1e] border border-[#2c2c2e] text-white"
            startContent={<FaPlus />}
          >
            <Plus /> New Job
          </Button>
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2c2c2e]">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8e8e93]">
                Job
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8e8e93]">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8e8e93]">
                Company
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8e8e93]">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#8e8e93]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-[#8e8e93]"
                >
                  No jobs posted yet.
                </td>
              </tr>
            ) : (
              jobs.map((job, index) => {
                const id = job._id?.$oid || job._id;
                const isLast = index === jobs.length - 1;

                return (
                  <tr
                    key={id}
                    className={`hover:bg-[#2c2c2e]/40 transition-colors ${
                      !isLast ? "border-b border-[#2c2c2e]" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <p className="text-white text-sm font-medium">{job.jobTitle}</p>
                      <p className="text-xs text-[#8e8e93]">{job.jobCategory}</p>
                    </td>

                    <td className="px-4 py-3 text-[#8e8e93] text-sm">
                      {job.jobType}
                    </td>

                    <td className="px-4 py-3 text-[#8e8e93] text-sm">
                      {job.companyName}
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400">
                        {job.status || "draft"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="p-1.5 rounded-md text-[#8e8e93] hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                          onClick={() => {/* view */}}
                        >
                          <FaEye size={13} />
                        </button>
                        <button
                          className="p-1.5 rounded-md text-[#8e8e93] hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                          onClick={() => {/* edit */}}
                        >
                          <FaPen size={12} />
                        </button>
                        <button
                          className="p-1.5 rounded-md text-[#8e8e93] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          onClick={() => handleDelete(id)}
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}