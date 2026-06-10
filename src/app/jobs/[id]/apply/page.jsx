import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';

const ApplyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();

  if (!user) {
    redirect(`/signIn?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-zinc-950">
        Only job seekers can apply for jobs
      </div>
    );
  }

  const job = await getJobById(id);
  return (
    <div>

      <JobApply job={job} applicant={user} />
    </div>
  );
};

export default ApplyPage;