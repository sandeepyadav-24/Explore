"use client";

import { useState } from "react";
import { fetchWithAuth } from "../util/api";

export default function TripForm() {
  const [tripData, setTripData] = useState({
    destination: "",
    duration: "",
    budget: 0,
    travelers: 1,
    itinerary: null,
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetchWithAuth(
        "http://localhost:8787/trips/generate",
        {
          method: "POST",
          body: JSON.stringify(tripData),
        }
      );
      console.log("Generated itinerary:", response);
      if (response.success) {
        setTripData((prev) => ({ ...prev, itinerary: response.itinerary }));
      }
    } catch (error) {
      console.error("Failed to generate itinerary:", error);
    }
  };

  const handleSave = async () => {
    if (!tripData.itinerary) {
      alert("Please generate an itinerary first");
      return;
    }

    try {
      const response = await fetchWithAuth("http://localhost:8787/trips/save", {
        method: "POST",
        body: JSON.stringify(tripData),
      });
      console.log("Trip saved:", response);
    } catch (error) {
      console.error("Failed to save trip:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleGenerate}>
        <input
          type="text"
          placeholder="Destination"
          value={tripData.destination}
          onChange={(e) =>
            setTripData({ ...tripData, destination: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Duration"
          value={tripData.duration}
          onChange={(e) =>
            setTripData({ ...tripData, duration: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Budget"
          value={tripData.budget}
          onChange={(e) =>
            setTripData({ ...tripData, budget: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Number of Travelers"
          value={tripData.travelers}
          onChange={(e) =>
            setTripData({ ...tripData, travelers: Number(e.target.value) })
          }
        />
        <button type="submit">Generate Itinerary</button>
      </form>

      {tripData.itinerary && (
        <div>
          <h3>Generated Itinerary</h3>
          <pre>{JSON.stringify(tripData.itinerary, null, 2)}</pre>
          <button onClick={handleSave}>Save Trip</button>
        </div>
      )}
    </div>
  );
}
