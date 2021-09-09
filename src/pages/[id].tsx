import { Image } from '@chakra-ui/image';
import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/system';
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
                    <Text fontSize="3xl" fontWeight="bold">{page.pageTitle}</Text>
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
            <Grid p={10} gap={6} templateColumns="repeat(2, 1fr)">
                <Stack>
                    <Box
                        borderRadius="lg"
                        pl={3}
                        pr={3}
                        pt={5}
                        pb={5}
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
                                    color={'teal.400'}
                                    fontWeight={600}
                                    fontSize={'xl'}
                                    bg={useColorModeValue('blue.50', 'blue.900')}
                                    p={2}
                                    alignSelf={'flex-start'}
                                    rounded={'md'}>
                                    About us
                                </Text>
                            </Flex>
                            <Text>{page.aboutUs}</Text>
                        </Flex>
                    </Box>
                </Stack>
                <Stack>
                    <Box
                        borderRadius="lg"
                        pl={3}
                        pr={3}
                        pt={5}
                        pb={5}
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
                                    color={'teal.400'}
                                    fontWeight={600}
                                    fontSize={'xl'}
                                    bg={useColorModeValue('blue.50', 'blue.900')}
                                    p={2}
                                    alignSelf={'flex-start'}
                                    rounded={'md'}>
                                    Description
                                </Text>
                            </Flex>
                            <Text>{page.pageText}</Text>
                        </Flex>
                    </Box>
                </Stack>
            </Grid>
        </>
    );
}

export default Page;