import React, { createContext, useState, useContext } from "react";

const UserContext = createContext({
  user: null,
  error: null,
  login: () => {},
  loginWithEmail: () => {},
  setError: () => {}, // Added setError function
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email) => {
    setUser(email);
  };

  return (
    <UserContext.Provider value={{ user, error, login, setError }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
