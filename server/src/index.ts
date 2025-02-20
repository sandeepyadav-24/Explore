import { Hono } from "hono";
import { cors } from "hono/cors";
import { authMiddleware } from "./middleware/auth";
import { z } from "zod";
import { tripRouter } from "./routes/trip";

const app = new Hono<{
  Bindings: {
    CLIENT_URL: string;
    NEXTAUTH_SECRET: string;
  };
  Variables: {
    user: any;
  };
}>();

// Get the CLIENT_URL from bindings at initialization
//const CLIENT_URL = app.get("/", (c) => c.env.CLIENT_URL);

// Setup CORS
app.use(
  "/*",
  cors({
    origin: (origin, c) => c.env.CLIENT_URL,
    credentials: true,
  })
);

app.route("/api/v1/trip", tripRouter);

// Protected routes
app.get("/protected", authMiddleware, (c) => {
  const user = c.get("user"); // Get the user data set in middleware
  console.log(user);
  return c.json({
    message: "Protected route accessed successfully",
    user,
  });
});

export default app;
