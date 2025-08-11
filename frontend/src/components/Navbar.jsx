import { Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, PlusSquareIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="1140px" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: 'column', sm: 'row' }}
      >
        <Text
          fontSize={{ base: '22', sm: '28' }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        <HStack spacing={1} alignItems="center">
          <Button as={Link} to="/create">
            <PlusSquareIcon fontSize={20} />
          </Button>

          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <SunIcon fontSize={20} /> : <MoonIcon fontSize={20} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
