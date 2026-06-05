import { getAllJobs } from '@/lib/api/jobs';
import JobsClient from './JobsClient';

const AllJobsPage = async () => {
  const jobs = await getAllJobs();
  return <JobsClient jobs={jobs} />;
};

export default AllJobsPage;