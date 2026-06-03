import React from "react";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden px-4 py-20 text-center">

      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/cta-bg.png')", // your public folder image
        }}
      />

      {/* Optional dark overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">

        {/* Heading */}
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight">
          Your next role is <br />
          <span className="block mt-2">already waiting for you</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-white/70 max-w-2xl font-light">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">

          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition text-center"
          >
            Create a free account
          </Link>

          <Link
            href="/pricing"
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-medium rounded-xl border border-white/20 hover:border-white/40 transition text-center"
          >
            View pricing
          </Link>

        </div>
      </div>
    </section>
  );
}