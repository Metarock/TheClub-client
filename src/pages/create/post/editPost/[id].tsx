import { Button } from "@chakra-ui/button";
import { Box, Spinner } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { RouteComponentProps, useParams } from "react-router";
import { InputField, Responsive } from "../../../../components/exportComponents";
import { MotionBox } from "../../../../components/ui/Motion";
import { usePostQuery, useUpdatePostMutation } from "../../../../generated/graphql";

export const EditPost: React.FC<RouteComponentProps> = ({ history }) => {
    const { id }: any = useParams(); //get id
    const getId = parseInt(id);

    const { data, loading } = usePostQuery({ variables: { id: getId } });
    const [updatePost] = useUpdatePostMutation();

    if (loading || !data?.post) {
        return (
            <Box
                height="650px"
                width="780px"
                position="fixed"
                top="50%"
                left="50%"
                mt="-80px"
                ml="-30px"
            >
                <Spinner size="xl" />
            </Box>
        )
    }

    return (
        <Responsive variant="regular">
            <MotionBox
                opacity="0"
                initial={{
                    translateX: -150,
                    opacity: 0
                }}
                animate={{
                    translateX: 0,
                    opacity: 1,
                    transition: {
                        duration: 0.55
                    }
                }}
            >

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
            </MotionBox>
        </Responsive>
    )
}
