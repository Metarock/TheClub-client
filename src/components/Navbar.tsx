
import { Box, Flex, Link, useColorMode } from "@chakra-ui/react";
import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavbarProps {

}


export const Navbar: React.FC<NavbarProps> = () => {
    const { colorMode } = useColorMode();
    const primaryColor = colorMode === "dark" ? "white" : "white";
    const { data, loading } = useMeQuery({ skip: isServer() });


    let body = null;

    //data is loading
    if (loading) {
        //user not logged in
    } else if (!data?.me) {
        body = (
            <>
                <Link mr={2} href="/login">Login</Link>
            </>
        )
    }
    return (
        <Flex zIndex={1} position="sticky" top={0} p={4} bg={colorMode === "dark" ? "black" : "teal.500"} color={primaryColor}>
            <Flex flex={1} m="auto" align='center'>
                <Link href="/">
                    TheClub
                </Link>
                <Box ml={"auto"}>
                    {body}
                </Box>
                <Box textAlign="center" fontSize="xl" color={primaryColor}>
                    <ColorModeSwitcher justifySelf="flex-end" />
                </Box>
            </Flex>
        </Flex>
    );
}