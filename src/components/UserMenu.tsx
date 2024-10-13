"use client";

import AuthModal from "@/app/(auth)/page";
import { capitalizeFirstLetter } from "@/lib/capitaliseFirstCharacter";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserInfoContext } from "../context/UserInfoContext";

const UserMenu: React.FC<UserMenuProps> = ({ avatarOnly = false }) => {
  const router = useRouter();
  const { onOpen } = useDisclosure(); // Menu disclosure
  const { username, jobTitle, clearUserInfo } = useUserInfoContext();

  // State to manage modal visibility and mode (update or login)
  const [isUpdateMode, setIsUpdateMode] = useState<boolean | null>(null);

  // Handle menu selection for settings or logout
  const onSelectMenu = (action: "settings" | "logout") => {
    if (action === "logout") {
      clearUserInfo(); // Clear user info on logout
      setIsUpdateMode(null); // Close the modal
      router.replace("/"); // Redirect to home page
    } else if (action === "settings") {
      setIsUpdateMode(true); // Open modal in update mode
    }
  };

  // Close modal and reset update mode
  const handleModalClose = () => {
    setIsUpdateMode(null); // Close modal
  };

  // Determine avatar size based on screen size (smaller for mobile)
  const avatarSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <>
      <Menu>
        <MenuButton
          as='button'
          bg='transparent'
          onClick={onOpen} // Open the menu on button click
          p={0}
        >
          <Flex
            align='center'
            gap={avatarOnly ? 0 : 5} // No gap for avatar-only mode
          >
            <Avatar size={avatarSize}>
              {" "}
              {/* Adjust avatar size based on screen */}
              <AvatarBadge
                boxSize='1.25em'
                bg='green.500'
              />
            </Avatar>
            {!avatarOnly && ( // Hide text if avatarOnly is true (mobile mode)
              <Box
                textAlign='left'
                color='white'
                minW={{ base: "0", md: "150px" }}
                maxWidth='250px'
                width='100%'
                p={4}
              >
                <Text
                  fontWeight='bold'
                  isTruncated
                >
                  {capitalizeFirstLetter(username ?? "")}
                </Text>
                <Text
                  fontSize='sm'
                  isTruncated
                >
                  {capitalizeFirstLetter(jobTitle ?? "")}
                </Text>
              </Box>
            )}
            {!avatarOnly && <ChevronDownIcon />}{" "}
            {/* Chevron icon hidden on mobile */}
          </Flex>
        </MenuButton>

        <MenuList>
          <MenuItem
            color='teal'
            onClick={() => onSelectMenu("settings")} // Navigate to profile settings
          >
            Profile Settings
          </MenuItem>
          <MenuItem
            color='teal'
            onClick={() => onSelectMenu("logout")} // Handle logout action
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Auth Modal */}
      <AuthModal
        isUpdateMode={!!isUpdateMode} // Pass update mode state to AuthModal
        onClose={handleModalClose} // Handle modal close action
      />
    </>
  );
};

export default UserMenu;
