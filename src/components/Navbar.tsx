
import React, { useState } from 'react'
import { Box, Button, Flex, Icon, Link, useColorMode } from "@chakra-ui/react";
import { ColorModeSwitcher } from '../ColorModeSwitcher';

interface NavbarProps {

}


export const Navbar: React.FC<NavbarProps> = ({ }) => {
    const { colorMode } = useColorMode();
    const primaryColor = colorMode === "dark" ? "white" : "white";
    return (
        <Flex zIndex={1} position="sticky" top={0} p={4} bg={colorMode === "dark" ? "black" : "teal.500"} color={primaryColor}>
            <Flex flex={1} m="auto" align='center'>
                <Link to="/">
                    TheClub
                </Link>
                <Box textAlign="center" fontSize="xl" color={primaryColor}>
                    <ColorModeSwitcher justifySelf="flex-end" />
                </Box>
            </Flex>
        </Flex>
    );
}