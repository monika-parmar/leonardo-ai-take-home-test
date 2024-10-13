import { useUserInfoContext } from "@/context/UserInfoContext";
import { ChevronUpIcon } from "@chakra-ui/icons"; // Import Chakra UI's up arrow icon
import { Box, Flex, Icon, Text } from "@chakra-ui/react";

const DashboardGreeting = () => {
  // Retrieve the username from the user info context
  const { username } = useUserInfoContext();

  return (
    <Flex pl={{ base: "16", md: "56" }}>
      <Flex
        bgGradient='linear(to-r, #fa5560, #b14bf4, #4d91ff 70%)'
        p={{ base: 4, md: 10 }}
        width={{ base: "80%", md: "450px" }}
        gap={2}
        borderRadius='md'
        justifyContent='center'
        my={{ base: 8, md: 8 }}
      >
        {/* Animated up arrow */}
        <Box animation='upDown 1s infinite alternate'>
          <Icon
            as={ChevronUpIcon}
            color='white'
            boxSize={8}
          />{" "}
        </Box>
        <Text
          color='white'
          fontSize={{ base: "0.5em", md: "1em" }}
        >
          Hey {username}, click on{" "}
          <Text
            as='span'
            fontWeight='bold'
            color='gray.700'
          >
            Information
          </Text>{" "}
          tab to get details of your favorite characters from Rick and Morty.
        </Text>

        {/* Add keyframes for animation */}
        <style
          jsx
          global
        >{`
          @keyframes upDown {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-10px); // Move up 10 pixels
            }
          }
        `}</style>
      </Flex>
    </Flex>
  );
};

export default DashboardGreeting;
