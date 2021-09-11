import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/system';
import React from 'react';
import { RouteComponentProps, useParams } from "react-router-dom";
import { Layout } from '../components/Layout';
import { useMeQuery, usePageQuery, usePostsQuery } from '../generated/graphql';

const Page: React.FC<RouteComponentProps> = ({ history }) => {
    const { id }: any = useParams(); //get id
    const getId = parseInt(id);


    const pageQuery = usePageQuery({ variables: { id: getId } });
    const { data: postData, error, loading: postLoading } = usePostsQuery();
    console.log(pageQuery);
    const { data, loading } = useMeQuery();
    // const { data: meData } = useMeQuery({ fetchPolicy: "network-only" });

    const page = pageQuery.data?.page;

    if (page === undefined) return <p>loading</p>
    if (page === null) return <p>Page not found</p> //error 404

    let body = null;
    if (!postLoading && !postData) {
        return (
            <div>
                <div>you got query failed for some reason</div>
                <div>{error?.message}</div>
            </div>
        )
    }

    if (loading) {
        //user is not logged in
    }
    else if (!!data?.me && data?.me.id === page.creator.id) { //if user and creator id match allow them to post
        body = (
            <>
                <Flex align='center'>
                    user and creator id is equal
                </Flex>
            </>
        )

    }

    return (
        <>
            <Flex
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                mt={4}
            >
                <Flex
                    display="flex"
                    flexDirection="row"
                    alignItems="flex-start"
                    justifyContent="flex-start"
                >
                    <Text fontSize="xxx-large" fontWeight="bold">{page.pageTitle}</Text>
                </Flex>
                <Box>
                    <Image
                        size="150px"
                        src={page.pageimgUrl}
                        width="150%"
                        height="auto"
                        minHeight="250px"
                    />
                </Box>
                {body}
            </Flex>
            <Box
                borderRadius="lg"
                pl={3}
                pr={3}
                pt={5}
                pb={5}
                display="inherit"
                boxShadow="sm"
            >
                <Flex
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    mt={4}>
                    <Flex
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        mb={7}
                    >
                        <Text
                            textTransform={'uppercase'}
                            color={'teal.300'}
                            fontWeight={500}
                            fontSize="50px"
                            bg={useColorModeValue('blue.50', 'blue.900')}
                            p={2}
                            alignSelf={'flex-start'}
                            rounded={'md'}>
                            About us
                        </Text>
                    </Flex>
                    <Text fontWeight={600} fontSize="22px">{page.aboutUs}</Text>
                </Flex>
            </Box>
            <Box>
                <Box
                    borderRadius="lg"
                    boxShadow="sm"
                    pl={3}
                    pr={3}
                    pt={5}
                    pb={5}
                    display="block"
                >
                    <Flex
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        mt={4}>
                        <Flex
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="flex-start"
                            mb={7}
                        >
                            <Text
                                textTransform={'uppercase'}
                                color={'teal.300'}
                                fontWeight={500}
                                fontSize="50px"
                                bg={useColorModeValue('blue.50', 'blue.900')}
                                p={2}
                                alignSelf={'flex-start'}
                                rounded={'md'}>
                                Description
                            </Text>
                        </Flex>
                        <Text fontWeight={600} fontSize="22px">{page.pageText}</Text>
                    </Flex>
                </Box>
            </Box>
            <Layout>
                {!postData && postLoading ? (
                    <div>Loading....</div>
                ) : (
                    <Stack display="block" spacing={8}>
                        <Text
                            textTransform={'uppercase'}
                            color={'teal.300'}
                            fontWeight={500}
                            fontSize="50px"
                            bg={useColorModeValue('blue.50', 'blue.900')}
                            p={2}
                            alignSelf={'flex-start'}
                            rounded={'md'}>
                            Posts
                        </Text>
                        {postData?.posts.filter(x => x.postCreatorId === page.creatorId).map((p) => !p ? null : (
                            <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                                <Box flex={1}>
                                    <Heading fontSize="xl">
                                        {p.title}
                                    </Heading>
                                    <Text>Creator: {p.postCreator.creator.clubName}</Text>
                                    <Text>{p.text}</Text>
                                </Box>
                            </Flex>
                        ))}
                    </Stack>
                )}
            </Layout>
        </>
    );
}

export default Page;