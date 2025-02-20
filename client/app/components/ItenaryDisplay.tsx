import React from "react";

import { Calendar, Utensils, Info, ArrowLeft } from "lucide-react";

const ItineraryDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rawData = location.state?.itineraryData;

  // Redirect to form if no data
  React.useEffect(() => {
    if (!rawData) navigate("/form");
  }, [rawData, navigate]);

  const {
    destination,
    duration,
    itinerary,
    accommodation,
    food_recommendations,
    budget_breakdown,
    travel_tips,
  } = rawData || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      {/* Back button */}
      <button
        onClick={() => navigate("/form")}
        className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Form
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-indigo-900 mb-4">
            Your {duration} Adventure in {destination}
          </h1>
          <div className="grid grid-cols-3 gap-4 text-gray-600">
            <div>
              <span className="font-semibold">Destination:</span> {destination}
            </div>
            <div>
              <span className="font-semibold">Duration:</span> {duration}
            </div>
          </div>
        </div>

        {/* Daily Itinerary */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold flex items-center text-gray-800">
            <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
            Daily Itinerary
          </h2>

          {itinerary &&
            Object.entries(itinerary).map(([day, details]) => (
              <div
                key={day}
                className="bg-white rounded-xl shadow-lg p-6 hover:scale-[1.01] transition-transform"
              >
                <h3 className="text-xl font-semibold text-indigo-800 mb-4">
                  {day.replace("_", " ").toUpperCase()}
                </h3>
                <div className="space-y-4">
                  {/* Morning */}
                  <div className="pl-4 border-l-2 border-indigo-200">
                    <h4 className="font-semibold text-gray-800">Morning</h4>
                    <p>Activity: {details.morning.activity}</p>
                    <p>Estimated Cost: {details.morning.estimated_cost}</p>
                    <p>Best Time: {details.morning.best_time}</p>
                  </div>

                  {/* Afternoon */}
                  <div className="pl-4 border-l-2 border-indigo-200">
                    <h4 className="font-semibold text-gray-800">Afternoon</h4>
                    <p>Attraction: {details.afternoon.attraction}</p>
                    <p>Travel Time: {details.afternoon.travel_time}</p>
                    <p>Budget Info: {details.afternoon.budget_info}</p>
                  </div>

                  {/* Evening */}
                  <div className="pl-4 border-l-2 border-indigo-200">
                    <h4 className="font-semibold text-gray-800">Evening</h4>
                    <p>Restaurant: {details.evening.restaurant}</p>
                    <p>Nightlife: {details.evening.nightlife}</p>
                    <p>
                      Relaxing Activity: {details.evening.relaxing_activity}
                    </p>
                  </div>

                  {/* Transport */}
                  <div className="pl-4 border-l-2 border-indigo-200">
                    <h4 className="font-semibold text-gray-800">Transport</h4>
                    <p>Mode: {details.transport.mode}</p>
                    <p>Estimated Fare: {details.transport.fare}</p>
                  </div>

                  {/* Budget Breakdown */}
                  <div className="pl-4 border-l-2 border-indigo-200">
                    <h4 className="font-semibold text-gray-800">
                      Budget Breakdown
                    </h4>
                    <p>
                      Accommodation:{" "}
                      {details.estimated_budget_breakdown.accommodation}
                    </p>
                    <p>Food: {details.estimated_budget_breakdown.food}</p>
                    <p>
                      Transport: {details.estimated_budget_breakdown.transport}
                    </p>
                    <p>
                      Sightseeing:{" "}
                      {details.estimated_budget_breakdown.sightseeing}
                    </p>
                    <p>
                      Miscellaneous:{" "}
                      {details.estimated_budget_breakdown.miscellaneous}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Accommodation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold flex items-center text-gray-800 mb-4">
            <Info className="w-6 h-6 mr-2 text-indigo-600" />
            Accommodation
          </h2>
          <div className="space-y-4">
            <h3 className="font-semibold text-indigo-800">Best Areas</h3>
            <p>
              <p>
                Budget-Friendly: {accommodation?.best_areas?.budget_friendly}
              </p>
            </p>
            <p>Mid-Range: {accommodation?.best_areas["mid_range"]}</p>
            <p>Luxury: {accommodation?.best_areas["luxury"]}</p>

            <h3 className="font-semibold text-indigo-800">
              Recommended Hotels
            </h3>
            <p>
              Budget: {accommodation?.recommended_hotels["budget_friendly"]}
            </p>
            <p>Mid-Range: {accommodation?.recommended_hotels["mid_range"]}</p>
            <p>Luxury: {accommodation?.recommended_hotels["luxury"]}</p>

            <h3 className="font-semibold text-indigo-800">Airbnb Options</h3>
            <p>Budget: {accommodation?.airbnb_options["budget_friendly"]}</p>
            <p>Mid-Range: {accommodation?.airbnb_options["mid_range"]}</p>
            <p>Luxury: {accommodation?.airbnb_options["luxury"]}</p>
          </div>
        </div>

        {/* Food Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold flex items-center text-gray-800 mb-4">
            <Utensils className="w-6 h-6 mr-2 text-indigo-600" />
            Food Recommendations
          </h2>
          <div className="space-y-4">
            <h3 className="font-semibold text-indigo-800">Must-Try Dishes</h3>
            <p>
              Traditional Food:{" "}
              {food_recommendations?.must_try_dishes.traditional}
            </p>
            <p>
              Street Food: {food_recommendations?.must_try_dishes.street_food}
            </p>

            <h3 className="font-semibold text-indigo-800">Top Restaurants</h3>
            <p>Budget: {food_recommendations?.top_restaurants["budget"]}</p>
            <p>
              Mid-Range: {food_recommendations?.top_restaurants["mid_range"]}
            </p>
            <p>Luxury: {food_recommendations?.top_restaurants["luxury"]}</p>

            <h3 className="font-semibold text-indigo-800">
              Street Food and Markets
            </h3>
            <p>
              Best Markets: {food_recommendations?.street_food_markets.area_1}
            </p>
            <p>
              Best Street Food:{" "}
              {food_recommendations?.street_food_markets.area_2}
            </p>
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold flex items-center text-gray-800 mb-4">
            <Info className="w-6 h-6 mr-2 text-indigo-600" />
            Budget Breakdown
          </h2>
          <div className="space-y-4">
            <p>Accommodation: {budget_breakdown?.accommodation}</p>
            <p>Food and Drinks: {budget_breakdown?.food_drinks}</p>
            <p>
              Transport and Local Travel:{" "}
              {budget_breakdown?.transport_local_travel}
            </p>
            <p>Sightseeing: {budget_breakdown?.sightseeing_activities}</p>
            <p>Miscellaneous: {budget_breakdown?.miscellaneous_expenses}</p>
          </div>
        </div>

        {/* Travel Tips */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold flex items-center text-gray-800 mb-4">
            <Info className="w-6 h-6 mr-2 text-indigo-600" />
            Travel Tips
          </h2>
          <div className="space-y-4">
            <h3 className="font-semibold text-indigo-800">
              Local Customs and Etiquette
            </h3>
            <p>
              Respect for Local Culture:{" "}
              {travel_tips?.local_customs_and_etiquette}
            </p>
            {/**<p>Language: {travel_tips?.local_customs_and_etiquette.language}</p> */}

            <h3 className="font-semibold text-indigo-800">
              Best Transport Modes
            </h3>
            <p>Local : {travel_tips?.best_transport_modes.local}</p>
            <p>outstation: {travel_tips?.best_transport_modes.outstation}</p>
            {/**<p>Rent a Bike: {travel_tips?.best_transport_modes.rent_a_bike}</p> */}

            <h3 className="font-semibold text-indigo-800">
              Money Saving Travel Tips
            </h3>
            <p>
              Use Local Transport:{" "}
              {travel_tips?.money_saving_tips.accommodation}
            </p>
            <p>Eat at Local Eateries: {travel_tips?.money_saving_tips.food}</p>
            <p>
              Avoid Tourist Traps: {travel_tips?.money_saving_tips.transport}
            </p>

            <h3 className="font-semibold text-indigo-800">
              Safety Considerations
            </h3>
            <p>
              Be Aware of Your Surroundings:{" "}
              {travel_tips?.safety_considerations.health}
            </p>
            <p>
              Stay with a Group: {travel_tips?.safety_considerations.security}
            </p>
            {/**<p>
              Follow Local Advice:{" "}
              {travel_tips?.safety_considerations.follow_local_advice}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDisplay;
