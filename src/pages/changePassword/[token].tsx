import { Button } from '@chakra-ui/button';
import { Flex, Box, Link, Text } from '@chakra-ui/layout';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom';
import { InputField } from '../../components/InputField';
import { Responsive } from '../../components/Responsive';
import { MeDocument, MeQuery, useChangePasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';


const ChangePassword: React.FC<RouteComponentProps> = ({ history }) => {
    const { token }: any = useParams(); //get id from the url
    const [changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState('');
    return (
        <Responsive variant="small">
            <Formik
                initialValues={{ newPassword: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await changePassword({
                        variables: {
                            newPassword: values.newPassword,
                            token: token
                        },
                        update: (cache, { data }) => {
                            cache.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    __typename: 'Query',
                                    me: data?.changePassword.user,
                                }
                            });
                            cache.evict({ fieldName: "post:{}" })
                        }
                    })
                    console.log("this is the response change password: ", response);
                    if (response.data?.changePassword.errors) {
                        const errorMap = toErrorMap(response.data.changePassword.errors);

                        //if token exists
                        if ("token" in errorMap) {
                            setTokenError(errorMap.token);
                        }
                        setErrors(errorMap);
                    } else if (response.data?.changePassword.user) {
                        history.push('/');
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="newPassword"
                            placeholder="new password"
                            label="New Password"
                            type="password"
                        />
                        {tokenError ? (
                            <Flex>
                                <Box mr={2} color='red'>{tokenError}</Box>
                                <Link href="/forgot-password">
                                    <Text>Click to reset password</Text>
                                </Link>
                            </Flex>) : null}
                        <Button
                            mt={4}
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            Change password
                        </Button>
                    </Form>
                )}
            </Formik>
        </Responsive>
    );
}


export default ChangePassword;