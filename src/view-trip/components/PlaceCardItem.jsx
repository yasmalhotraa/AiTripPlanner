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
      className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer"
      onClick={() => openInGoogleMaps(place?.placeName)}
    >
      <img
        src={"/PlacesPlaceholder.jpg"}
        className="w-[140px] h-[110px] rounded-xl"
      />
      <div>
        <h2 className="font-bold text-lg flex items-center">
          {place.placeName}
        </h2>
        <p className="text-sm text-gray-400">{place.placeDetails}</p>
        <p className="text-sm text-gray-500">🎟️ {place.ticketPricing}</p>
        <p className="text-sm">⭐ {place.rating}</p>

        <h2 className="flex justify-end mx-5 text-l">
          <span className="text-xs text-gray-500">Click to Get Location</span>{" "}
          <FaLocationDot className="text-gray-500" />
        </h2>
      </div>
    </div>
  );
}

export default PlaceCardItem;
