
import { useApolloClient } from '@apollo/client';
import { Box, Button, Flex, Link, useColorMode } from "@chakra-ui/react";
import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavbarProps {

}


export const Navbar: React.FC<NavbarProps> = () => {
    const { colorMode } = useColorMode();
    const primaryColor = colorMode === "dark" ? "white" : "white";
    const { data, loading } = useMeQuery();
    const apolloClient = useApolloClient();
    const [logout, { loading: logoutFetching }] = useLogoutMutation();


    let body = null;

    //data is loading
    if (loading) {
        //user not logged in
    } else if (!data?.me) {
        body = (
            <>
                <Link mr={2} href="/login">
                    <Button
                        bg={colorMode === "dark" ? "black" : "teal.500"}
                        color={primaryColor}
                        mr={4}
                        variant="outline"
                    >
                        Login
                    </Button>
                </Link>
                <Link mr={2} href="/register">
                    <Button
                        bg={colorMode === "dark" ? "black" : "teal.500"}
                        color={primaryColor}
                        mr={4}
                        variant="outline"
                    >
                        Register
                    </Button>
                </Link>
            </>
        )
    } else { //user logged
        body = (
            <Flex align='center'>
                <Link href="/create-page">
                    <Button
                        bg={colorMode === "dark" ? "black" : "teal.500"}
                        color={primaryColor} mr={4}
                        variant="outline">
                        Create page
                    </Button>
                </Link>
                <Box mr={2}>Welcome: {data.me.clubUsername}</Box>
                <Button onClick={async () => {
                    await logout();
                    await apolloClient.resetStore()
                }}
                    bg={colorMode === "dark" ? "black" : "teal.500"}
                    color={primaryColor}
                    isLoading={logoutFetching}
                    varaint="link">logout
                </Button>
            </Flex>)
    }
    return (
        <Flex zIndex={1} position="sticky" top={0} p={4} bg={colorMode === "dark" ? "black" : "teal.500"} color={primaryColor}>
            <Flex flex={1} m="auto" maxW={800} align='center'>
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