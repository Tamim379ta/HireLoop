import React from "react";
import JobsPage from "./JobsPage"; // Adjust path as necessary
import { getCompanyJobs } from "@/lib/api/jobs";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

const JobPage = async () => {
  const companyId = await getLoggedInRecruiterCompany();
  const jobs = await getCompanyJobs(companyId._id);
  
  return (
    <div>
      <JobsPage initialJobs={jobs} />
    </div>
  );
};

export default JobPage;