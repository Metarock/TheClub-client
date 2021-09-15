import { Button } from '@chakra-ui/button';
import { Box, Heading, Link, useColorModeValue, Text } from '@chakra-ui/react';
import firebase from 'firebase';
import { Form, Formik } from 'formik';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { InputField } from '../components/InputField';
import { Responsive } from '../components/Responsive';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import socialMediaAuth from '../utils/firebase-auth';
import { facebookProvider, githubProvider, googleProvider } from '../utils/firebase-authmethod';
import { toErrorMap } from '../utils/toErrorMap';


export const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [register] = useRegisterMutation();
    const handleClick = async (provider: any) => {
        const res = await socialMediaAuth(provider);
        const currentEmail = firebase.auth().currentUser.email;
        const currentName = firebase.auth().currentUser.displayName;
        console.log("current name: ", currentName)
        console.log("current email: ", currentEmail);
        console.log("worked social media: ", res);
    }
    return (

        <Responsive variant="small">
            <Box>
                <Heading textAlign="center" size="xl" fontWeight="extrabold">
                    Register you account
                </Heading>
                <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
                    <Text as="span">Have an account?</Text>
                    <Link marginStart="1" display={{ base: 'block', sm: 'inline' }} color={useColorModeValue('blue.500', 'blue.200')}
                        _hover={{ color: useColorModeValue('blue.600', 'blue.300') }} href="/login">Log in now</Link>
                </Text>
            </Box>
            <Formik
                initialValues={{ email: '', clubUsername: '', password: '', university: '', clubName: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register({
                        variables: { options: values },
                        update: (cache, { data }) => {
                            cache.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    __typename: 'Query',
                                    me: data?.register.user
                                }
                            })
                        }
                    })
                    console.log("registered user: ", response);
                    //error checking
                    //returns no data if its undefined
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors));
                    } else if (response.data.register.user) {
                        history.push('/');
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="email"
                            placeholder={"email" || firebase.auth().currentUser.email}
                            label="Email"
                        />
                        <Box mt={4}>
                            <InputField
                                name="clubUsername"
                                placeholder="clubUsername"
                                label="ClubUsername"
                            />
                        </Box>
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                            />
                        </Box>
                        <Box mt={4}>
                            <InputField
                                name="university"
                                placeholder="university"
                                label="University"
                            />
                        </Box>
                        <Box mt={4}>
                            <InputField
                                name="clubName"
                                placeholder="clubName"
                                label="ClubName"
                            />
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            Register
                        </Button>
                        <Button
                            onClick={() => {
                                handleClick(googleProvider)
                            }}
                        >
                            google
                        </Button>
                        <Button
                            onClick={() => {
                                handleClick(facebookProvider)
                            }}
                        >
                            facebook
                        </Button>
                        <Button
                            onClick={() => {
                                handleClick(githubProvider)
                            }}
                        >
                            google
                        </Button>
                    </Form>
                )}
            </Formik>
        </Responsive>
    );
}


