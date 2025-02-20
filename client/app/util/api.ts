import { getSession } from "next-auth/react";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const session = await getSession();
  console.log("Session in fetchWithAuth:", session);

  const headers = {
    "Content-Type": "application/json",
    ...(session?.user?.token && {
      Authorization: `Bearer ${session.user.token}`,
    }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Server response:", errorData);
    throw new Error("Network response was not ok");
  }

  return response.json();
};
