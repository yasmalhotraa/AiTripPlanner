import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { chatSession } from "@/service/AIModal";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase authentication methods
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebase";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [query, setQuery] = useState(""); // State to hold input field value
  const [selectedPlace, setSelectedPlace] = useState(); // State for the selected place
  const [formData, setFormData] = useState([]); // Store form data
  const [loading, setLoading] = useState(false); // Loading state to control spinner visibility
  const [user, setUser] = useState(null); // Track the authenticated user
  const navigate = useNavigate();

  // Firebase Auth state listener
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set user when logged in
      } else {
        setUser(null); // Set user to null when logged out
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // Update form data based on user input
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const OnGenetrateTrip = async () => {
    // Check if the user is signed in
    if (!user) {
      toast("Please sign in first!"); // Show toast if not signed in
      return;
    }

    setLoading(true); // Set loading to true when the trip is being generated

    if (
      !formData?.budget ||
      !formData.location ||
      !formData?.traveler ||
      !formData?.noOfDays
    ) {
      toast("Please fill all the details.");
      setLoading(false); // Set loading to false if validation fails
      return;
    }
    if (formData?.noOfDays > 10) {
      toast("Please fill Days less than 10.");
      setLoading(false); // Set loading to false if validation fails
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  useEffect(() => {
    console.log(formData); // Log form data whenever it changes
  }, [formData]);

  // Function to fetch places from OpenStreetMap API
  const fetchPlaces = async (inputValue) => {
    if (!inputValue) return [];
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}`
    );
    const data = await response.json();
    return data.map((place) => ({
      label: place.display_name, // This is the label that will appear in the input field
      value: place.place_id, // This is the place ID, which will be used as the value
      details: place, // Save the entire place details (for logging or further use)
    }));
  };

  // Handle selection of a place
  const handlePlaceChange = (selectedOption) => {
    setSelectedPlace(selectedOption); // Update the selected place with value and details
    setQuery(selectedOption ? selectedOption.label : ""); // Set the label (place name) in the input field

    handleInputChange("location", selectedOption ? selectedOption.label : ""); // Update form data with location
  };

  return (
    <div className="max-600:px-3 sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      {loading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-70 flex justify-center items-center z-50">
          <div className="flex flex-col items-center gap-5 justify-center space-y-4">
            {/* Spinner with more animations */}
            <div className="relative flex justify-center items-center">
              {/* Outer Spinner with Rotating Border */}
              <div className="w-28 h-28 border-8 border-dashed border-indigo-600 border-opacity-90 rounded-full animate-spin"></div>

              {/* Inner Spinner with Pulse Effect */}
              <div className="absolute w-20 h-20 border-4 border-dashed border-white border-opacity-70 rounded-full animate-ping"></div>

              {/* New Additional Animated Ring */}
              <div className="absolute w-36 h-36 border-4 border-dashed border-purple-500 border-opacity-90 rounded-full animate-pulse"></div>

              <div className="absolute w-16 h-16 border-4 border-dashed border-purple-500 border-opacity-90 rounded-full animate-pulse"></div>
            </div>

            {/* Loading Text */}
            <p className="text-white text-lg font-semibold">
              Please wait, Loading...
            </p>
          </div>
        </div>
      )}

      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customised itinerary based on your preferences 🏕️.
      </p>
      <div className="max-600:mt-12 mt-20 flex flex-col max-600:gap-5 gap-10">
        <div className="w-[100%] mx-auto bg-white">
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <AsyncSelect
            loadOptions={fetchPlaces}
            onChange={handlePlaceChange}
            defaultInputValue={query} // Bind the input value to state (label)
            onInputChange={(value) => setQuery(value)} // Update query on typing
            placeholder="Type a location..."
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      <div className="max-600:mt-5">
        <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5 max-600:gap-2 max-600:grid-cols-2">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                ${formData?.budget == item.title && "shadow-lg border-black"}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 max-600:mt-5 font-medium">
          Who do you plan to travel with for your next adventure?
        </h2>
        <div className="grid grid-cols-3 max-600:grid-cols-2 gap-5 mt-5 max-600:gap-2">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border rounded-lg cursor-pointer  hover:shadow-lg 
                ${
                  formData?.traveler == item.people && "shadow-lg border-black"
                }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={OnGenetrateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
    </div>
  );
}

export default CreateTrip;
