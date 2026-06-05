import { serverFetch } from "../core/server";

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL;

export const getJobs = async () => {
  return serverFetch(`/api/jobs`);
};

export const getJobById = async (jobId) => {
  return serverFetch(`/api/jobs/${jobId}`);
};



export const getAllJobs = async () => {
  const res = await fetch(`${baseUrl}/api/jobs`);

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return res.json();
};



export const getCompanyJobs = async (companyId) => {
  const res = await fetch(
    `${baseUrl}/api/jobs?companyId=${companyId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch company jobs");
  }

  return res.json();
};