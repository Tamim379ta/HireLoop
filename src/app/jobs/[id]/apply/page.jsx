import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { getApplicationById } from '@/lib/api/application';
import { FiZap } from 'react-icons/fi';
import { getplanById } from '@/lib/api/plans';

const ApplyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();

  if (!user) {
    redirect(`/signIn?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <p className="text-zinc-400 text-sm">Only job seekers can apply for jobs.</p>
      </div>
    );
  }

  const applicationLength = await getApplicationById(user?.id);
  const plan = await getplanById(user?.plan || "seeker_free");
  const job = await getJobById(id);

  const currentCount = applicationLength?.length || 0;
  const isLimitReached = plan.maxApplications !== -1 && currentCount >= plan.maxApplications;
  const percentage = plan.maxApplications === -1 ? 100 : Math.min((currentCount / plan.maxApplications) * 100, 100);
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-4">

        {/* Usage Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1 capitalize">{plan.name} Plan</p>
            <p className="text-sm text-zinc-300">
              <span className={`font-semibold ${isLimitReached ? 'text-amber-400' : 'text-white'}`}>
                {currentCount}
              </span>
              <span className="text-zinc-500">/{plan.maxApplications}</span>{' '}
              applications used this month
            </p>
          </div>
          <div className="w-28 shrink-0">
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${isLimitReached ? 'bg-amber-500' : 'bg-indigo-500'
                  }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-right text-xs text-zinc-600 mt-1">{Math.round(percentage)}%</p>
          </div>
        </div>
        {!isLimitReached ? (
          <JobApply job={job} applicant={user} />
        ) : (
          <div className="flex flex-col items-center text-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
              <FiZap className="text-amber-400 text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Application Limit Reached</h2>
              <p className="text-sm text-zinc-400 mt-1 max-w-xs mx-auto">
                You've used all {plan.maxApplications} applications on the free plan. Upgrade to keep applying.
              </p>
            </div>
            <a
              href="/pricing"
              className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
            >
              <FiZap className="text-sm" />
              Upgrade Plan
            </a>
          </div>
        )}
      </div>

    </div>
  );
};

export default ApplyPage;