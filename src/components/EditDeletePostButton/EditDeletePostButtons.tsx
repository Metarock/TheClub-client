import { IconButton } from '@chakra-ui/button';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Link as ChakraLink } from '@chakra-ui/layout';
import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDeletePostMutation, useMeQuery } from '../../generated/graphql';

interface EditDeletePostButtonsProps {
    id: number
    postCreatorId: number
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({ id, postCreatorId }) => {
    const { data } = useMeQuery();
    const [deletePost] = useDeletePostMutation();
    const history = useHistory();

    if (data?.me?.id !== postCreatorId) {
        return null;
    }
    return (
        <Box>
            <Link to={`/post/editPost/${id}`}>
                <ChakraLink>
                    <IconButton
                        mr={4}
                        size="sm"
                        aria-label="Edit Post"
                        icon={<EditIcon />}
                    />
                </ChakraLink>
            </Link>
            <IconButton
                mr={4}
                aria-label="Edit Post"
                size="sm"
                icon={<DeleteIcon />}
                onClick={async () => {
                    await deletePost({
                        variables: { id }, update: (cache) => {
                            cache.evict({ id: 'Post: ' + id })
                            console.log("Successfully deleted: ", cache);
                        }
                    })
                    history.push('/');
                }}
            />
        </Box>
    );
}