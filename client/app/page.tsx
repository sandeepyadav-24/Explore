"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useItineraryStore from "./store/useItineraryStore";

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

  const handleInput = (name: keyof FormDataType, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const token = localStorage.getItem("token");

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

      const result = await response.json();
      console.log("Result--------->>" + JSON.stringify(result, null, 2));
      if (result.success) {
        setItinerary(result.responseJson as any); // Ensure TypeScript knows the expected type
        console.log(useItineraryStore.getState().itinerary);
        router.push("/itinerary", { scroll: false });
        //localStorage.setItem("itinerary", JSON.stringify(result.responseJson));
        //router.push("/itinerary", { scroll: false });
        // Navigate and pass data using state
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
      <div className="text-center max-w-3xl">
        <h1 className="text-6xl font-extrabold mb-4">
          AI-Powered Travel Companion
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Plan your trips effortlessly with AI. Get curated itineraries with
          flights, hotels, and places to visit—all in one place.
        </p>
      </div>

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

        {/* Checkbox Options */}
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) => handleInput("direct", e.target.checked)}
            />
            Direct Flights Only
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) => handleInput("nearby", e.target.checked)}
            />
            Add Nearby Airports
          </label>
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
      <div className="mt-16 text-center max-w-4xl">
        <h2 className="text-4xl font-semibold mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg">AI-Curated Itineraries</h3>
            <p className="text-gray-300">
              Personalized recommendations based on your interests.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg">Real-Time Pricing</h3>
            <p className="text-gray-300">
              Get updated flight, hotel, and transport costs instantly.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg">Seamless Booking</h3>
            <p className="text-gray-300">
              Book everything in one place with a few clicks.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg">Customer Support</h3>
            <p className="text-gray-300">
              24/7 assistance for all your travel needs.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-16 text-center max-w-3xl">
        <h2 className="text-4xl font-semibold mb-6">What Our Users Say</h2>
        <p className="text-gray-300 italic">
          "This AI planner saved me hours of research! Everything I needed in
          one click." – Rahul S.
        </p>
        <p className="text-gray-300 italic">
          "I love how it finds the best deals instantly!" – Priya M.
        </p>
      </div>
    </div>
  );
};

export default FlightSearch;
