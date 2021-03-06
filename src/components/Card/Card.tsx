import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { IconButton, Link as ChakraLink } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/system';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDeletePageMutation } from '../../generated/graphql';
import { MotionBox } from '../ui/Motion';
import { PageSlideFade } from '../ui/Transitions';

interface CardProps {
    id: number,
    pageTitle: string;
    pageText: string;
    aboutUs: string
    pageimgUrl?: string | null;
    creatorName: string;
    headerLink?: boolean;
    userIsOwner?: boolean;
}

export const Card: React.FC<CardProps> = ({
    id,
    pageTitle,
    pageText,
    aboutUs,
    pageimgUrl,
    headerLink,
    creatorName,
    userIsOwner = false,
}) => {
    const history = useHistory();
    const [deletePage] = useDeletePageMutation();

    //set editing or deleting
    const [editLoading, setEditLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleEditPage = () => {
        setEditLoading(true);
        history.push(`/pages/edit/${id}`);
    }

    const handleDeletePage = async () => {
        setDeleteLoading(true);

        const deleted = await deletePage({ variables: { id } });
        if (deleted.data?.deletePage) {
            history.push("/");
        }
        setDeleteLoading(false);
    }

    return (
        <PageSlideFade>
            <MotionBox whileHover={{ y: -5 }}>
                <Box
                    borderWidth="1px"
                    alignItems="center"
                    _hover={{ shadow: "lg" }}
                    rounded="md"
                    textAlign="center"
                    display="inline-block"
                    w="100%"
                    p={4}
                    mb={6}
                >
                    {userIsOwner ? (
                        <Flex direction="column" align="flex-end">
                            <Flex>
                                <IconButton aria-label="edit page" onClick={handleEditPage} icon={<EditIcon />} isloading={`${editLoading}`} />
                                <IconButton aria-label="delete page" onClick={handleDeletePage} icon={<DeleteIcon />} isloading={`${deleteLoading}`} />
                            </Flex>
                        </Flex>
                    ) : null}
                    <Box p={4} display={{ md: "flex" }}>
                        <Box flexShrink={0}>
                            {pageimgUrl ?
                                <Image
                                    borderRadius="lg"
                                    width={{ md: 40 }}
                                    src={pageimgUrl}
                                    alt={`image of ${creatorName}`}
                                />
                                : null}
                        </Box>
                        <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                            <Link to={`/pages/${id}`}>
                                <ChakraLink
                                    as={headerLink ? "a" : undefined}
                                    fontWeight="bold"
                                    textTransform="uppercase"
                                    fontSize="xl"
                                    letterSpacing="wide"
                                    color={useColorModeValue("teal.600", "teal.300")}

                                >
                                    {pageTitle}
                                </ChakraLink>
                            </Link>
                            <Text
                                mt={1}
                                display="block"
                                fontSize="md"
                                lineHeight="normal"
                                fontWeight="normal"
                            >
                                {aboutUs}
                            </Text>
                            <Text mt={2} color={useColorModeValue("grey.600", "gray.500")}>
                                {pageText}
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </MotionBox>
        </PageSlideFade>
    );
}