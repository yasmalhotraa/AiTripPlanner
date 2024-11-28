import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function UserTripCardItem({ trip, onDelete }) {
  return (
    <Link
      to={"/view-trip/" + trip?.id}
      className="text-black hover:text-red-500"
    >
      <div className="border-[1.5px] max-600:flex max-600:flex-col p-1 rounded-xl hover:scale-105 transition-all">
        <img
          src="/placeholder.jpg"
          className="object-cover rounded-xl h-[150px]"
          alt="trip"
        />
        <div>
          <h2 className="font-bold text-lg mt-1">
            {trip?.userSelection?.location}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays}{" "}
            {trip?.userSelection?.noOfDays === 1 ? "Day" : "Days"} trip with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>

        {/* Add Delete Button */}
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent navigating to the trip details page
              onDelete(); // Trigger the delete action
            }}
            className="mt-2 mb-1 mx-1 text-white bg-red-500 px-4 py-1 rounded-full text-2xl"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
