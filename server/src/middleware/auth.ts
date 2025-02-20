import { Context, Next } from "hono";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  console.log("Auth header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ message: "No token provided" }, 401);
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token);

  try {
    // Verify token with Google
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${token}`
    );

    if (!response.ok) {
      return c.json({ message: "Invalid token" }, 401);
    }

    const userData = await response.json();
    console.log("Verified user data:", userData);

    c.set("user", userData);
    await next();
  } catch (e) {
    console.error("Token verification error:", e);
    return c.json({ message: "Invalid token" }, 401);
  }
};
