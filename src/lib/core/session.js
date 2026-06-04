import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserSession = async () => { 
  const sessionn = await auth.api.getSession({
    headers: await headers(),
  });

  return sessionn.user || null;
}