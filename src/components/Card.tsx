import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import React from 'react';

interface CardProps {
    id: number,
    pageTitle: string;
    pageText: string;
    aboutUs: string
    pageimgUrl?: string | null;
    creatorName: string;
}

export const Card: React.FC<CardProps> = ({
    id,
    pageTitle,
    pageText,
    aboutUs,
    pageimgUrl,
    creatorName,
}) => {

    return (
        <Box
            borderWidth={2}
            borderRadius={5}
            alignItems="center"
            textAlign="center"
            display="inline-block"
            w="100%"
            p={4}
            mb={6}
        >
            <Box display="block" textAlign="center" ml="auto">
                <Heading mr={2} mt={2} ml={4}>{pageTitle}</Heading>
                <Text display="block" fontSize={16} suppressHydrationWarning>
                    by {creatorName}
                </Text>
                <Text display="block" m={3} mr={5} flexDirection="row">About us: {aboutUs}</Text>
            </Box>
            <Text mt={3} whiteSpace="break-spaces">Description: {pageText}</Text>
            {pageimgUrl ? <Image mx="auto" src={pageimgUrl} mt={3} maxH={300} /> : null}
        </Box>
    );
}