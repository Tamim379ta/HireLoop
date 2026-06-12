import { getUserToken } from "./session";

const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const authHeader = async () => {
  const token = await getUserToken();
  const header = {
    authorization: `Bearer ${token}`
  }

  return header;
}
export const serverFetch = async (path) => {
  const res = await fetch(`${baseurl}${path}`);
  // handle 401, 404, 403
  return res.json();
}

export const protectedFetch = async (path) => {
  const res = await fetch(`${baseurl}${path}` , {
    headers: await authHeader()
  });

  return res.json();
}


export const serverMutation = async (path, data, method = 'POST') => {
  const res = await fetch(`${baseurl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ... await authHeader()
    },
    body: JSON.stringify(data),
  });

  return res.json();
}