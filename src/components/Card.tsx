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
            borderWidth={1}
            borderRadius={5}
            w="100%"
            p={4}
            mb={6}
        >
            <Flex justify="space-between">
                <Box>
                    <Heading>{pageTitle}</Heading>
                    <Text fontStyle="italic" fontSize={16} suppressHydrationWarning>
                        by {creatorName}
                    </Text>
                </Box>
                <Flex direction="column" align="flex-end">
                    <Flex align="center" mt={2}>
                        <Text whiteSpace="nowrap">About us: {aboutUs}</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Text mt={3} whiteSpace="break-spaces">Description: {pageText}</Text>
            {pageimgUrl ? <Image mx="auto" src={pageimgUrl} mt={3} maxH={500} /> : null}
        </Box>
    );
}