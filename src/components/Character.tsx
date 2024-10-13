import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import CharacterModal from "./CharacterModal";

const Character = ({ character }: { character: CharacterResults }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        key={character.id}
        position='relative'
        borderRadius='lg'
        p={0.5}
        overflow='hidden'
        bgGradient='linear(to-r, #fa5560, #b14bf4, #4d91ff 70%)'
        transition='transform 0.3s, box-shadow 0.3s'
        className='relative group cursor-pointer'
        onClick={onOpen} // Open modal on click
        boxShadow='lg'
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <Image
          src={character?.image}
          alt={character.name}
          className='w-full h-48 object-cover transition-transform duration-300'
          borderRadius={"6px"}
        />

        {/* Bottom-left text overlay with gradient effect */}
        <Box
          className='absolute bottom-0 left-0 p-2 w-full'
          style={{
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.5) 70%, rgba(255, 255, 255, 0) 100%)", // Gradient fading from bottom to top
            transition: "opacity 0.3s ease",
          }}
        >
          <Text
            fontSize='sm'
            fontWeight='bold'
            color='gray.800'
            textAlign='left'
            mb={0.5}
          >
            {character.name}
          </Text>
          <Text
            fontSize='xs'
            color='gray.600'
            textAlign='left'
          >
            {character.species}
          </Text>
        </Box>

        <Box
          position='absolute'
          bottom={0}
          right={0}
          height='100%'
          width='100%'
          background='linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent 70%)'
          opacity={0.4}
          transition='opacity 0.3s'
          className='group-hover:opacity-100'
        />
      </Box>

      {/* Character Modal for details */}
      <CharacterModal
        isOpen={isOpen}
        onClose={onClose}
        character={character}
      />
    </>
  );
};

export default Character;
