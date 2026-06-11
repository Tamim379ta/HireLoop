'use server';

import { serverMutation } from "../core/server";

export const createSubscriptions = async (subInfo) => { 
  return serverMutation("/api/subscriptions", subInfo);
}