import { Button } from '@chakra-ui/button';
import { Flex, Box, Link, Text } from '@chakra-ui/layout';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { RouteComponentProps, useParams } from 'react-router';
import { InputField, Responsive } from '../../components/exportComponents';
import { MeDocument, MeQuery, useChangePasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import * as Yup from 'yup';
import { Heading, useToast } from '@chakra-ui/react';
import { MotionBox } from '../../components/ui/Motion';



export const ChangePassword: React.FC<RouteComponentProps> = ({ history }) => {
    const { token }: any = useParams(); //get id from the url
    const [changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState('');
    const toast = useToast();
    return (
        <Responsive variant="small">
            <MotionBox
                opacity="0"
                initial={{
                    translateY: -150,
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
                <Heading textAlign="center" size="xl" fontWeight="extrabold">
                    Change Password
                </Heading>
                <Formik
                    initialValues={{ newPassword: '' }}
                    validationSchema={Yup.object({
                        newPassword: Yup.string().min(6, "Must be more than 5").required("Password required"),
                        confirmPassword: Yup.string().oneOf([Yup.ref("newPassword"), null], "Password must match"),
                    })}
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
                            toast({
                                position: 'bottom-right',
                                title: "Password changed successfully",
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                            })
                            history.push('/');
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Box>
                                <InputField
                                    name="newPassword"
                                    placeholder="new password"
                                    label="New Password"
                                    type="password"
                                />
                            </Box>
                            <Box mt={4}>
                                <InputField
                                    name="confirmPassword"
                                    placeholder="confirmPassword"
                                    label="confirmPassword"
                                    type="password"
                                />
                            </Box>
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
            </MotionBox>
        </Responsive>
    );
}
