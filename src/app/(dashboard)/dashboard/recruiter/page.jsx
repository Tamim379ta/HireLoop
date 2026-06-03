"use client"

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


    </div>
  );
};

export default RecruterHomePage;