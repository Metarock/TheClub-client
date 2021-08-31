
import { Box, Flex, Link, useColorMode } from "@chakra-ui/react";
import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

interface NavbarProps {

}


export const Navbar: React.FC<NavbarProps> = () => {
    const { colorMode } = useColorMode();
    const primaryColor = colorMode === "dark" ? "white" : "white";
    return (
        <Flex zIndex={1} position="sticky" top={0} p={4} bg={colorMode === "dark" ? "black" : "teal.500"} color={primaryColor}>
            <Flex flex={1} m="auto" align='center'>
                <Link to="/">
                    TheClub updates double checking
                </Link>
                <Box ml={"auto"}>

                </Box>
                <Box textAlign="center" fontSize="xl" color={primaryColor}>
                    <ColorModeSwitcher justifySelf="flex-end" />
                </Box>
            </Flex>
        </Flex>
    );
}