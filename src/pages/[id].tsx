
import React from 'react';
import { useParams } from "react-router-dom"
import { Card } from '../components/Card';
import { Layout } from '../components/Layout';
import { useMeQuery, usePageQuery } from '../generated/graphql';

interface PageProps {

}

const Page: React.FC<PageProps> = () => {
    const { id }: any = useParams(); //get id
    // const id = parseInt(getId);
    console.log(parseInt(id));

    const pageQuery = usePageQuery({ variables: { id: parseInt(id) } });
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