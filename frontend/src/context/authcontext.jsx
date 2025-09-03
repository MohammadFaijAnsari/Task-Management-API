import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);   

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/me", {
          method: "GET",
          credentials: "include"
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setUser(data.user);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);  
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = async () => {
  try {
    await fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include"
    });

    // ✅ Frontend state reset karo
    setUser(null);
    setIsLoggedIn(false);

  } catch (err) {
    console.error("Logout failed:", err);
  } 
};


  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
