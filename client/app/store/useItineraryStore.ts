import { create } from "zustand";
import { ItineraryDay } from "../types"; // Adjust path accordingly

interface Accommodation {
  recommended_hotels: {
    luxury: string;
    mid_range: string;
    budget: string;
  };
}

interface FoodRecommendations {
  must_try_dishes: {
    traditional: string;
    street_food: string;
  };
}

interface BudgetBreakdown {
  flights: number;
  accommodation: number;
  food: number;
  activities: number;
  transport: number;
  misc: number;
}

interface Itinerary {
  from: string;
  to: string;
  depart: string;
  return: string;
  class: string;
  travelers: string;
  tripStyle: string;
  itinerary: Record<string, ItineraryDay>; // Dynamic days (e.g., "Day_1", "Day_2")
  accommodation: Accommodation;
  food_recommendations: FoodRecommendations;
  budget_breakdown: BudgetBreakdown;
}

interface ItineraryStore {
  itinerary: Itinerary | null;
  setItinerary: (data: Itinerary) => void;
  clearItinerary: () => void;
}

const useItineraryStore = create<ItineraryStore>((set) => ({
  itinerary: null, // Initial state
  setItinerary: (data) => set({ itinerary: data }), // Update state
  clearItinerary: () => set({ itinerary: null }), // Clear state
}));

export default useItineraryStore;
