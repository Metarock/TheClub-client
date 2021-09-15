
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { Heading, Link, Text, useToast } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Form, Formik } from 'formik';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { InputField } from '../components/InputField';
import { Responsive } from '../components/Responsive';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { facebookProvider, googleProvider, githubProvider } from '../utils/firebase-authmethod';
import socialMediaAuth from '../utils/firebase-auth';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {

    const [login] = useLoginMutation();
    const toast = useToast()
    const handleClick = async (provider: any) => {
        const res = await socialMediaAuth(provider);
        console.log("worked social media: ", res);
    }
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
                        update: (cache, { data }) => {
                            cache.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    __typename: "Query",
                                    me: data?.login.user,
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
                            onClick={() => {
                                toast({
                                    position: 'bottom-right',
                                    title: "Logged in",
                                    description: "You have successfully logged in",
                                    status: "success",
                                    duration: 2000,
                                    isClosable: true,
                                })
                            }}
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            Login
                        </Button>
                        <Button onClick={() => {
                            handleClick(facebookProvider);
                        }}>
                            Facebook
                        </Button>
                        <Button onClick={() => {
                            handleClick(googleProvider);
                        }}>
                            Google
                        </Button>
                        <Button onClick={() => {
                            handleClick(githubProvider);
                        }}>
                            Github
                        </Button>
                    </Form>
                )}
            </Formik>

        </Responsive>
    )
}

