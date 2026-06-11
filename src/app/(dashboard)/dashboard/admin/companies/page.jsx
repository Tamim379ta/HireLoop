import { GetCompany } from '@/lib/api/companies';
import CompanyTable from './CompanyTable';

const CompanyPage = async () => {
  const companies = await GetCompany();

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white">Company Management</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {companies?.length ?? 0} compan{companies?.length !== 1 ? 'ies' : 'y'} registered
          </p>
        </div>
        <CompanyTable companies={companies} />
      </div>
    </div>
  );
};

export default CompanyPage;