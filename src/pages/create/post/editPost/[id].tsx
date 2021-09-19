import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import React from "react";
import { RouteComponentProps, useParams } from "react-router";
import { Layout, Responsive, InputField } from "../../../../components/exportComponents";
import { usePostQuery, useUpdatePostMutation } from "../../../../generated/graphql";

export const EditPost: React.FC<RouteComponentProps> = ({ history }) => {
    const { id }: any = useParams(); //get id
    const getId = parseInt(id);

    const { data, loading } = usePostQuery({ variables: { id: getId } });
    const [updatePost] = useUpdatePostMutation();

    if (loading || !data?.post) {
        return (
            <Layout>
                <div>Loading....</div>
            </Layout>
        )
    }

    return (
        <Responsive variant="regular">
            <Formik
                initialValues={{ title: data.post.title, text: data.post.text }}
                onSubmit={async (values, { setErrors, resetForm }) => {
                    await updatePost({ variables: { id: getId, ...values } })
                    history.push(`/pages/${encodeURIComponent(getId)}`)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="title"
                            placeholder="title"
                            label="Title"
                        />
                        <InputField
                            textarea
                            name="text"
                            placeholder="text"
                            label="text"
                        />
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
    )
}
