import { getUserSession } from '@/lib/core/session';
import RegisterCompanyPage from './RegisterCompanyPage';
import { getRecruiterCompany } from '@/lib/api/companies';

const CompanyPage = async () => {

  const user = await getUserSession();
  const company = await getRecruiterCompany(user?.id);
  return (
    <div>
      
      <RegisterCompanyPage recruiter={user} company={company} />
    </div>
  );
};

export default CompanyPage;