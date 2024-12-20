import React, { useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "@/service/auth";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";

function LoginForm({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async () => {
    try {
      await doSignInWithEmailAndPassword(email, password);
      toast("Logged in successfully!");
      onClose(); // Close the form after successful login
    } catch (error) {
      toast(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await doSignInWithGoogle();
      toast("Logged in with Google!");
      onClose(); // Close the form after successful login
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <div className="absolute z-10 top-0 left-0 w-full h-full max-600:p-5 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-md w-96 ">
        <div className="flex gap-1 mb-5 items-center">
          <img src="/logo.svg" alt="logo" className="w-14" />
          <h2 className="font-extrabold text-2xl text-[#8046fd]">
            <span>AI</span>
            <span>Trip</span>
            Planner
          </h2>
        </div>
        <h2 className="text-[18px] text-gray-600 font-bold mb-3 mx-2">
          Please Sign in to the App
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-400 text-white py-2 rounded-full"
        >
          <FaGoogle className="text-xl" />{" "}
          <p className="text-center">Sign In with Google</p>
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full text-white border rounded-full hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
