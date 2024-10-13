"use client";

import Character from "@/components/Character";
import Pagination from "@/components/Pagination";
import { GET_CHARACTERS } from "@/graphql/query";
import useAuthStatusCheck from "@/hooks/useAuthStatusCheck";
import { useQuery } from "@apollo/client";
import { Box, Grid, Spinner, Text } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

const Information = () => {
  const router = useRouter(); // Hook to access the router for navigation
  const searchParams = useSearchParams(); // Hook to access the URL search parameters
  const { isValidUser } = useAuthStatusCheck(); // Hook to check if the user is valid

  // Redirect to the home page if the user is not valid
  useEffect(() => {
    if (!isValidUser) {
      router.replace("/"); // Replace current URL with the home page
    }
  }, [isValidUser]);
  // Access the 'page' parameter from the URL
  const pageParam = searchParams.get("page");
  const initialPage = parseInt(pageParam || "1", 10); // Set default to 1 if no page parameter is present

  const [currentPage, setCurrentPage] = useState(initialPage); // State to track the current page
  const [columns, setColumns] = useState(5); // State to track the number of columns for the grid layout

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page: currentPage }, // Query characters based on the current page
  });

  const totalPages = data?.characters?.info?.pages || 0; // Get total pages from the query result

  // Calculate the number of columns based on the window width
  const calculateColumns = useCallback(() => {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 2000) {
      setColumns(10); // Set to 10 columns for very large screens
    } else if (windowWidth >= 1600) {
      setColumns(5); // Set to 5 columns for large screens
    } else if (windowWidth >= 1000) {
      setColumns(4); // Set to 4 columns for medium screens
    } else if (windowWidth >= 600) {
      setColumns(2); // Set to 2 columns for smaller screens
    } else {
      setColumns(1); // Single column for mobile and small screens
    }
  }, []);

  useEffect(() => {
    calculateColumns(); // Calculate columns on component mount
    window.addEventListener("resize", calculateColumns); // Add event listener to recalculate columns on resize
    return () => window.removeEventListener("resize", calculateColumns); // Cleanup event listener on unmount
  }, [calculateColumns]);

  // Updating URL and current page when the page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the current page state
    router.push(`/dashboard/information?page=${page}`); // Updating the URL to reflect the new page
  };

  return (
    <Box
      position='relative'
      overflow='hidden'
      bgGradient='linear(to-b, gray.900, gray.600)'
    >
      <Box
        p={{ base: 4, md: 9 }}
        pb={{ base: 20, md: 28 }}
        zIndex={1}
      >
        {loading ? (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 156px)'
          >
            <Spinner size='xl' />
          </Box>
        ) : error ? (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 156px)'
          >
            <Text
              color='red.500'
              fontSize={{ base: "lg", md: "xl" }}
              textAlign='center'
            >
              An error occurred while fetching data.
            </Text>
          </Box>
        ) : (
          <Grid
            templateColumns={`repeat(${columns}, 1fr)`}
            gap={{ base: 4, md: 9 }}
            width='100%'
            p={{ base: 4, md: 0 }}
          >
            {data?.characters?.results?.map(
              (characterResults: CharacterResults) => (
                <Character
                  key={characterResults.id}
                  character={characterResults} // Pass character data to Character component
                />
              )
            )}
          </Grid>
        )}
      </Box>
      {totalPages !== 0 && (
        <Pagination
          currentPage={currentPage} // Current page state
          totalPages={totalPages} // Total pages derived from query result
          onPageChange={handlePageChange} // Callback to handle page changes
        />
      )}
    </Box>
  );
};

// Wrap the Information component in a Suspense boundary
const SuspenseInformation = () => {
  return (
    <Suspense fallback={<Spinner size='xl' />}>
      <Information />
    </Suspense>
  );
};

export default SuspenseInformation;
