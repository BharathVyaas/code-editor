import React, { createContext, useState } from "react";

const UserContext = createContext({
  user: {
    username: localStorage.getItem("username") || null,
    email: localStorage.getItem("email") || null,
  },
  error: null,
  login: () => {},
  loginWithEmail: () => {},
  setError: () => {}, // Added setError function
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: localStorage.getItem("username") || null,
    email: localStorage.getItem("email") || null,
  });
  const [error, setError] = useState(null);

  const login = async (user) => {
    setUser(user);

    localStorage.setItem("username", user?.username);
    localStorage.setItem("email", user?.email);
  };

  return (
    <UserContext.Provider value={{ user, error, login, setError }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
