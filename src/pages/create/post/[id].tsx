import { Box, Heading } from '@chakra-ui/react';
import React from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom';
import { EditDeletePostButtons, Layout } from '../../../components/exportComponents';
import { usePostQuery } from '../../../generated/graphql';



export const Post: React.FC<RouteComponentProps> = ({ }) => {
    const { id }: any = useParams(); //get id from the url
    const getId = parseInt(id); //convert the id to integer

    const { data, loading, error } = usePostQuery({ variables: { id: getId } });

    if (loading) {
        return (
            <Layout>
                loading....
            </Layout>
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
            <Heading mb={4}>{data.post.title}</Heading>
            <Box mb={4}>
                {data.post.text}
            </Box>
            <EditDeletePostButtons id={data.post.id} postCreatorId={data.post.postCreator.creator.id} />
        </Layout>
    );
}