
import { Image } from '@chakra-ui/image';
import { Container, Heading, SimpleGrid } from '@chakra-ui/layout';
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
            <SimpleGrid>
                <Heading textTransform={'uppercase'}>{page.pageTitle}</Heading>
                <Image mx="auto" src={page.pageimgUrl} mt={3} maxH={800} />
            </SimpleGrid>
        </Container>
    );
}

export default Page;