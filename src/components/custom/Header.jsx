function Header() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(null);

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

  return (
    <div className="p-3 shadow-md flex justify-between items-center px-5 flex-col sm:flex-row">
      <div className="flex gap-1 justify-center items-center w-full sm:w-auto">
        <img src="/logo.svg" alt="logo" className="w-14" />
        <h2 className="font-extrabold text-2xl sm:text-lg text-[#8046fd] text-center sm:text-left mt-2 sm:mt-0">
          <span>AI</span>
          <span>Trip</span>
          Planner
        </h2>
      </div>
      <div className="mt-3 sm:mt-0">
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
                  alt="User Avatar"
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
          <Button onClick={toggleLoginForm} className="w-full sm:w-auto">
            Sign In
          </Button>
        )}
      </div>
      {showLoginForm && <LoginForm onClose={toggleLoginForm} />}
    </div>
  );
}
