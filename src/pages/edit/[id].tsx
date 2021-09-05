import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { Responsive } from "../../components/Responsive";
import { useEditPageMutation, usePageQuery } from "../../generated/graphql";

export const EditPage: React.FC<RouteComponentProps> = ({ history }) => {
    const { id }: any = useParams();
    console.log(id);
    const getId = parseInt(id);
    console.log(getId);

    const { data, loading } = usePageQuery({ variables: { id: getId } });
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
        <Responsive variant="regular">
            <Formik
                initialValues={{ pageTitle: data.page.pageTitle, pageText: data.page.pageText, aboutUs: data.page.aboutUs }}
                onSubmit={async (values, { setErrors, resetForm }) => {
                    await updatePage({ variables: { id: getId, ...values } })
                    history.push("/");
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="pageTitle"
                            placeholder="pageTitle"
                            label="Title"
                        />
                        <Box mt={4}>
                            <InputField
                                textarea
                                name="pageText"
                                placeholder="text..."
                                label="Description"
                            />
                        </Box>
                        <Box mt={4}>
                            <InputField
                                textarea
                                name="aboutUs"
                                placeholder="text..."
                                label="About us"
                            />
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            Update post
                        </Button>

                    </Form>
                )}

            </Formik>
        </Responsive>
    );
}


{/* <form onSubmit={async e => {
    console.log("edit");
    await updatePage({
        variables: {
            id: getId,
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
</form> */}