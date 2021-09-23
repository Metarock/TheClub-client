import { Box, Button, Heading, Text, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import * as Yup from 'yup';
import { InputField, Responsive } from '../../components/exportComponents';
import { useForgotPasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';


export const ForgotPassword: React.FC<RouteComponentProps> = () => {
    const [complete, setComplete] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();
    const toast = useToast();

    return (
        <Responsive variant="small">
            <Box
                alignItems="center"
                textAlign="center"
                display="inline-block"
                w="100%"
                p={4}
                mb={6}
            >
                <Heading textAlign="center" size="xl" fontWeight="extrabold">
                    Forgot Password
                </Heading>
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string().email("invalid email address").required("email required")
                    })}
                    onSubmit={async (values, { setErrors }) => {
                        const response = await forgotPassword({ variables: values });


                        console.log('response newpassword: ', response.data?.forgotPassword.user?.id);
                        if (response.data?.forgotPassword.errors) {
                            console.log('error cant find email', response.data.forgotPassword.errors);
                            setErrors(toErrorMap(response.data.forgotPassword.errors));
                            return;
                        }
                        toast({
                            position: 'bottom-right',
                            title: "Email sent",
                            status: "success",
                            duration: 2000,
                            isClosable: true,
                        })
                        setComplete(true);

                    }}
                >
                    {({ isSubmitting }) => complete ? (
                        <Box>
                            <Text>Request sent, please check your inbox for a link to reset your password</Text>
                            <Text>Be sure, to check your spam if you haven't received it in a couple of minutes</Text>
                        </Box>
                    ) : (
                        <Form>
                            <InputField
                                name="email"
                                placeholder="email"
                                label="Email"
                                type="email"
                            />
                            <Button
                                mt={4}
                                type="submit"
                                isLoading={isSubmitting}
                                colorScheme="teal"
                            >
                                Forgot Password
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Responsive>
    );
}
