import { IconButton } from '@chakra-ui/button';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Link } from '@chakra-ui/layout';
import React from 'react';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';

interface EditDeletePostButtonsProps {
    id: number
    postCreatorId: number
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({ id, postCreatorId }) => {
    const { data } = useMeQuery();
    const [deletePost] = useDeletePostMutation();

    if (data?.me?.id !== postCreatorId) {
        return null;
    }
    return (
        <Box>
            <Link href={`/pages/editPost/${encodeURIComponent(id)}`}>
                <IconButton
                    mr={4}
                    aria-label="Edit Post"
                    icon={<EditIcon />}
                />
            </Link>
            <IconButton
                mr={4}
                aria-label="Edit Post"
                icon={<DeleteIcon />}
                onClick={async () => {
                    await deletePost({
                        variables: { id }, update: (cache) => {
                            cache.evict({ id: 'Post: ' + id })
                            console.log("Successfully deleted: ", cache);
                        }
                    })
                }}
            />
        </Box>
    );
}