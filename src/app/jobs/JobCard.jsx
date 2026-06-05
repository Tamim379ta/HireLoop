import React from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

const JobCard = ({ job }) => {
  console.log(job);
  const {
    jobTitle,
    companyName,
    companyLogo,
    jobType,
    location,
    isRemote,
    minSalary,
    maxSalary,
    currency,
    status,
    _id,
  } = job;

  return (
    <div className="bg-[#161616] border border-[#2b2b2b] rounded-2xl p-6 hover:border-[#3f3f3f] transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-[#222] rounded-xl p-2 flex items-center justify-center">
            <Image
              src={companyLogo}
              alt={companyName}
              width={56}
              height={56}
              className="object-contain"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">
              {jobTitle}
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              {companyName}
            </p>
          </div>
        </div>

        {status === "active" && (
          <div className="flex items-center gap-1 bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs">
            <GoVerified />
            Verified
          </div>
        )}
      </div>

      {/* Salary */}
      <div className="mb-4">
        <p className="text-lg font-semibold text-white">
          {currency} {minSalary} - {maxSalary}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="flex items-center gap-1 border border-[#333] px-3 py-1.5 rounded-full text-sm text-gray-300">
          <HiOutlineBriefcase />
          {jobType}
        </span>

        <span className="flex items-center gap-1 border border-[#333] px-3 py-1.5 rounded-full text-sm text-gray-300">
          <IoLocationOutline />
          {isRemote ? "Remote" : location}
        </span>
      </div>

      <div className="border-t border-[#2b2b2b] pt-4 flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {location}
        </p>

        <Link href={`/jobs/${_id}`} className="flex items-center gap-1 text-white font-medium hover:text-green-400 transition-colors">
          View Job
          <FiArrowUpRight />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;