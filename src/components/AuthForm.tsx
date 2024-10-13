"use client";

import { FormControl, FormLabel, Input } from "@chakra-ui/react";

// AuthForm component for user authentication
const AuthForm: React.FC<AuthFormProps> = ({
  username,
  jobTitle,
  onInputChange, // Function to handle input changes
}) => {
  return (
    <>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          value={username}
          onChange={(e) => onInputChange("username", e)} // Update username state on input change
          placeholder='Enter username'
        />
      </FormControl>
      <FormControl
        mt={4}
        isRequired
      >
        <FormLabel>Job Title</FormLabel>
        <Input
          value={jobTitle}
          onChange={(e) => onInputChange("jobTitle", e)} // Update job title state on input change
          placeholder='Enter job title'
        />
      </FormControl>
    </>
  );
};

export default AuthForm;
