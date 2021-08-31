
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { Form } from 'formik';
import React from 'react'
import { RouteComponentProps } from 'react-router';
import { InputField } from '../components/InputField';
import { Responsive } from '../components/Responsive';

interface loginProps {

}

export const Login: React.FC<RouteComponentProps> = ({ history }) => {

    return (
        <Form>
            <InputField
                name="usernameOremail"
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
                colorScheme="teal"
            >
                Login
            </Button>
        </Form>
    )
}