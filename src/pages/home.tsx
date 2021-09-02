import { Box, Container, Divider, Flex, Heading, Image, SimpleGrid, Stack, StackDivider, Text } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/system';
import React, { ReactElement } from 'react';
import { FaMapMarkedAlt, FaMoneyBill, FaOldRepublic } from 'react-icons/fa';
import { RouteComponentProps } from 'react-router';
import { Card } from '../components/Card';

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


export const Home: React.FC<RouteComponentProps> = () => {
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
                        Our Story
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
            <Box direction="row" h="500px" p={10}>
                <Divider orientation="horizontal" />
                <Card />
            </Box>
        </Container>
    );
}