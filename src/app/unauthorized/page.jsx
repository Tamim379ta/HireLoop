"use client";

import { useRouter } from "next/navigation";
import { FiShieldOff } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-white px-6">
      <div className="text-center max-w-md w-full bg-[#121826] border border-white/10 rounded-2xl p-8 shadow-xl">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-500/10 p-4 rounded-full">
            <FiShieldOff className="text-red-400 text-4xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">403 - Unauthorized</h1>

        {/* Message */}
        <p className="text-gray-400 mb-6">
          You don’t have permission to access this page.
          Please contact your administrator if you think this is a mistake.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded-lg"
          >
            <FaArrowLeft />
            Go Back
          </button>

          <button
            onClick={() => router.push("/")}
            className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}