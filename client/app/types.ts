export interface ItineraryDay {
  morning: {
    activity: string;
    best_time: string;
  };
  afternoon: {
    attraction: string;
    budget_info: string;
  };
  evening: {
    restaurant: string;
    nightlife: string;
  };
  transport: {
    mode: string;
    estimated_fare: string;
  };
  estimated_budget_breakdown: {
    total: number;
  };
}

export interface Accommodation {
  recommended_hotels: {
    luxury: string;
    mid_range: string;
    budget: string;
  };
}

export interface FoodRecommendations {
  must_try_dishes: {
    traditional: string;
    street_food: string;
  };
}

export interface BudgetBreakdown {
  flights: number;
  accommodation: number;
  food: number;
  activities: number;
  transport: number;
  misc: number;
}

export interface Itinerary {
  from: string;
  to: string;
  depart: string;
  return: string;
  class: string;
  travelers: string;
  tripStyle: string;
  itinerary: Record<string, ItineraryDay>;
  accommodation: Accommodation;
  food_recommendations: FoodRecommendations;
  budget_breakdown: BudgetBreakdown;
}
