
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { Heading, Link, Text } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Form, Formik } from 'formik';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { InputField } from '../components/InputField';
import { Responsive } from '../components/Responsive';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { setAccessToken } from '../utils/accessToken';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {

    const [login] = useLoginMutation();

    return (
        <Responsive variant="small">
            <Box>
                <Heading textAlign="center" size="xl" fontWeight="extrabold">
                    Sign in to your account
                </Heading>
                <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
                    <Text as="span">Don&apos;t have an account?</Text>
                    <Link marginStart="1" display={{ base: 'block', sm: 'inline' }} color={useColorModeValue('blue.500', 'blue.200')}
                        _hover={{ color: useColorModeValue('blue.600', 'blue.300') }} href="/register">Register Now, It's Free</Link>
                </Text>
            </Box>
            <Formik
                initialValues={{ usernameOrEmail: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login({
                        variables: values,
                        update: (store, { data }) => {
                            if (!data) {
                                return null;
                            }

                            store.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    me: data.login.user
                                }
                            })
                        }
                    })

                    console.log("login response: ", response.data?.login.user?.id);
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors));
                    } else if (!response.data?.login.user) {
                        setErrors(toErrorMap(response.data.login.errors));
                    }
                    else {
                        // history.push(`/page/edit/${response.data.login.user.id}`)
                        if (response && response.data) {
                            setAccessToken(response.data.login.accessToken);
                        }
                        history.push('/'); // if it work
                    }
                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="usernameOrEmail"
                            placeholder="username or email"
                            label="Username or Email" />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>

        </Responsive>
    )
}

