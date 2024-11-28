import React from "react";

function InfoSection({ trip }) {
  return (
    <div>
      <img
        src="/placeholder.jpg"
        className="h-[300px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-xl">{trip?.userSelection?.location}</h2>
          <div className="flex gap-5 max-600:flex-col max-600:gap-3 ">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 ">
              📅 {trip?.userSelection?.noOfDays}{" "}
              {trip?.userSelection?.noOfDays == 1 ? "Day" : "Days"}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 ">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 ">
              🥂 No. Of Traveler: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
