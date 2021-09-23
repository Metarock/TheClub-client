
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { Flex, Heading, Link, Text, useToast } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Form, Formik } from 'formik';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { MeDocument, MeQuery, useLoginMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { Responsive, InputField } from '../../components/exportComponents';
import { MotionBox } from '../../components/ui/Motion';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {

    const [login] = useLoginMutation();
    const toast = useToast()

    return (
        <Responsive variant="small">
            <MotionBox
                opacity="0"
                initial={{
                    translateY: 150,
                    opacity: 0
                }}
                animate={{
                    translateY: 0,
                    opacity: 1,
                    transition: {
                        duration: 0.55
                    }
                }}
            >
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
                            console.log("error in login", response.data.login.errors);
                            setErrors(toErrorMap(response.data.login.errors));
                        } else if (!response.data?.login.user) {
                            console.log("error in login part 2", response.data.login.errors);

                            setErrors(toErrorMap(response.data.login.errors));
                        }
                        else {
                            // history.push(`/page/edit/${response.data.login.user.id}`)
                            toast({
                                position: 'bottom-right',
                                title: "Logged in",
                                description: `Welcome back, ${response.data?.login.user.clubUsername}`,
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                            })
                            history.push('/'); // if it work
                        }
                    }}>
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField
                                name="usernameOrEmail"
                                placeholder="usernameOrEmail"
                                label="Username or Email" />
                            <Box mt={4}>
                                <InputField
                                    name="password"
                                    placeholder="password"
                                    label="Password"
                                    type="password"
                                />
                            </Box>
                            <Flex mt={2}>
                                <Link href="/forgot-password">
                                    <Text ml="auto">Forgot password?</Text>
                                </Link>
                            </Flex>
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
            </MotionBox>
        </Responsive>
    )
}

