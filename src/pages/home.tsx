/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Divider, Flex, Heading, Image, SimpleGrid, Stack, StackDivider, Text } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/system';
import React, { ReactElement, useEffect, useState } from 'react';
import { FaMapMarkedAlt, FaMoneyBill, FaOldRepublic } from 'react-icons/fa';
import { RouteComponentProps } from 'react-router';
import { Clublist } from '../components/Clublist';
import { Search } from '../components/Search';
import { useMeQuery, usePagesQuery } from '../generated/graphql';

/**
 * TO DO 
 * 
 * Add a filter search
 */
interface FeatureProps {
    text: string;
    iconBg: string;
    icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
    return (
        <Stack direction={'row'} align={'center'}>
            <Flex
                w={8}
                h={8}
                align={'center'}
                justify={'center'}
                rounded={'full'}
                bg={iconBg}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{text}</Text>
        </Stack>
    );
};


export const Home: React.FC<RouteComponentProps | React.Component> = () => {
    const { data } = usePagesQuery();
    const { data: meData } = useMeQuery();
    const [searchQuery, setSearchQuery] = useState('');
    const [clubListDefault, setClubListDefault] = useState([]);
    const [clubList, setClubList] = useState([]);

    const updateInput = async (input: any) => {
        const filtered = clubListDefault.filter((club) => {
            return club.creator.clubName.toLowerCase() === input.toLowerCase() || club.pageTitle.toLowerCase() === input.toLowerCase();
        })
        console.log('setClubList ', clubList);
        console.log('setClubListDefault ', clubListDefault);
        console.log('input', input);
        if (input === '') {
            console.log("empty");
            setSearchQuery(input)
            setClubList(data!.pages);
            return;
        }
        setSearchQuery(input)
        setClubList(filtered);
        console.log('filtered', filtered)
    }

    const fetchData = () => {
        if (!data) {

        } else {
            setClubListDefault(data!.pages)
            setClubList(data!.pages);
        }

    }



    useEffect(() => {
        fetchData()
    }, [data])

    return (
        <Container maxW={'5xl'} py={12}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Stack spacing={4}>
                    <Text
                        textTransform={'uppercase'}
                        color={'blue.400'}
                        fontWeight={600}
                        fontSize={'sm'}
                        bg={useColorModeValue('blue.50', 'blue.900')}
                        p={2}
                        alignSelf={'flex-start'}
                        rounded={'md'}>
                        Our Story: Prove this is working
                    </Text>
                    <Heading>A platform for all University Clubs</Heading>
                    <Text color={'gray.500'} fontSize={'lg'}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                        nonumy eirmod tempor invidunt ut labore
                    </Text>
                    <Stack
                        spacing={4}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <Feature
                            icon={
                                <FaOldRepublic />
                            }
                            iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                            text={'Business Planning'}
                        />
                        <Feature
                            icon={<FaMoneyBill />}
                            iconBg={useColorModeValue('green.100', 'green.900')}
                            text={'Financial Planning'}
                        />
                        <Feature
                            icon={
                                <FaMapMarkedAlt />
                            }
                            iconBg={useColorModeValue('purple.100', 'purple.900')}
                            text={'Market Analysis'}
                        />
                    </Stack>
                </Stack>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={'feature image'}
                        src={
                            'https://cdn.dribbble.com/users/822403/screenshots/14780543/media/afaded68aacf0f9962938f80a5f74317.png?compress=1&resize=1200x900'
                        }
                        objectFit={'cover'}
                    />
                </Flex>
            </SimpleGrid>
            <Box direction="row" h="50px" p={10}>
                <Divider orientation="horizontal" />
            </Box>
            <Box>
                <Search searchQuery={searchQuery} setSearchQuery={updateInput} />
            </Box>
            <Box direction="row" h="50px" p={10}>
                <Divider orientation="horizontal" />
            </Box>
            <Clublist data={clubList} meData={meData} />
        </Container>
    );
}