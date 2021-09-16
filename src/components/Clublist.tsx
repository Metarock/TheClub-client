import { Text } from '@chakra-ui/react';
import React from 'react';
import { MeQuery } from '../generated/graphql';
import { Card } from './Card';

interface ClublistProps {
    data: any[];
    meData: MeQuery;
}

export const Clublist: React.FC<ClublistProps> = ({ data, meData }) => {
    return (

        <>
            {!data ? (
                <Text fontWeight="medium">This is where the card will be</Text>
            ) : (
                <>
                    {data!.map((p) => !p ? null : (
                        <Card
                            key={p.id}
                            creatorName={p.creator.clubName}
                            userIsOwner={!!meData?.me && meData?.me.id === p.creator.id}
                            {...p}
                            headerLink
                        />
                    ))}
                </>
            )}

        </>
    );
}