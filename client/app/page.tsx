"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useItineraryStore from "./store/useItineraryStore";
import Feature from "./components/Feature";
import Testimonial from "./components/Testimonial";
import Hero from "./components/Hero";
import { Itinerary } from "./types"; // Adjust path accordingly

interface FormDataType {
  from?: string;
  to?: string;
  depart?: string;
  return?: string;
  class?: string;
  direct?: boolean;
  nearby?: boolean;
  travelers?: string;
  tripStyle?: string;
}

const FlightSearch: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();
  const setItinerary = useItineraryStore((state) => state.setItinerary);

  const headers = {
    "Content-Type": "application/json",
    ...(session.data?.user?.token && {
      Authorization: `Bearer ${session.data.user.token}`,
    }),
  };

  const handleInput = (
    name: keyof FormDataType,
    value: string | boolean | number
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/trip/generate`,
        {
          method: "POST",
          credentials: "include",
          headers: headers,
          body: JSON.stringify(formData),
        }
      );

      //const result = await response.json();
      const result: {
        success: boolean;
        responseJson?: Itinerary;
        error?: string;
      } = await response.json();

      if (result.success && result.responseJson) {
        // Transform the itinerary property to match the ItineraryDay structure
        // Transform itinerary to ensure it matches the ItineraryDay structure
        const transformedItinerary: Itinerary = {
          ...result.responseJson,
          itinerary: Object.fromEntries(
            Object.entries(result.responseJson.itinerary).map(
              ([day, details]) => [
                day,
                {
                  morning: details.morning ?? {
                    activity: "No activity planned",
                    best_time: "N/A",
                  },
                  afternoon: details.afternoon ?? {
                    attraction: "No attraction planned",
                    budget_info: "N/A",
                  },
                  evening: details.evening ?? {
                    restaurant: "No restaurant planned",
                    nightlife: "N/A",
                  },
                  transport:
                    typeof details.transport === "string"
                      ? { mode: details.transport, estimated_fare: "N/A" }
                      : details.transport || {
                          mode: "Unknown",
                          estimated_fare: "N/A",
                        },

                  estimated_budget_breakdown: {
                    total: Number(details.estimated_budget_breakdown) || 0,
                  },
                },
              ]
            )
          ),
        };

        setItinerary(transformedItinerary);
        console.log(useItineraryStore.getState().itinerary);
        router.push("/itinerary", { scroll: false });
      } else {
        throw new Error(result.error || "Failed to generate itinerary");
      }
    } catch (error) {
      console.error("Error generating itinerary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white p-8 flex flex-col items-center">
      {/* Hero Section */}
      <Hero />

      {/* Search Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl mt-10">
        {/* From & To Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="From (e.g. Delhi)"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handleInput("from", e.target.value)}
          />
          <input
            type="text"
            placeholder="To (e.g. Bangalore)"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handleInput("to", e.target.value)}
          />
        </div>

        {/* Date, Class, & Trip Style */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <input
            type="date"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handleInput("depart", e.target.value)}
          />
          <input
            type="date"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handleInput("return", e.target.value)}
          />
          <select
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handleInput("class", e.target.value)}
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First Class">First Class</option>
          </select>
          <select
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handleInput("tripStyle", e.target.value)}
          >
            <option value="Budget">Budget</option>
            <option value="Cheap">Cheap</option>
            <option value="Luxury">Luxury</option>
            <option value="Standard">Standard</option>
          </select>
        </div>

        {/* Number of Travelers */}
        <div className="mb-4">
          <label className="text-white block mb-2">Number of Travelers</label>
          <input
            type="number"
            min="1"
            max="10"
            defaultValue="1"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handleInput("travelers", e.target.value)}
          />
        </div>

        {/* Search Button */}
        <button
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          onClick={clickHandler}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search Travels"}
        </button>
      </div>

      {/* Features Section */}
      <Feature />

      {/* Testimonials */}
      <Testimonial />
    </div>
  );
};

export default FlightSearch;
