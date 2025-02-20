"use client";

import { useState } from "react";
import useItineraryStore from "../store/useItineraryStore";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Itinerary = () => {
  const itineraryData = useItineraryStore((state) => state.itinerary);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const [error, setError] = useState<string | null>(null);

  if (!itineraryData) {
    return <p className="text-center text-gray-500">No itinerary found.</p>;
  }

  const headers = {
    "Content-Type": "application/json",
    ...(session.data?.user?.token && {
      Authorization: `Bearer ${session.data.user.token}`,
    }),
  };

  const {
    from,
    to,
    depart,
    return: returnDate,
    class: travelClass,
    travelers,
    tripStyle,
    itinerary,
    accommodation,
    food_recommendations,
  } = itineraryData;

  // Function to save trip to backend
  const handleSaveTrip = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `{process.env.NEXT_PUBLIC_API_URL}/api/v1/trip/save`,
        {
          method: "POST",
          headers: headers,
          credentials: "include",
          body: JSON.stringify({
            destination: to,
            duration: `${depart} - ${returnDate}`,
            budget: 0, // Add budget logic if available
            travelers,
            itinerary,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save trip");

      alert("Trip saved successfully!");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        ← Back to Home
      </button>

      {/* Save Trip Button */}
      <button
        onClick={handleSaveTrip}
        className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Trip"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Trip Overview */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Trip Itinerary</h1>
        <p className="text-gray-700">
          {from} ➝ {to} ({travelClass})
        </p>
        <p className="text-gray-500">
          {depart} - {returnDate} | {travelers} Traveler(s) | {tripStyle} Trip
        </p>
      </div>

      {/* Itinerary Details */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Daily Itinerary</h2>
        {Object.keys(itinerary).map((day) => (
          <div key={day} className="border p-4 my-4 rounded-lg bg-gray-100">
            <h3 className="text-lg font-bold text-gray-700">
              {day.replace("_", " ")}
            </h3>
            <div className="mt-2">
              <p>
                <strong>Morning:</strong> {itinerary[day].morning.activity} (
                {itinerary[day].morning.best_time})
              </p>
              <p>
                <strong>Afternoon:</strong>{" "}
                {itinerary[day].afternoon.attraction} (
                {itinerary[day].afternoon.budget_info})
              </p>
              <p>
                <strong>Evening:</strong> {itinerary[day].evening.restaurant},{" "}
                {itinerary[day].evening.nightlife}
              </p>
              <p>
                <strong>Transport:</strong> {itinerary[day].transport.mode} -{" "}
                {itinerary[day].transport.estimated_fare}
              </p>
              <p>
                <strong>Daily Budget:</strong> ₹
                {itinerary[day].estimated_budget_breakdown.total}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Accommodation */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Accommodation</h2>
        <p>
          <strong>Luxury:</strong> {accommodation.recommended_hotels.luxury}
        </p>
        <p>
          <strong>Mid-range:</strong>{" "}
          {accommodation.recommended_hotels.mid_range}
        </p>
        <p>
          <strong>Budget:</strong> {accommodation.recommended_hotels.budget}
        </p>
      </div>

      {/* Food Recommendations */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Food Recommendations
        </h2>
        <p>
          <strong>Must-Try:</strong>{" "}
          {food_recommendations.must_try_dishes.traditional}
        </p>
        <p>
          <strong>Street Food:</strong>{" "}
          {food_recommendations.must_try_dishes.street_food}
        </p>
      </div>
    </div>
  );
};

export default Itinerary;
