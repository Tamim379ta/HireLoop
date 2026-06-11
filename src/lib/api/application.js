import { serverFetch } from "../core/server";

export const getApplicationById = async (applicantId) => {
  return serverFetch(`/api/applications?applicantId=${applicantId}`);
}