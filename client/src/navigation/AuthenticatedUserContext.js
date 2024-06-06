// src/navigation/AuthenticatedUserContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthenticatedUserContext);
};
