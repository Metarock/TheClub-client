import React, { useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { useEditPageMutation, usePageQuery } from "../../generated/graphql";

export const EditPage: React.FC<RouteComponentProps> = ({ history }) => {
    const { id }: any = useParams();
    console.log(id);
    const getId = parseInt(id);
    console.log(getId);

    const { data, loading } = usePageQuery({ variables: { id } });
    console.log("Page ", data?.page.pageTitle);
    console.log("Page ", data?.page.pageText);
    console.log("Page ", data?.page.aboutUs);
    const [updatePage] = useEditPageMutation();
    const [pageTitle, setPageTitle] = useState('');
    const [pageText, setPageText] = useState('');
    const [aboutUs, setAboutUs] = useState('');

    if (loading) {
        return (
            <Layout>
                <div>Loading....</div>
            </Layout>
        )
    }

    if (!data?.page) {
        return (
            <Layout>
                <div>Loading....</div>
            </Layout>
        )
    }

    return (
        <form onSubmit={async e => {
            console.log("edit");
            await updatePage({
                variables: {
                    id: id,
                    pageTitle,
                    pageText,
                    aboutUs
                }
            })

            history.push('/');
        }}>
            <div>
                <input
                    value={pageTitle}
                    placeholder={data?.page.pageTitle}
                    onChange={e => {
                        setPageTitle(e.target.value)
                    }}
                />
            </div>
            <div>
                <input
                    value={pageText}
                    placeholder={data?.page.pageText}
                    onChange={e => {
                        setPageText(e.target.value)
                    }}
                />
            </div>
            <div>
                <input
                    value={aboutUs}
                    placeholder={data?.page.aboutUs}
                    onChange={e => {
                        setAboutUs(e.target.value)
                    }}
                />
            </div>
            <button type="submit">update page</button>
        </form>
    );
}
