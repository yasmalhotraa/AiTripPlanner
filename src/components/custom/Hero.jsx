import React from "react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="flex flex-col items-center mx-56  max-600:mx-5 gap-9">
      <h1 className="font-extrabold text-[50px] max-600:text-[30px] text-center mt-16">
        <span className="text-[#f56551]">
          Discover your Next Adventure with AI:
        </span>{" "}
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget
      </p>
      <Link to={"/create-trip"}>
        <Button>Get Started, it's Free</Button>
      </Link>

      <img src="/landing.png" className="w-full h-auto" />
    </div>
  );
}

export default Hero;
