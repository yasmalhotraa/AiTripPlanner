import { db } from "@/service/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch user trips only once when the component is mounted
    const fetchUserTrips = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        navigate("/"); // Redirect if user is not logged in
        return;
      }

      const q = query(
        collection(db, "AiTrips"),
        where("userEmail", "==", user?.email)
      );

      try {
        const querySnapshot = await getDocs(q);
        const trips = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          trips.push({ ...doc.data(), id: doc.id }); // Store doc ID for deletion
        });

        setUserTrips(trips); // Set all trips at once
      } catch (error) {
        console.error("Error fetching user trips:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUserTrips();
  }, [navigate]);

  // Delete trip function
  const deleteTrip = async (tripId) => {
    try {
      const tripRef = doc(db, "AiTrips", tripId);
      await deleteDoc(tripRef); // Delete the trip document
      setUserTrips((prevTrips) =>
        prevTrips.filter((trip) => trip.id !== tripId)
      ); // Remove trip from UI
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div className="grid max-600:grid-cols-1 grid-cols-2 mt-10 md:grid-cols-3 gap-5">
        {loading ? (
          // Show loading skeleton or spinner while fetching trips
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="h-[200px] w-full bg-slate-200 animate-pulse rounded-xl"
            ></div>
          ))
        ) : userTrips.length > 0 ? (
          // Display trips once they are fetched
          userTrips.map((trip, index) => (
            <UserTripCardItem
              key={index}
              trip={trip}
              onDelete={() => deleteTrip(trip.id)} // Pass delete function to card
            />
          ))
        ) : (
          // Show no trips found message after data is fetched
          <div className="col-span-full text-center mt-10 text-xl text-gray-500">
            No trips found.
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
