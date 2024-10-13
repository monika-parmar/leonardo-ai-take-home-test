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
  const { username, jobTitle, setUserInfo } = useUserInfoContext();
  const { isValidUser } = useAuthStatusCheck();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: username || "", // Use empty string if undefined
    jobTitle: jobTitle || "", // Use empty string if undefined
  });

  const onInputChange = (
    key: LoginFields,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setLoginForm({ ...loginForm, [key]: event.target.value });
  };

  const handleSubmit = () => {
    setUserInfo(loginForm.username, loginForm.jobTitle);
    if (onClose) onClose();
  };

  useEffect(() => {
    if (!isValidUser) {
      setLoginForm({
        username: username || "", // Use empty string if undefined
        jobTitle: jobTitle || "", // Use empty string if undefined
      });
    }
  }, [isValidUser, username, jobTitle]);

  // Prevent rendering if the component hasn't mounted yet
  if (!isMounted) return null;

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
        padding={{ base: "0" }}
        mx={{ base: 4, md: 3 }}
      >
        {isUpdateMode && (
          <ModalCloseButton _focus={{ outline: "none", boxShadow: "none" }} />
        )}
        <ModalHeader>{isUpdateMode ? "Update Your Info" : "Login"}</ModalHeader>
        <ModalBody>
          <AuthForm
            username={loginForm.username}
            jobTitle={loginForm.jobTitle}
            onInputChange={onInputChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='teal'
            onClick={handleSubmit}
            isDisabled={!(loginForm.username && loginForm.jobTitle)}
          >
            {isUpdateMode ? "Update" : "Submit"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
