import { Button } from "@heroui/react";
import { Search, MapPin } from "lucide-react";
import StatsSection from "./StatsSection";

export default function HeroSection() {
  return (
    <section
      className=" pt-28 pb-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/globe.png')" }}
    >
      {/* HERO SECTION */}
      <div
        className="container mx-auto flex items-center justify-center"
      >
        <div className="max-w-5xl w-full px-6 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm text-white/80 backdrop-blur-md">
            <span className="text-yellow-400">💼</span>
            50,000+ new jobs this month
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white leading-tight">
            Find Your Dream Job Today
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role faster.
          </p>

          {/* Search Bar */}
          <div className="mt-10 flex flex-col md:flex-row gap-3 items-center justify-center">

            <div className="flex w-full md:w-[500px] items-center gap-2 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-md">
              <Search size={18} className="text-white/60" />
              <input
                type="text"
                placeholder="Job title, skill or company"
                className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
              />
            </div>

            <div className="flex w-full md:w-[300px] items-center gap-2 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-md">
              <MapPin size={18} className="text-white/60" />
              <input
                type="text"
                placeholder="Location or Remote"
                className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
              />
            </div>

            <Button className="h-[48px] px-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl">
              Search
            </Button>
          </div>

          {/* Trending */}
          <div className="mt-6 flex items-center flex-wrap justify-center gap-2 text-sm text-white/50">
            <span>Trending:</span>
            <span className="px-3 py-1 border border-white/10 rounded-full">Product Designer</span>
            <span className="px-3 py-1 border border-white/10 rounded-full">AI Engineering</span>
            <span className="px-3 py-1 border border-white/10 rounded-full">DevOps Engineer</span>
          </div>
        </div>
      </div>

      {/* STATS SECTION (outside hero) */}
      <StatsSection />
    </section>
  );
}