import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useForgotPasswordMutation } from '../../generated/graphql';
import * as Yup from 'yup';
import { toErrorMap } from '../../utils/toErrorMap';
import { Responsive, InputField } from '../../components/exportComponents';


export const ForgotPassword: React.FC<RouteComponentProps> = () => {
    const [complete, setComplete] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();
    const toast = useToast();

    return (
        <Responsive variant="small">
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
                        title: "Logged in",
                        description: "You have successfully logged in",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                    })
                    setComplete(true);

                }}
            >
                {({ isSubmitting }) => complete ? (
                    <Box>
                        <Text>If account with email exists, sent a confirmation email in your inbox</Text>
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
        </Responsive>
    );
}
