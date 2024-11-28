import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import LoginForm from "./LoginForm";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoMdMenu } from "react-icons/io";

function Header() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // State to toggle the menu

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      localStorage.clear();
      toast("Logged out successfully!");
      setUser(null);
      window.location.reload();
    } catch (error) {
      toast(error.message);
    }
  };

  const toggleLoginForm = () => {
    setShowLoginForm((prevState) => {
      const newState = !prevState;
      document.body.style.overflow = newState ? "hidden" : "auto";
      return newState;
    });
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="p-3 shadow-md flex justify-between items-center px-5">
      <div className="flex gap-1 justify-center items-center">
        <a href="/">
          <img src="/logo.svg" alt="logo" className="w-14" />
          <h2 className="font-extrabold text-2xl max-600:text-lg text-[#8046fd]">
            <span>AI</span>
            <span>Trip</span>
            Planner
          </h2>
        </a>
      </div>

      <div className="relative">
        {user ? (
          <div className="flex items-center gap-3">
            {/* Show buttons directly for screens larger than 600px */}
            <div className="max-600:hidden gap-2 flex">
              <a href="/create-trip" className="text-black">
                <Button
                  variant="outline"
                  className="rounded-full max-600:text-xs"
                >
                  + Create Trip
                </Button>
              </a>
              <a href="/my-trips" className="text-black">
                <Button
                  variant="outline"
                  className="rounded-full max-600:text-xs"
                >
                  My Trips
                </Button>
              </a>
            </div>

            {/* Show three dots for screens smaller or equal to 600px */}
            <div className="hidden max-600:flex items-center gap-2">
              <Popover>
                <PopoverTrigger className="bg-white p-0 border-none">
                  <IoMdMenu className="text-black bg-white text-[35px] " />
                </PopoverTrigger>
                <PopoverContent className="p-0 w-44  ">
                  <a href="/create-trip">
                    <Button
                      variant="outline"
                      className="w-full  rounded-none text-md "
                    >
                      + Create Trip
                    </Button>
                  </a>
                  <a href="/my-trips">
                    <Button
                      variant="outline"
                      className="w-full rounded-none text-md"
                    >
                      My Trips
                    </Button>
                  </a>
                </PopoverContent>
              </Popover>
            </div>

            <Popover>
              <PopoverTrigger className="p-0 rounded-full">
                <img
                  src={user?.photoURL}
                  className="w-[35px] h-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="font-semibold text-md">{user?.displayName}</h2>
                <Button onClick={handleSignOut} className="cursor-pointer mt-2">
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
