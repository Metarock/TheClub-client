import { Image } from '@chakra-ui/image';
import { Box, Container, Heading, SimpleGrid, Text } from '@chakra-ui/layout';
import React from 'react';
import { RouteComponentProps, useParams } from "react-router-dom";
import { usePageQuery } from '../generated/graphql';

const Page: React.FC<RouteComponentProps> = ({ history }) => {
    const { id }: any = useParams(); //get id
    const getId = parseInt(id);


    const pageQuery = usePageQuery({ variables: { id: getId } });
    console.log(pageQuery);
    // const { data: meData } = useMeQuery({ fetchPolicy: "network-only" });

    const page = pageQuery.data?.page;

    if (page === undefined) return <p>loading</p>
    if (page === null) return <p>Page not found</p> //error 404
    return (
        <Container maxW={'5xl'} py={12}>
            <Text>Post button somewhere here</Text>
            <SimpleGrid>
                <Box display="block" textAlign="center">
                    <Heading textTransform={'uppercase'}>{page.pageTitle}</Heading>
                </Box>
                <Image mx="auto" src={page.pageimgUrl} mt={3} maxH={800} />
                <Box display="block" textAlign="center">
                    <Text display="block" fontWeight="medium">About us</Text>
                    <Text>{page.aboutUs}</Text>
                </Box>
                <Box display="block" textAlign="center">
                    <Text>Description of the club</Text>
                    <Text>{page.pageText}</Text>
                </Box>

                <Text>This is where they will post</Text>
            </SimpleGrid>
        </Container>
    );
}

export default Page;