import React from "react";
import { FaLocationDot } from "react-icons/fa6";

function PlaceCardItem({ place }) {
  // Function to generate Google Maps link for Place name and address
  const openInGoogleMaps = (name) => {
    const searchQuery = `${name}`;
    const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
      searchQuery
    )}`;
    window.open(googleMapsUrl, "_blank"); // Opens in a new tab
  };

  return (
    <div
      className="border rounded-xl p-3 mt-2 flex max-600:flex-col max-600:gap-2 gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer"
      onClick={() => openInGoogleMaps(place?.placeName)}
    >
      <img
        src={"/PlacesPlaceholder.jpg"}
        className="w-[140px] h-[110px] max-600:w-full max-600:h-[150px] rounded-xl"
      />
      <div>
        <h2 className="font-bold text-lg flex items-center">
          {place.placeName || "Place Name"}
        </h2>
        <p className="text-sm text-gray-400">
          {place.placeDetails || "place details not available."}
        </p>

        <p className="text-sm text-gray-500">
          🎟️
          {typeof place.ticketPricing === "string"
            ? place.ticketPricing // Render if it's a string
            : place.ticketPricing?.amount && place.ticketPricing?.currency
            ? `${place.ticketPricing.amount} ${place.ticketPricing.currency}` // Render if it's an object with amount and currency
            : "No pricing available"}{" "}
        </p>

        <p className="text-sm">⭐ {place.rating || "ratings not available"}</p>

        <h2 className="flex justify-end mx-5 text-l">
          <span className="text-xs text-gray-500">Click to Get Location</span>{" "}
          <FaLocationDot className="text-gray-500" />
        </h2>
      </div>
    </div>
  );
}

export default PlaceCardItem;
