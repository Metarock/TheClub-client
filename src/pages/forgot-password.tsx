import { Box, Button, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { InputField } from '../components/InputField';
import { Responsive } from '../components/Responsive';
import { useForgotPasswordMutation } from '../generated/graphql';
import * as Yup from 'yup';
import { toErrorMap } from '../utils/toErrorMap';


const ForgotPassword: React.FC<RouteComponentProps> = () => {
    const [complete, setComplete] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();

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


export default ForgotPassword;