
import StatsBar from "@/components/dashboard/StatsBar";
import JobPage from "./jobs/page";
import { getUserSession } from "@/lib/core/session";

const RecruterHomePage = async () => {

  const user = await getUserSession();

  return (
    <div>

      <h1 className="p-5 text-4xl  font-semibold"> welcome back {user?.name}</h1>

       <StatsBar/>

       <JobPage/>
    </div>
  );
};

export default RecruterHomePage;