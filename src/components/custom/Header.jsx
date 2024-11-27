import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Auth methods
import LoginForm from "./LoginForm"; // Import LoginForm component
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Header() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(null); // Track current user

  useEffect(() => {
    // Check localStorage for existing user data
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // If user data is found in localStorage, set it
      console.log(user);
    }
  }, []);

  // Firebase Auth state listener
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set user when logged in
        // Optionally store user info in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setUser(null); // Set user to null when logged out
        localStorage.removeItem("user"); // Remove user from localStorage
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // Handle sign out and page refresh
  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);

      // Clear local storage to remove user data
      localStorage.clear(); // Remove all data from local storage

      toast("Logged out successfully!");
      setUser(null); // Set user to null after logging out

      // Refresh the page to reset the state and clear any residual data
      window.location.reload(); // Refresh the page
    } catch (error) {
      toast(error.message);
    }
  };

  // Toggle login form visibility and disable/enable scroll
  const toggleLoginForm = () => {
    setShowLoginForm((prevState) => {
      const newState = !prevState;
      // Disable scroll when form is shown, enable when hidden
      if (newState) {
        document.body.style.overflow = "hidden"; // Disable scrolling
      } else {
        document.body.style.overflow = "auto"; // Re-enable scrolling
      }
      return newState;
    });
  };

  return (
    <div className="p-3 shadow-md flex justify-between items-center px-5">
      <div className="flex gap-1 justify-center items-center">
        <img src="/logo.svg" alt="logo" className="w-14" />
        <h2 className="font-extrabold text-2xl max-600:text-lg text-[#8046fd]">
          <span>AI</span>
          <span>Trip</span>
          Planner
        </h2>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip" className="text-black">
              <Button variant="outline" className="rounded-full">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips" className="text-black">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger className="p-0 rounded-full">
                <img
                  src={user?.photoURL}
                  className="w-[35px] h-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="font-semibold text-md">{user?.displayName}</h2>
                <Button onClick={handleSignOut} className="cursor-pointer my-2">
                  Sign Out
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={toggleLoginForm}>Sign In</Button>
        )}
      </div>
      {showLoginForm && <LoginForm onClose={toggleLoginForm} />}
    </div>
  );
}

export default Header;
