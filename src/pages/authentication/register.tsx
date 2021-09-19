import { Button } from '@chakra-ui/button';
import { Box, Heading, Link, useColorModeValue, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Responsive, InputField } from '../../components/exportComponents';
import { MeDocument, MeQuery, useRegisterMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';


export const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [register] = useRegisterMutation();
    return (

        <Responsive variant="small">
            <Box>
                <Heading textAlign="center" size="xl" fontWeight="extrabold">
                    Sign up! It's for free!!
                </Heading>
                <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
                    <Text as="span">Already have an account</Text>
                    <Link marginStart="1" display={{ base: 'block', sm: 'inline' }} color={useColorModeValue('blue.500', 'blue.200')}
                        _hover={{ color: useColorModeValue('blue.600', 'blue.300') }} href="/login">Log in</Link>
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
                            placeholder="email"
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
                    </Form>
                )}
            </Formik>
        </Responsive>
    );
}


