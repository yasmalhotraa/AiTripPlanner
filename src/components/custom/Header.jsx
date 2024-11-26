import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Auth methods
import LoginForm from "./LoginForm"; // Import LoginForm component
import { toast } from "sonner";

function Header() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(null); // Track current user

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

  // Handle sign out
  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      toast("Logged out successfully!");
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
      <img src="/logo.svg" alt="logo" />
      <div>
        {user ? (
          // If user is logged in, show "Sign Out" button
          <Button onClick={handleSignOut}>Sign Out</Button>
        ) : (
          // If user is not logged in, show "Sign In" button
          <Button onClick={toggleLoginForm}>Sign In</Button>
        )}
      </div>
      {showLoginForm && <LoginForm onClose={toggleLoginForm} />}
    </div>
  );
}

export default Header;
