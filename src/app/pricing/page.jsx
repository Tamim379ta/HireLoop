"use client";

import React, { useState } from "react";
import { Card, Button, Chip } from "@heroui/react";
import { FiCheck, FiZap, FiUsers } from "react-icons/fi";

const seekerPlans = [
  {
    name: "Free",
    id: "seeker_free",
    price: "$0",
    period: "forever",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs/month",
      "Basic profile",
      "Email alerts",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    id: "seeker_pro",
    price: "$19",
    period: "month",
    features: [
      "Apply to up to 30 jobs/month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
    cta: "Go Pro",
    highlight: true,
  },
  {
    name: "Premium",
    id: "seeker_premium",
    price: "$39",
    period: "month",
    features: [
      "Unlimited applications",
      "Everything in Pro",
      "Profile boost to recruiters",
      "Early access to new jobs",
      "Priority support",
    ],
    cta: "Go Premium",
    highlight: false,
  },
];

const recruiterPlans = [
  {
    name: "Free",
    id: "recruiter_free",
    price: "$0",
    period: "forever",
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
      "Great for first-year hiring",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    id: "recruiter_growth",
    price: "$49",
    period: "month",
    features: [
      "Up to 10 active job posts",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start Growing",
    highlight: true,
  },
  {
    name: "Enterprise",
    id: "recruiter_enterprise",
    price: "$149",
    period: "month",
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings",
      "Team collaboration",
      "Custom branding",
      "Priority support",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const PricingPage = () => {
  const [tab, setTab] = useState("seeker");
  const plans = tab === "seeker" ? seekerPlans : recruiterPlans;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">Simple, Transparent Pricing</h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Choose the plan that fits how you use HireLoop.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setTab("seeker")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${tab === "seeker"
                ? "bg-indigo-600 text-white shadow"
                : "text-zinc-400 hover:text-white"
                }`}
            >
              <FiUsers className="text-base" />
              Job Seekers
            </button>
            <button
              onClick={() => setTab("recruiter")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${tab === "recruiter"
                ? "bg-indigo-600 text-white shadow"
                : "text-zinc-400 hover:text-white"
                }`}
            >
              <FiZap className="text-base" />
              Recruiters
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 flex flex-col gap-5 transition-all duration-200 ${plan.highlight
                ? "bg-indigo-600/10 border-indigo-500/50"
                : "bg-zinc-900 border-zinc-800"
                }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name & price */}
              <div>
                <p className={`text-sm font-medium mb-3 ${plan.highlight ? "text-indigo-400" : "text-zinc-400"}`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-zinc-500 text-sm mb-1">/{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                    <FiCheck className={`mt-0.5 shrink-0 ${plan.highlight ? "text-indigo-400" : "text-zinc-500"}`} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}

              <form action="/api/checkout_sessions" method="POST">
              <input type="hidden" name="planId" value={plan.id} />
                <section>
                  <button
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${plan.highlight
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                      : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                      }`}
                    type="submit" role="link">
                    {plan.cta}
                  </button>
                </section>
              </form>
             
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PricingPage;