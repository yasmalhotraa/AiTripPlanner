import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div className="mt-4">
      <h2 className="font-bold text-lg">Places to Visit</h2>

      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index} className="mt-5">
            <h2 className="font-medium text-lg">{item?.day}</h2>
            <div className="grid md:grid-cols-2 gap-3 max-600:gap-2">
              {item.places.map((place, index) => (
                <div className="" key={index}>
                  <h2 className="font-medium text-sm text-orange-600">
                    {typeof place.time === "string"
                      ? place.time || "Time not available"
                      : place.time
                      ? `${place.time.from || "Start time not set"} - ${
                          place.time.to || "End time not set"
                        }`
                      : "Time not available"}
                  </h2>

                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
