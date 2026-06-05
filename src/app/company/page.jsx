import { GetCompany } from '@/lib/api/companies';
import React from 'react';
import CompanyCard from './CompanyCard';

const CompanyPage = async () => {
  const companies = await GetCompany();

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Explore Companies 🏢
        </h1>
        <p className="text-gray-500 mt-1">
          Discover top companies and their opportunities
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard key={company._id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default CompanyPage;