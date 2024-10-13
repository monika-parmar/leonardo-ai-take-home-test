"use client";

import AuthForm from "@/components/AuthForm";
import { useUserInfoContext } from "@/context/UserInfoContext";
import useAuthStatusCheck from "@/hooks/useAuthStatusCheck";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

interface AuthModalProps {
  isUpdateMode?: boolean; // true for update mode, false for login mode
  onClose: () => void; // function to close the modal
}

const AuthModal: React.FC<AuthModalProps> = ({ isUpdateMode, onClose }) => {
  // Retrieve username, jobTitle, and a method to update user info from context
  const { username, jobTitle, setUserInfo } = useUserInfoContext();

  // Check if the user is authenticated
  const { isValidUser } = useAuthStatusCheck();

  // State to track if the component has mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);

  // This effect ensures the component is mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // State to hold the values for the login form fields
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: username ?? "", // Default value is context username or empty
    jobTitle: jobTitle ?? "", // Default value is context jobTitle or empty
  });

  // Handle input changes in the form and update the respective field in state
  const onInputChange = (
    key: LoginFields, // The form field being updated (either username or jobTitle)
    event: ChangeEvent<HTMLInputElement> // Input event containing the new value
  ) => {
    setLoginForm({ ...loginForm, [key]: event.target.value }); // Update the form state
  };

  // Handle form submission
  const handleSubmit = () => {
    // Update context with the new username and jobTitle
    setUserInfo(loginForm.username, loginForm.jobTitle);

    // Close the modal if the onClose callback is provided
    if (onClose) onClose();
  };

  // Effect to update the form fields with context values if the user is not valid
  useEffect(() => {
    if (!isValidUser) {
      // If the user is not valid, reset the form with the current context values
      setLoginForm({
        username: username ?? "",
        jobTitle: jobTitle ?? "",
      });
    }
  }, [isValidUser, username, jobTitle]); // Dependencies: run this effect when user validity or context values change

  // Prevent the component from rendering if it hasn't mounted yet (for SSR compatibility)
  if (!isMounted) {
    return null; // Optionally return a loading spinner here
  }

  return (
    <Modal
      isCentered
      isOpen={!(!isUpdateMode && isValidUser)} // Open modal if in login mode or user isn't valid
      onClose={onClose}
      closeOnOverlayClick={isUpdateMode}
    >
      <ModalOverlay
        bg='rgba(0, 0, 0, 0.8)'
        backdropFilter='blur(5px)'
      />
      <ModalContent
        padding={{ base: "0" }} // Remove padding for small screens
        mx={{ base: 4, md: 3 }} // Adjust margins for small and medium screens
      >
        {isUpdateMode && (
          <ModalCloseButton _focus={{ outline: "none", boxShadow: "none" }} /> 
        )}
        <ModalHeader>{isUpdateMode ? "Update Your Info" : "Login"}</ModalHeader>{" "}
        {/* Conditional modal header */}
        <ModalBody>
          <AuthForm
            username={loginForm.username} // Pass current form username
            jobTitle={loginForm.jobTitle} // Pass current form jobTitle
            onInputChange={onInputChange} // Input change handler
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='teal'
            onClick={handleSubmit} // Form submit handler
            isDisabled={!(loginForm.username && loginForm.jobTitle)} // Disable button if fields are empty
          >
            {isUpdateMode ? "Update" : "Submit"} {/* Conditional button text */}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
