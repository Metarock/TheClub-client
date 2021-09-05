import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import React from "react";
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

    const { data, loading } = usePageQuery({ skip: getId === -1, variables: { id: getId } });
    console.log("Page ", data?.page.pageTitle);
    const [updatePage] = useEditPageMutation();

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
        <Responsive variant="small">
            <Formik
                initialValues={{ pageTitle: data.page.pageTitle, pageText: data.page.pageText, aboutUs: data.page.aboutUs }}
                onSubmit={async (values) => {
                    await updatePage({ variables: { id: getId, ...values } });
                    history.push("/");
                }}
            >
                {({ isSubmitting }) => {
                    <Form id="editPage" style={{ width: "100%" }}>
                        <Box>
                            <InputField name="pageTitle" placeholder="Title" label="Title" />
                        </Box>
                        <Box>
                            <InputField textarea name="pageText" placeholder="pageText" label="Text" />
                        </Box>
                        <Box mt={4}>
                            <InputField
                                textarea
                                name="aboutUs"
                                placeholder="text..."
                                label="About us"
                            />
                        </Box>
                        <Button mt={4} type="submit" isLoading={isSubmitting}>
                            Update page
                        </Button>
                    </Form>
                }}
            </Formik>
        </Responsive>
    );
}
