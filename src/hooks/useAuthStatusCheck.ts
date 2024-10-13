import { useUserInfoContext } from "@/context/UserInfoContext";
import { useEffect, useState } from "react";

const useAuthStatusCheck = () => {
  const [isValidUser, setIsValidUser] = useState(false);
  // Retrieving user info from localStorage
  const { username, jobTitle } = useUserInfoContext();

  useEffect(() => {
    // Check if both username and jobTitle exist
    if (username && jobTitle) {
      setIsValidUser(true);
    } else {
      setIsValidUser(false);
    }
  }, [username, jobTitle]);

  return { isValidUser };
};

export default useAuthStatusCheck;
