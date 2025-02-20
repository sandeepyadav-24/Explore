import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { z } from "zod";
//import prisma from "../lib/prisma";
import { generatePromt } from "../lib/prompt";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Groq } from "groq-sdk";

type AppBindings = {
  Bindings: {
    CLIENT_URL: string;
    NEXTAUTH_SECRET: string;
    KEY: string;
  };
  Variables: {
    user: any;
  };
};

export const tripRouter = new Hono<AppBindings>();

// Define validation schema
const tripSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  depart: z.string().optional(),
  return: z.string().optional(),
  class: z.string().optional(),
  direct: z.boolean().optional(),
  nearby: z.boolean().optional(),
  travelers: z.string().optional(),
  tripStyle: z.string().optional(),
});

// Define Zod schema for trip validation
const saveTripSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  duration: z.number().min(1, "Duration must be at least 1 day"),
  budget: z.number().min(0, "Budget must be a positive number"),
  travelers: z.number().min(1, "At least one traveler is required"),
  itinerary: z
    .object({})
    .refine(
      (obj) => Object.keys(obj).length > 0,
      "Itinerary must not be empty"
    ),
  accommodation: z.object({}).optional(),
  food_recommendations: z.object({}).optional(),
});
// Generate Itinerary
tripRouter.post("/generate", authMiddleware, async (c) => {
  //const prisma = new PrismaClient().$extends(withAccelerate());
  try {
    const body = await c.req.json();
    console.log(body);
    // Zod Validation
    const validatedData = tripSchema.parse(body);

    const groq = new Groq({ apiKey: c.env.KEY });
    // Prompt Generation
    const prompt = generatePromt(validatedData);
    // AI Model
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    // Extract and parse the response
    const responseText =
      chatCompletion.choices[0]?.message?.content?.trim() || "";
    const cleanedResponse = responseText
      .replace(/^```json/, "")
      .replace(/```$/, "")
      .trim();

    let responseJson;
    try {
      responseJson = JSON.parse(cleanedResponse);
    } catch (error) {
      console.error("Failed to parse response as JSON:", responseText);
      throw new Error("AI response parsing failed");
    }
    console.log("Response JSON:", responseJson);
    return c.json({ success: true, responseJson });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors.map((err) => err.message) }, 400);
    }
    return c.json({ error: "Something went wrong" }, 500);
  }
});

// Save Trip
tripRouter.post("/save", authMiddleware, async (c) => {
  const prisma = new PrismaClient().$extends(withAccelerate());
  const user = c.get("user");
  console.log(user);
  if (!user?.sub) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const body = await c.req.json();

    // Validate request data using Zod
    const validation = saveTripSchema.safeParse(body);
    if (!validation.success) {
      return c.json(
        { error: "Invalid input", details: validation.error.format() },
        400
      );
    }

    const {
      destination,
      duration,
      budget,
      travelers,
      itinerary,
      accommodation,
      food_recommendations,
    } = validation.data;

    const trip = await prisma.trip.create({
      data: {
        userId: user.sub, // Ensure this field matches Prisma schema
        destination: destination || "", // Ensure this field exists in Prisma schema
        duration: duration ?? 1,
        budget: budget ?? 0,
        travelers: travelers ?? 1,
        itinerary,
        accommodation,
        food_recommendations,
      },
    });

    return c.json({ success: true, trip }, 201);
  } catch (error) {
    console.error("Error saving trip:", error);
    return c.json({ error: "Failed to save trip" }, 500);
  }
});

// Get Saved Trips
tripRouter.get("/saved", authMiddleware, async (c) => {
  const prisma = new PrismaClient().$extends(withAccelerate());
  const user = c.get("user");
  console.log(user);
  if (!user?.sub) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const trips = await prisma.trip.findMany({
      where: {
        userId: user.sub,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return c.json({ success: true, trips });
  } catch (error) {
    return c.json({ error: "Failed to fetch trips" }, 500);
  }
});
