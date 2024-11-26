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
    <div className="absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-md w-96 flex flex-col items-center">
        <h2 className="text-2xl  font-bold mb-4">Sign In</h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-400 text-white py-2 rounded-full"
        >
          <FaGoogle className="text-xl" />{" "}
          <p className="text-center">Login with Google</p>
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
