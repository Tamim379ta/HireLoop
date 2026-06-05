
import StatsBar from "@/components/dashboard/StatsBar";
import JobPage from "./jobs/page";
import { getUserSession } from "@/lib/core/session";

const RecruterHomePage = async () => {

  const user = await getUserSession();
  console.log("user session", user);

    // const { data: session, isPending } = useSession();

    // if (isPending) {
    //     return <div>Loading...</div>
    // }

    // const user = session?.user
  return (
    <div>

      <h1 className="p-5 text-3xl font font-semibold"> welcome back {user?.name}</h1>

       <StatsBar/>

       <JobPage/>
    </div>
  );
};

export default RecruterHomePage;