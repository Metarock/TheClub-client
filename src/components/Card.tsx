import { Image } from '@chakra-ui/image';
import { Box, Heading, Text } from '@chakra-ui/layout';
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
            borderWidth={1}
            borderRadius={2}
            alignItems="center"
            textAlign="center"
            display="inline-block"
            w="100%"
            p={4}
            mb={6}
        >
            <Box display="block" textAlign="center" ml="auto">
                <Heading size="xl" fontWeight="extrabold">{pageTitle}</Heading>
                <Text fontWeight="medium" display="block" fontSize={16} suppressHydrationWarning>
                    by {creatorName}
                </Text>
                <Text display="block" fontWeight="medium">About us:</Text>
                <Text>{aboutUs}</Text>
                <Text mt={3} whiteSpace="break-spaces">Description:</Text>
                <Text>{pageText}</Text>
                {pageimgUrl ? <Image mx="auto" src={pageimgUrl} mt={3} maxH={800} /> : null}
            </Box>
        </Box>
    );
}