import { Button } from '@chakra-ui/button';
import { Box, Stack, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react'
import { RouteComponentProps } from 'react-router';
import { InputField } from '../components/InputField';
import { Responsive } from '../components/Responsive';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';


export const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [register] = useRegisterMutation();
    return (

        <Responsive variant="regular">
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


