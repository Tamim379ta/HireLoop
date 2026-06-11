import { serverFetch } from "../core/server";

export const getplanById = async (planId) => {
  const result = await serverFetch(`/api/plans?plan_id=${planId}`);
  return result[0];
}


// export const getplanById = async (planId) => {
//   return serverFetch(`/api/plans?plan_id=${planId}`);
//    }