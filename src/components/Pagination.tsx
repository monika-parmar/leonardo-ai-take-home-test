import React from "react";
import { Button, Box, useBreakpointValue, Text } from "@chakra-ui/react";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages = 42,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  // Adjust number of visible pages and other settings based on screen size
  const maxVisiblePages = useBreakpointValue({ base: 2, md: 5 });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const buttonSpacing = useBreakpointValue({ base: 1, md: 2 });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const renderPagination = () => {
    const pages = [];

    // Previous button (show arrow on mobile)
    pages.push(
      <Button
        key='prev'
        onClick={() => handlePageChange(currentPage - 1)}
        colorScheme='teal'
        variant='outline'
        size={buttonSize}
        mx={buttonSpacing}
        isDisabled={currentPage === 1}
      >
        {isMobile ? "◀️" : "Previous"}
      </Button>
    );

    // First page (always visible)
    pages.push(
      <Button
        key={1}
        onClick={() => handlePageChange(1)}
        color={currentPage === 1 ? "white" : "teal.300"}
        bg={currentPage === 1 ? "teal.600" : "transparent"}
        _hover={{ bg: "teal.500" }}
        mx={buttonSpacing}
        size={buttonSize}
      >
        1
      </Button>
    );

    // Add dots if necessary
    if (currentPage > maxVisiblePages! + 1) {
      pages.push(
        <Text
          key='dots1'
          mx={buttonSpacing}
          color='white'
        >
          ...
        </Text>
      );
    }

    // Pages in the middle
    const startPage = Math.max(
      2,
      currentPage - Math.floor(maxVisiblePages! / 2)
    );
    const endPage = Math.min(
      totalPages - 1,
      currentPage + Math.floor(maxVisiblePages! / 2)
    );

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          color={currentPage === i ? "white" : "teal.300"}
          bg={currentPage === i ? "teal.600" : "transparent"}
          _hover={{ bg: "teal.500" }}
          mx={buttonSpacing}
          size={buttonSize}
        >
          {i}
        </Button>
      );
    }

    // Add dots before the last page if necessary
    if (currentPage < totalPages - maxVisiblePages!) {
      pages.push(
        <Text
          key='dots2'
          mx={buttonSpacing}
          color='white'
        >
          ...
        </Text>
      );
    }

    // Last page (always visible)
    pages.push(
      <Button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        color={currentPage === totalPages ? "white" : "teal.300"}
        bg={currentPage === totalPages ? "teal.600" : "transparent"}
        _hover={{ bg: "teal.500" }}
        mx={buttonSpacing}
        size={buttonSize}
      >
        {totalPages}
      </Button>
    );

    // Next button (show arrow on mobile)
    pages.push(
      <Button
        key='next'
        onClick={() => handlePageChange(currentPage + 1)}
        colorScheme='teal'
        variant='outline'
        size={buttonSize}
        mx={buttonSpacing}
        isDisabled={currentPage === totalPages}
      >
        {isMobile ? "▶️" : "Next"}
      </Button>
    );

    return pages;
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      width={"100%"}
      mt={4}
      py={4}
      position='fixed'
      bottom={0}
      zIndex={10}
      bgGradient='linear(to-b, gray.600, gray.900)'
    >
      <Box
        display='flex'
        justifyContent='center'
        bg='transparent'
        width='100%'
        maxW={{ base: "325px", md: "none" }}
      >
        {/* Gradient top border */}
        <Box
          width='100%'
          height='2px'
          bgGradient='linear(to-r, #fa5560, #b14bf4, #4d91ff 70%)'
          position='absolute'
          top={0}
          left={0}
          zIndex={1}
        />
        {renderPagination()}
      </Box>
    </Box>
  );
};

export default Pagination;
