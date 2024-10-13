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

const UserMenu: React.FC = () => {
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
          className='bg-transparent p-0'
          onClick={onOpen} // Open the menu on button click
        >
          <Flex className='items-center gap-3 md:gap-5'>
            {/* Avatar with responsive sizes */}
            <Avatar size={avatarSize}>
              <AvatarBadge className='h-4 w-4 bg-green-500' />
            </Avatar>

            {/* User information (hidden on mobile, visible on desktop) */}
            <Box className='text-left text-white min-w-0 md:min-w-[150px] max-w-[250px] w-full px-4 hidden md:block'>
              <Text className='font-bold truncate'>
                {capitalizeFirstLetter(username ?? "")}
              </Text>
              <Text className='text-sm truncate'>
                {capitalizeFirstLetter(jobTitle ?? "")}
              </Text>
            </Box>

            {/* Chevron icon (hidden on mobile, visible on desktop) */}
            <div className='hidden md:block'>
              <ChevronDownIcon className='text-white' />
            </div>
          </Flex>
        </MenuButton>

        <MenuList>
          <MenuItem
            color='teal'
            onClick={() => onSelectMenu("settings")}
          >
            Profile Settings
          </MenuItem>
          <MenuItem
            color='teal'
            onClick={() => onSelectMenu("logout")}
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
