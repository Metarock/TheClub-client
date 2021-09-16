import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/react';
import React from 'react';

interface SearchProps {
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {
    return (
        <Box>
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