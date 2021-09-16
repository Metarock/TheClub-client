import { Input } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/system';
import React from 'react';

interface SearchProps {
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {
    return (
        <Box>
            <Text
                textTransform={'uppercase'}
                color={'blue.400'}
                fontWeight={600}
                fontSize={'md'}
                bg={useColorModeValue('blue.50', 'blue.900')}
                p={2}
                alignSelf={'flex-start'}
                rounded={'md'}>
                Search Title or Club
            </Text>
            <Input
                name="clubname"
                placeholder="clubname"
                label="Search clubname"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
        </Box>
    );
}