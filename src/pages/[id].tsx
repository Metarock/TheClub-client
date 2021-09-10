import { Image } from '@chakra-ui/image';
import { Box, Divider, Flex, Grid, Stack, Text } from '@chakra-ui/layout';
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
                        display="inline-block"
                        boxShadow="md"
                        ml={100}
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
                                    fontSize="40px"
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
                </Stack>
            </Grid>
            <Divider width={1500} display="inline-block" orientation="horizontal" ml={550} />
            <Box>
                <Box
                    borderRadius="lg"
                    boxShadow="md"
                    pl={3}
                    pr={3}
                    pt={5}
                    pb={5}
                    display="inline-block"
                    ml={1000}
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
        </>
    );
}

export default Page;