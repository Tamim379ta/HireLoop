import React from "react";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { FiUsers, FiExternalLink } from "react-icons/fi";

const CompanyCard = ({ company }) => {
  const {
    companyName,
    industry,
    websiteUrl,
    location,
    employeeCountRange,
    briefDescription,
    logo,
  } = company;

  return (
    <div className="rounded-2xl p-5 bg-zinc-900 border border-zinc-800 shadow-md hover:shadow-xl hover:border-zinc-700 transition-all duration-300 text-white">

      {/* Top Section */}
      <div className="flex items-center gap-4">
        <div className="bg-zinc-800 p-2 rounded-xl">
          <Image
            src={logo}
            alt={companyName}
            width={45}
            height={45}
            className="rounded-lg object-cover"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            {companyName}
          </h2>
          <p className="text-sm text-zinc-400">{industry}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-400 mt-4 line-clamp-2 leading-relaxed">
        {briefDescription}
      </p>

      {/* Meta Info */}
      <div className="mt-5 space-y-2 text-sm text-zinc-400">

        <div className="flex items-center gap-2">
          <IoLocationOutline className="text-zinc-300" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiUsers className="text-zinc-300" />
          <span>{employeeCountRange}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex justify-between items-center">
        <a
          href={websiteUrl}
          target="_blank"
          className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
        >
          Visit Website <FiExternalLink />
        </a>
      </div>
    </div>
  );
};

export default CompanyCard;