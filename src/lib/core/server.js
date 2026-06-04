const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const serverFetch = async (path) => {
  const res = await fetch(`${baseurl}${path}`);
  // handle 401, 404, 403
  return res.json();
}


export const serverMutation = async (path, data) => {
  const res = await fetch(`${baseurl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });

  return res.json();
}