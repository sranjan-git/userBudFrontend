import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Create the AuthContext with default values
export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component to provide context to the app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check local storage for a token
    return !!localStorage.getItem("token");
  });

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Check if user is authenticated when the app loads
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
