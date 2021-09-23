
import { useApolloClient } from '@apollo/client';
import { ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Flex, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, useColorMode, useToast } from "@chakra-ui/react";
import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";

interface NavbarProps {

}


export const Navbar: React.FC<NavbarProps> = () => {
    const history = useHistory();
    const { colorMode } = useColorMode();
    const primaryColor = colorMode === "dark" ? "white" : "white";
    const { data, loading } = useMeQuery();
    const apolloClient = useApolloClient();
    const [logout, { loading: logoutFetching }] = useLogoutMutation();
    const toast = useToast()

    let body = null;
    //data is loading
    if (loading) {
        //user not logged in
    } else if (!data?.me) {
        body = (
            <Flex align='center'>
                {/* <Link mr={2} href="/login">
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
                </Link> */}
                <Menu >
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<HamburgerIcon />}
                        variant="outline"
                    />
                    <MenuList
                        bg={colorMode === "dark" ? "black" : "teal.400"}
                        color={primaryColor}
                        borderColor={colorMode === "dark" ? "black" : "teal.400"}
                    >
                        <Link to="/login">
                            <MenuItem
                                icon={<FiLogIn />}
                                color={primaryColor}
                            >
                                Login
                            </MenuItem>
                        </Link>
                        <Link to="/register">
                            <MenuItem
                                icon={<ExternalLinkIcon />}
                                ringColor={colorMode === "dark" ? "black" : "teal.400"}
                                color={primaryColor}
                            >
                                Register
                            </MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
            </Flex>
        )
    } else { //user logged
        const avatarImg = data?.me.userAvatar ? data?.me.userAvatar : 'https://source.unsplash.com/random';
        body = (
            <Flex align='center'>
                <Menu>
                    <MenuButton
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}>
                        <Avatar
                            size={'sm'}
                            src={
                                avatarImg
                            }
                        />
                    </MenuButton>
                    <MenuList
                        bg={colorMode === "dark" ? "black" : "teal.400"}
                        color={primaryColor}
                        borderColor={colorMode === "dark" ? "black" : "teal.400"}
                    >
                        <Link to="/create-page">
                            <MenuItem>
                                Create page
                            </MenuItem>
                        </Link>
                        <Link to="/edit-profile">
                            <MenuItem>
                                Settings
                            </MenuItem>
                        </Link>
                        <MenuItem onClick={async () => {
                            await logout();
                            await apolloClient.resetStore();
                            await toast({
                                position: "bottom-right",
                                title: "Logged out",
                                description: "Looking forward to see you again!",
                                status: "info",
                                duration: 9000,
                                isClosable: true,
                            })
                            history.push('/');
                        }}
                            color={primaryColor}
                            isLoading={logoutFetching}
                        >
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        )
    }
    return (
        <Flex zIndex={1} position="sticky" top={0} p={4} bg={colorMode === "dark" ? "black" : "teal.500"} color={primaryColor}>
            <Flex flex={1} m="auto" maxW={800} align='center'>
                <Link to="/">
                    <Image rounded="full"
                        w={[10, 12]}
                        h={[10, 12]}
                        objectFit="cover" fallbackSrc={'/images/club.png'}
                    />
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