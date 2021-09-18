import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Responsive } from '../components/Responsive';
import { useForgotPasswordMutation } from '../generated/graphql';



const ForgotPassword: React.FC<RouteComponentProps> = ({ }) => {
    const [complete, setComplete] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();

    return (
        <Responsive variant="small">
            <Formik
                initialValues={{ email: '' }}
                onSubmit={async (values) => {
                    await forgotPassword({ variables: values });
                    setComplete(true);
                }}
            >
                {({ isSubmitting }) => complete ? (
                    <Box>
                        If account with email exists, sent a confirmation email in your inbox
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