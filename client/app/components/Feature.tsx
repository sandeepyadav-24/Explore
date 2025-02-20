import React from "react";

const Feature = () => {
  return (
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
            {`24/7 assistance for all your travel needs.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
