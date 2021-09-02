import { Text } from '@chakra-ui/layout';
import React from 'react';

interface CardProps {

}

export const Card: React.FC<CardProps> = () => {
    return (
        <Text alignSelf={'flex-start'}
            rounded={'md'}> This is where the cards will be</Text>
    );
}