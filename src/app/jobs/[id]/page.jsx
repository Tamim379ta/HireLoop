import React from "react";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { FiBriefcase, FiDollarSign, FiClock, FiArrowUpRight, FiStar } from "react-icons/fi";
import { getJobById } from "@/lib/api/jobs";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { GoVerified } from "react-icons/go";

const JobPage = async ({ params }) => {
  const id = await params;
  const job = await getJobById(id?.id);
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-zinc-950">
        Job not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">

        {/* Hero card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">
          {/* Top row */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-zinc-800 border border-zinc-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Image
                  src={job.companyLogo}
                  alt={job.companyName}
                  width={40}
                  height={40}
                  className="rounded-xl object-contain"
                />
              </div>
              <div>
                <p className="text-sm text-zinc-400 mb-1">{job.companyName} • {job.jobCategory}</p>
                <h1 className="text-2xl font-semibold">{job.jobTitle}</h1>
              </div>
            </div>
            {job.status === "active" && (
              <span className="flex items-center gap-1.5 text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-full">
                <GoVerified /> Active
              </span>
            )}
          </div>

          <div className="border-t border-zinc-800 my-6" />

          {/* Meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: <HiOutlineBriefcase />, label: "Job type", value: job.jobType },
              { icon: <FiDollarSign />, label: "Salary", value: `${job.currency} ${job.minSalary} – ${job.maxSalary}` },
              { icon: <IoLocationOutline />, label: "Location", value: job.isRemote ? "Remote" : job.location },
              { icon: <FiClock />, label: "Deadline", value: new Date(job.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-zinc-800/50 rounded-xl p-3 flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-wide text-zinc-500">{label}</span>
                <span className="text-sm font-medium flex items-center gap-1.5">
                  <span className="text-zinc-400">{icon}</span>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content sections */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <HiOutlineBriefcase />, title: "Responsibilities", body: job.responsibilities },
            { icon: <FiBriefcase />, title: "Requirements", body: job.requirements },
            { icon: <FiStar />, title: "Benefits", body: job.benefits },
          ].map(({ icon, title, body }) => (
            <div key={title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-zinc-400 text-base">{icon}</span>
                <h2 className="text-sm font-medium">{title}</h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-zinc-300">Ready to join {job.companyName}?</p>
            <p className="text-xs text-zinc-500 mt-0.5">
              Application closes {new Date(job.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm border border-zinc-700 rounded-xl hover:bg-zinc-800 transition-colors">
              Save job
            </button>
            <button className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors flex items-center gap-1.5">
              Apply now <FiArrowUpRight />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobPage;