// components/CharacterModal.tsx

import {
  Box,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";
const CharacterModal: React.FC<CharacterModalProps> = ({
  isOpen,
  onClose,
  character,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size='lg'
    >
      <ModalOverlay />
      <ModalContent
        className='bg-white rounded-lg shadow-lg'
        padding={{ base: "0" }}
        mx={{ base: 4, md: 3 }}
      >
        <ModalCloseButton _focus={{ outline: "none", boxShadow: "none" }} />
        <ModalHeader className='text-center text-2xl font-semibold'>
          {character.name}
        </ModalHeader>
        <ModalBody>
          <Box>
            <Image
              src={character.image}
              alt={character.name}
              borderRadius='lg'
              width='100%'
              maxHeight='300px' // Set a max height to make the image smaller
              objectFit='cover' // Ensure the image covers the area while maintaining its aspect ratio
              className='mb-4'
            />
            <Box className='p-4'>
              <Box className='flex justify-between border-b border-gray-300 pb-2 mb-2'>
                <Text
                  fontSize='sm'
                  fontWeight='bold'
                >
                  Status
                </Text>
                <Text fontSize='sm'>{character.status}</Text>
              </Box>
              <Box className='flex justify-between border-b border-gray-300 pb-2 mb-2'>
                <Text
                  fontSize='sm'
                  fontWeight='bold'
                >
                  Species
                </Text>
                <Text fontSize='sm'>{character.species}</Text>
              </Box>
              <Box className='flex justify-between border-b border-gray-300 pb-2 mb-2'>
                <Text
                  fontSize='sm'
                  fontWeight='bold'
                >
                  Type
                </Text>
                <Text fontSize='sm'>{character.type || "N/A"}</Text>
              </Box>
              <Box className='flex justify-between border-b border-gray-300 pb-2 mb-2'>
                <Text
                  fontSize='sm'
                  fontWeight='bold'
                >
                  Gender
                </Text>
                <Text fontSize='sm'>{character.gender}</Text>
              </Box>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CharacterModal;
