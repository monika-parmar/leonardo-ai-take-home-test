"use client";

import useAuthStatusCheck from "@/hooks/useAuthStatusCheck";
import {
  Box,
  Flex,
  Image,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import UserMenu from "./UserMenu";

const Header: React.FC = () => {
  const { isValidUser } = useAuthStatusCheck();

  // Determine if the screen size is mobile or larger
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      position='fixed'
      top={0}
      left={0}
      width='100%'
      bg='gray.900'
      color='white'
      px={4} // Reduced padding for mobile
      py={2} // Reduced padding for mobile
      boxShadow='sm'
      zIndex={10}
    >
      <Flex
        justify='space-between'
        align='center'
      >
        <Flex
          alignItems='center'
          gap={isMobile ? 4 : 24} // Adjust the gap based on screen size
        >
          {/* Company Logo and Name */}
          <Link
            href='/'
            _hover={{ textDecoration: "none" }}
          >
            <Flex
              alignItems='center'
              gap='8px'
              color='white'
            >
              <Image
                src='/assets/company_logo.png'
                alt='Leonardo.ai'
                boxSize={isMobile ? "36px" : "48px"} // Smaller logo on mobile
                objectFit='contain'
                cursor='pointer'
                _hover={{ opacity: 0.8 }}
              />
              {!isMobile && ( // Hide company name on mobile
                <Text
                  fontSize='1.25em'
                  fontWeight='500'
                >
                  Leonardo.Ai
                </Text>
              )}
            </Flex>
          </Link>

          {/* Navigation Menu */}
          {isValidUser && (
            <Flex gap={6}>
              <Link
                href='/dashboard/information'
                fontSize={{ base: "0.5em", md: "1em" }}
                fontWeight='500'
                _hover={{ color: "gray.300" }}
              >
                Information
              </Link>
            </Flex>
          )}
        </Flex>

        {/* User Menu with avatar only on mobile */}
        <Flex alignItems='center'>
          <UserMenu avatarOnly={isMobile} />
        </Flex>
      </Flex>

      <Box
        position='absolute'
        bottom={0}
        left={0}
        width='100%'
        height='2px'
        bgGradient='linear(to-r, #fa5560, #b14bf4, #4d91ff 70%)'
      />
    </Box>
  );
};

export default Header;
