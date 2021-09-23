import { Box, Heading, Spinner } from '@chakra-ui/react';
import React from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom';
import { EditDeletePostButtons, Layout } from '../../../components/exportComponents';
import { MotionBox } from '../../../components/ui/Motion';
import { usePostQuery } from '../../../generated/graphql';



export const Post: React.FC<RouteComponentProps> = () => {
    const { id }: any = useParams(); //get id from the url
    const getId = parseInt(id); //convert the id to integer

    const { data, loading, error } = usePostQuery({ variables: { id: getId } });

    if (loading) {
        return (
            <Box
                height="650px"
                width="780px"
                position="fixed"
                top="50%"
                left="50%"
                mt="-80px"
                ml="-30px"
            >
                <Spinner size="xl" />
            </Box>
        )
    }

    if (error) {
        return <div>{error.message}</div>
    }

    if (!data?.post) {
        return (
            <Layout>
                <Box>Could not find post</Box>
            </Layout>
        )
    }
    return (
        <Layout>
            <MotionBox
                opacity="0"
                initial={{
                    translateX: 150,
                    opacity: 0
                }}
                animate={{
                    translateX: 0,
                    opacity: 1,
                    transition: {
                        duration: 0.55
                    }
                }}
            >
                <Heading mb={4}>{data.post.title}</Heading>
                <Box mb={4}>
                    {data.post.text}
                </Box>
                <EditDeletePostButtons id={data.post.id} postCreatorId={data.post.postCreator.creator.id} />
            </MotionBox>
        </Layout>
    );
}