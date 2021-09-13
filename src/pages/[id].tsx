import { AddIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { Button, IconButton, Link } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/system';
import React from 'react';
import { RouteComponentProps, useParams } from "react-router-dom";
import { EditDeletePostButtons } from '../components/EditDeletePostButtons';
import { Layout } from '../components/Layout';
import { PostsQuery, useMeQuery, usePageQuery, usePostsQuery } from '../generated/graphql';
import { timeStamp } from '../utils/timeStamp';

export const Page: React.FC<RouteComponentProps> = () => {
    const { id }: any = useParams(); //get id from the url
    const getId = parseInt(id); //convert the id to integer

    const pageQuery = usePageQuery({ variables: { id: getId } }); //get the specific page

    const { data: postData, error, loading: postLoading, fetchMore, variables } = usePostsQuery(
        {
            variables: { limit: 5, cursor: null },
            notifyOnNetworkStatusChange: true
        });

    console.log(pageQuery);

    const { data, loading } = useMeQuery();

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
                    <Link href={`/create-post`}>
                        <IconButton
                            aria-label="Create Post"
                            size={'sm'}
                            icon={<AddIcon />}
                        />
                    </Link>
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
                {!postData && postLoading ? (
                    <div>Loading....</div>
                ) : (
                    <Stack display="block" spacing={8}>
                        {body}
                        {/* .filter helps us distinguish which posts correlates with the page. Whether
                         it is the same owner/user that posts it */}
                        {postData?.posts.posts.filter(x => x.postCreatorId === page.creatorId).map((p) => !p ? null : (
                            <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                                <Box flex={1}>
                                    <Box ml="auto">
                                        <EditDeletePostButtons id={p.id} postCreatorId={p.postCreatorId} />
                                    </Box>
                                    <Heading fontSize="xl">
                                        {p.title}
                                    </Heading>
                                    <Text>Creator: {p.postCreator.creator.clubName}, {timeStamp(p.createdAt)}</Text>
                                    <Text>{p.text}</Text>
                                    {p.postimgUrl ? <Image size="80px" width="100%" height="auto" minHeight="146px" objectFit="cover" src={p.postimgUrl} mt={3} maxH={600} /> : null}
                                </Box>
                                <Flex align="center">
                                </Flex>
                            </Flex>
                        ))}
                    </Stack>
                )}
                {postData && postData.posts.hasMore ? (
                    <Flex>
                        <Button onClick={() => {
                            fetchMore({
                                variables: {
                                    limit: variables?.limit,
                                    cursor: postData.posts.posts[postData.posts.posts.length - 1].createdAt,
                                },
                                updateQuery: (prevValue, { fetchMoreResult }): PostsQuery => {
                                    if (!fetchMoreResult) {
                                        return prevValue as PostsQuery
                                    }

                                    return {
                                        __typename: 'Query',
                                        posts: {
                                            __typename: 'PaginatedPosts',
                                            hasMore: (fetchMoreResult as PostsQuery).posts.hasMore,
                                            posts: [
                                                ...(prevValue as PostsQuery).posts.posts,
                                                ...(fetchMoreResult as PostsQuery).posts.posts
                                            ]
                                        }
                                    }
                                }
                            })
                        }} isLoading={postLoading} m="auto" my={8}>
                            load more
                        </Button>
                    </Flex>
                ) : null}
            </Layout>
        </>
    );
}