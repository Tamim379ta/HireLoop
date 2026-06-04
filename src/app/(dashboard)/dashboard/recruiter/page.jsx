"use client"

import StatsBar from "@/components/dashboard/StatsBar";
import { useSession } from "@/lib/auth-client";

const RecruterHomePage =  () => {

    const { data: session, isPending } = useSession();

    if (isPending) {
        return <div>Loading...</div>
    }

    const user = session?.user
  return (
    <div>

      <h1 className="p-5 text-3xl font font-semibold"> welcome back {user?.name}</h1>

       <StatsBar/>
    </div>
  );
};

export default RecruterHomePage;