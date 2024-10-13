"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface UserInfoContextProps {
  username: string | null;
  jobTitle: string | null;
  setUserInfo: (username: string, jobTitle: string) => void;
  clearUserInfo: () => void;
}

const UserInfoContext = createContext<UserInfoContextProps | undefined>(
  undefined
);

export const UserInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState<string | null>(null);

  // Effect to load user information from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only access localStorage in the client
      const storedUsername = localStorage.getItem("username");
      const storedJobTitle = localStorage.getItem("jobTitle");

      setUsername(storedUsername); // Set username from localStorage
      setJobTitle(storedJobTitle); // Set job title from localStorage
    }
  }, []);

  // Function to set user information in both localStorage and state
  const setUserInfo = (newUsername: string, newJobTitle: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("username", newUsername); // Save username to localStorage
      localStorage.setItem("jobTitle", newJobTitle); // Save job title to localStorage

      setUsername(newUsername); // Update state for username
      setJobTitle(newJobTitle); // Update state for job title
    }
  };

  // Function to clear user information from localStorage and reset state
  const clearUserInfo = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("username"); // Remove username from localStorage
      localStorage.removeItem("jobTitle"); // Remove job title from localStorage

      setUsername(null); // Reset username state
      setJobTitle(null); // Reset job title state
    }
  };

  return (
    <UserInfoContext.Provider
      value={{ username, jobTitle, setUserInfo, clearUserInfo }}
    >
      {children}
      {/*   Render children with context */}
    </UserInfoContext.Provider>
  );
};

// Custom hook to use UserInfoContext
export const useUserInfoContext = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error(
      "useUserInfoContext must be used within a UserInfoProvider"
    ); // Error if hook is used outside provider
  }
  return context; // Return context
};
