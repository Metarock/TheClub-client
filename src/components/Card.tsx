import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDeletePageMutation } from '../generated/graphql';
import PageIcon from './PageIcon';

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
        history.push(`/page/edit/${id}`);
    }

    const handleDeletePage = async () => {
        setDeleteLoading(true);

        const deleted = await deletePage({ variables: { id } });
        if (deleted.data?.deletePage) history.push("/");

        setDeleteLoading(false);
    }

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
                {userIsOwner ? (
                    <Flex direction="column" align="flex-end">
                        <Flex>
                            <IconButton aria-label="edit page" onClick={handleEditPage} icon={<EditIcon />} isloading={`${editLoading}`} />
                            <IconButton aria-label="delete page" onClick={handleDeletePage} icon={<DeleteIcon isloading={`${deleteLoading}`} />} />
                        </Flex>
                    </Flex>
                ) : null}
                <Heading as={headerLink ? "a" : undefined} size="xl" fontWeight="extrabold" href={`/page/${id}`}>{pageTitle}</Heading>
                <Text fontWeight="medium" display="block" fontSize={16} suppressHydrationWarning>
                    by {creatorName}
                </Text>
                <Text display="block" fontWeight="medium">About us:</Text>
                <Text>{aboutUs}</Text>
                <Text mt={3} whiteSpace="break-spaces">Description:</Text>
                <Text fontWeight="medium">{pageText}</Text>
                {pageimgUrl ? <Image mx="auto" objectFit="cover" src={pageimgUrl} mt={3} maxH={800} /> : null}
            </Box>
        </Box>
    );
}