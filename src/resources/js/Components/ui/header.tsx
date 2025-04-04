
import { Box, Flex, Text, Button, useBreakpointValue} from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
const Header = () => {
  const displayLogo = useBreakpointValue({ base: false, md: true });

  return (
    <Box as="header" bg="teal.500" color="white" p={4}>
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
        {/* Logo */}
        {displayLogo && (
          <Text fontSize="2xl" fontWeight="bold">
            MyApp
          </Text>
        )}

        {/* Navigation Links */}
        <Flex gap={4}>
          <Link href="/">
            <Button colorScheme="whiteAlpha">
              Home
            </Button>
          </Link>
          <Link href="/about">
          </Link>
          <Link href="/Task Manager">
            <Button colorScheme="whiteAlpha">
            Task Manager
            </Button>
          </Link>
        </Flex>

        {/* Buttons */}
        <Flex gap={4}>
          <Button colorScheme="teal" variant="solid">
            Sign In
          </Button>
          <Button colorScheme="teal" variant="outline">
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
