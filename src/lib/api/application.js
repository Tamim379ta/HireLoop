import { protectedFetch, serverFetch } from "../core/server";

export const getApplicationById = async (applicantId) => {
  return protectedFetch(`/api/applications?applicantId=${applicantId}`);
}