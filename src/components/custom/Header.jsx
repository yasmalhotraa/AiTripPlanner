import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  deleteUser,
} from "firebase/auth";
import LoginForm from "./LoginForm";
import { toast } from "sonner";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/service/firebase"; // Ensure correct Firestore import
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoMdMenu } from "react-icons/io";
import CustomConfirmationModal from "./CustomConfirmationModal"; // Import the custom modal

function Header() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing confirmation modal

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

  const handleDeleteAccount = async () => {
    setShowDeleteModal(false); // Close the confirmation modal

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        toast("No user is logged in.");
        return;
      }

      // Delete all trips associated with the user's email
      const tripsQuery = query(
        collection(db, "AiTrips"),
        where("userEmail", "==", currentUser.email)
      );
      const querySnapshot = await getDocs(tripsQuery);

      const deletePromises = querySnapshot.docs.map((tripDoc) =>
        deleteDoc(doc(db, "AiTrips", tripDoc.id))
      );
      await Promise.all(deletePromises);

      // Delete the user's Firebase Authentication account
      await deleteUser(currentUser);

      // Clear localStorage and reset state
      localStorage.clear();
      setUser(null);

      toast("Account and all associated data deleted successfully.");
      window.location.reload();
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        toast(
          "Please re-authenticate to delete your account. Log out and log back in to try again."
        );
      } else {
        toast(`Error deleting account: ${error.message}`);
      }
    }
  };

  const toggleLoginForm = () => {
    setShowLoginForm((prevState) => {
      const newState = !prevState;
      document.body.style.overflow = newState ? "hidden" : "auto";
      return newState;
    });
  };

  return (
    <div className="p-3 shadow-md flex justify-between items-center px-5">
      <a href="/">
        <div className="flex gap-1 justify-center items-center">
          <img src="/logo.svg" alt="logo" className="w-14" />
          <h2 className="font-extrabold text-2xl max-600:text-lg text-[#8046fd]">
            <span>AI</span>
            <span>Trip</span>
            Planner
          </h2>
        </div>
      </a>

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

            {/* Popover menu for smaller screens */}
            <div className="hidden max-600:flex items-center gap-2">
              <Popover>
                <PopoverTrigger className="bg-white p-0 border-none">
                  <IoMdMenu className="text-black bg-white text-[35px] " />
                </PopoverTrigger>
                <PopoverContent className="p-0 w-44">
                  <a href="/create-trip">
                    <Button
                      variant="outline"
                      className="w-full rounded-none text-md"
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
                <h2 className="font-semibold text-md max-600:text-sm">
                  {user?.displayName}
                </h2>
                <Button
                  onClick={handleSignOut}
                  className="cursor-pointer mt-2 max-600:text-[13px]"
                >
                  Sign Out
                </Button>
                <Button
                  onClick={() => setShowDeleteModal(true)} // Open the confirmation modal
                  className="cursor-pointer mt-2 bg-red-500 ml-2 text-white max-600:text-[13px]"
                >
                  Delete Account
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={toggleLoginForm}>Sign In</Button>
        )}
      </div>

      {showLoginForm && <LoginForm onClose={toggleLoginForm} />}

      {/* Custom Confirmation Modal */}
      {showDeleteModal && (
        <CustomConfirmationModal
          message="Are you sure you want to delete your account? This action is irreversible."
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteModal(false)} // Close the modal
        />
      )}
    </div>
  );
}

export default Header;
