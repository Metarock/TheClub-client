import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import React from "react";
import { RouteComponentProps, useParams } from "react-router";
import { Layout, Responsive, InputField } from "../../../../components/exportComponents";
import { useEditPageMutation, usePageQuery } from "../../../../generated/graphql";

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
    if (loading || !data?.page) {
        return (
            <Layout>
                <div>Loading....</div>
            </Layout>
        )
    }

    return (
        <Responsive variant="regular">
            <Formik
                initialValues={{ pageTitle: data.page.pageTitle, pageText: data.page.pageText, aboutUs: data.page.aboutUs, pageimgUrl: data.page.pageimgUrl }}
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
                        <Box mt={4}>
                            <InputField
                                name="pageimgUrl"
                                placeholder="text..."
                                label="Image "
                            />
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            Update page
                        </Button>

                    </Form>
                )}

            </Formik>
        </Responsive>
    );
}