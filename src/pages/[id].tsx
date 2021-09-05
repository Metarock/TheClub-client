
import React from 'react';
import { RouteComponentProps, useParams } from "react-router-dom"
import { Card } from '../components/Card';
import { Layout } from '../components/Layout';
import { useMeQuery, usePageQuery } from '../generated/graphql';

const Page: React.FC<RouteComponentProps> = ({ history }) => {
    const { id }: any = useParams(); //get id


    const pageQuery = usePageQuery({ variables: { id } });
    console.log(pageQuery);
    const { data: meData } = useMeQuery();

    const page = pageQuery.data?.page;

    if (page === undefined) return <p>loading</p>
    if (page === null) return <p>Page not found</p> //error 404
    return (
        <Layout>
            <Card
                {...page}
                creatorName={page.creator.clubUsername}
                userIsOwner={!!meData?.me && meData.me?.id === page.creator.id}
            />
        </Layout>
    );
}

export default Page;