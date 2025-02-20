export const generatePromt = (tripData: any) => {
  // Extract fields from tripData
  const {
    from,
    to,
    depart,
    return: returnDate,
    class: travelClass,
    direct,
    nearby,
    travelers,
    tripStyle,
  } = tripData;
  const prompt = `
You are an expert travel planner. Generate a structured trip plan for a journey from ${from} to ${to}.
The trip details are as follows:
- Departure Date: ${depart || "Not specified"}
- Return Date: ${returnDate || "Not specified"}
- Travel Class: ${travelClass || "Not specified"}
- Direct Flight: ${direct ? "Yes" : "No"}
- Include Nearby Attractions: ${nearby ? "Yes" : "No"}
- Number of Travelers: ${travelers || "Not specified"}
- Trip Style: ${tripStyle || "Not specified"}

Strictly Generate response Format in this structured JSON:
{
  "from": "string", // Starting location
  "to": "string", // Destination
  "depart": "string", // Departure date
  "return": "string", // Return date
  "class": "string", // Travel class
  "direct": "boolean", // Whether the flight is direct
  "nearby": "boolean", // Whether to include nearby attractions
  "travelers": "string", // Number of travelers
  "tripStyle": "string", // Trip style (e.g., luxury, budget)
  "itinerary": {
    "day_1": {
      "morning": {
        "activity": "string", // Activity for the morning
        "estimated_cost": "string", // Estimated cost for the activity
        "best_time": "string" // Best time for the activity
      },
      "afternoon": {
        "attraction": "string", // Attraction to visit
        "travel_time": "string", // Travel time to the attraction
        "budget_info": "string" // Budget information for the attraction
      },
      "evening": {
        "restaurant": "string", // Recommended restaurant
        "nightlife": "string", // Nightlife activity
        "relaxing_activity": "string" // Relaxing activity
      },
      "transport": {
        "mode": "string", // Mode of transport
        "estimated_fare": "string" // Estimated fare for transport
      },
      "estimated_budget_breakdown": {
        "accommodation": "string", // Estimated accommodation cost
        "food": "string", // Estimated food cost
        "transport": "string", // Estimated transport cost
        "activities": "string", // Estimated activity cost
        "total": "string" // Total estimated cost for the day
      }
    },
    // Repeat for other days
  },
  "accommodation": {
    "best_areas": {
      "budget_friendly": "string", // Budget-friendly areas to stay
      "mid_range": "string", // Mid-range areas to stay
      "luxury": "string" // Luxury areas to stay
    },
    "recommended_hotels": {
      "budget": "string", // Budget hotel recommendations
      "mid_range": "string", // Mid-range hotel recommendations
      "luxury": "string" // Luxury hotel recommendations
    },
    "airbnb_options": {
      "shared_room": "string", // Shared room Airbnb options
      "entire_home": "string" // Entire home Airbnb options
    }
  },
  "food_recommendations": {
    "must_try_dishes": {
      "traditional": "string", // Traditional dishes to try
      "street_food": "string" // Street food to try
    },
    "top_restaurants": {
      "budget": "string", // Budget-friendly restaurants
      "mid_range": "string", // Mid-range restaurants
      "luxury": "string" // Luxury restaurants
    },
    "street_food_markets": {
      "area_1": "string", // Street food markets in a specific area
      "area_2": "string" // Street food markets in another area
    }
  },
  "budget_breakdown": {
    "accommodation": "string", // Estimated accommodation cost
    "food_drinks": "string", // Estimated food and drinks cost
    "transport_local_travel": "string", // Estimated transport cost
    "sightseeing_activities": "string", // Estimated sightseeing and activities cost
    "miscellaneous_expenses": "string" // Estimated miscellaneous expenses
  },
  "travel_tips": {
    "local_customs_etiquette": "string", // Local customs and etiquette
    "best_transport_modes": {
      "local": "string", // Best local transport modes
      "outstation": "string" // Best outstation transport modes
    },
    "estimated_fares": {
      "mode_1": "string", // Estimated fare for a specific transport mode
      "mode_2": "string" // Estimated fare for another transport mode
    },
    "money_saving_tips": {
      "accommodation": "string", // Money-saving tips for accommodation
      "food": "string", // Money-saving tips for food
      "transport": "string" // Money-saving tips for transport
    },
    "safety_considerations": {
      "health": "string", // Health safety tips
      "security": "string" // Security safety tips
    }
  }
}
`;
  return prompt;
};
