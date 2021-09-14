import React, { ReactNode } from "react";
import { chakra, Container, Flex, Skeleton, Stack, Text, useColorModeValue, VisuallyHidden } from '@chakra-ui/react';
import { Layout } from "./Layout";
import { FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";

export default {
    title: 'Footer',
}

const SocialButton = ({
    children,
    label,
    href,
}: {
    children: ReactNode;
    label: string;
    href: string;
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

/** props don't work, default animation doesn't appear */
export const SkeletonIssue: React.FC = () => (
    <Flex
        zIndex={1}
        as="footer"
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        bottom={0}
        position='fixed'
        width="100%"
        textAlign="center"
    >
        <Container
            as={Stack}
            maxW={'5xl'}
            py={2}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ base: 'center', md: 'space-between' }}
            align={{ base: 'center', md: 'center' }}>
            <Text>© 2021 John Isaiah Sangalang</Text>
            <Stack direction={'row'} spacing={6}>
                <SocialButton label={'Twitter'} href={'https://twitter.com/esang037'}>
                    <FaTwitter />
                </SocialButton>
                <SocialButton label={'Github'} href={'https://github.com/Metarock'}>
                    <FaGithub />
                </SocialButton>
                <SocialButton label={'Instagram'} href={'https://www.instagram.com/jirsangalang/'}>
                    <FaInstagram />
                </SocialButton>
            </Stack>
        </Container>
    </Flex>
)
