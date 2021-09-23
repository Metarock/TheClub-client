import { Avatar, Box, Button, Heading, Image } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { InputField, Layout, Responsive } from '../../components/exportComponents';
import { MotionBox } from '../../components/ui/Motion';
import { useDeleteAccountMutation, useEditProfileMutation, useMeQuery } from '../../generated/graphql';
import { postImage } from '../../utils/postImage';


export const EditProfile: React.FC<RouteComponentProps> = ({ history }) => {

    const [file, setFile] = useState<File>();
    const [fileUrl, setFileUrl] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data, loading } = useMeQuery();
    const [updateProfile] = useEditProfileMutation();
    const [deleteAccount] = useDeleteAccountMutation();
    const [deleteLoading, setDeleteLoading] = useState(false);

    if (loading || !data?.me) {
        return (
            <Layout>
                Not logged in, not authenticated
            </Layout>
        )
    }

    const uploadImage = async () => {
        return postImage(file, uuidv4(), process.env.REACT_APP_CLOUDINARY_SECRET_AVATAR, process.env.REACT_APP_CLOUDINARY_KEY_AVATAR, "https://api.cloudinary.com/v1_1/theclub/image/upload");
    }
    const handleSetImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event.currentTarget.files?.[0];

        if (!newFile) return; //if not found

        setFile(newFile);
        setFileUrl(URL.createObjectURL(newFile));
    }

    const handleDeleteAccount = async () => {
        setDeleteLoading(true);

        const deletedAccount = await deleteAccount({
            variables: { id: data?.me.id }
        });
        if (deletedAccount.data?.deleteAccount) history.push('/');

        setDeleteLoading(false);
    }

    return (
        <Responsive variant="regular">
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
                <Box
                    alignItems="center"
                    textAlign="center"
                    display="inline-block"
                    w="100%"
                    p={4}
                    mb={6}
                >
                    <Heading textAlign="center" size="xl" fontWeight="extrabold">
                        Profile settings
                    </Heading>
                    <Avatar
                        size={'xl'}
                        src={
                            data?.me.userAvatar ? data?.me.userAvatar : ''
                        }
                    />
                </Box>
                <Formik
                    initialValues={{ email: data?.me.email, clubUsername: data?.me.clubUsername, clubName: data?.me.clubName, university: data?.me.university }}
                    onSubmit={async (values, { setErrors, resetForm }) => {
                        let imgUrl: string | undefined;

                        if (file) {
                            const upload = await uploadImage();
                            if (!upload.success) return;

                            imgUrl = upload.url;
                        }

                        const response = await updateProfile({ variables: { id: data?.me.id, ...values, userAvatar: imgUrl } })
                        if (response.errors) {
                            setErrors({ email: 'an error occurred' })
                            return;
                        }
                        resetForm();
                        history.push('/');
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
                                    name="clubName"
                                    placeholder="clubName"
                                    label="ClubName"
                                />
                            </Box>
                            <Box mt={4}>
                                <InputField
                                    name="university"
                                    placeholder="university"
                                    label="University"
                                />
                            </Box>
                            <Button
                                mt={4}
                                type="submit"
                                isLoading={isSubmitting}
                                colorScheme="teal"
                            >
                                Update Profile
                            </Button>
                            <Button
                                ml={4}
                                mt={4}
                                type="submit"
                                isLoading={deleteLoading}
                                onClick={handleDeleteAccount}
                                colorScheme="red"
                            >
                                Delete Account
                            </Button>
                            <label htmlFor="userAvatar">
                                <Button ml={4} mt={4} mr={8} onClick={() => fileInputRef.current?.click()}>
                                    Upload Image
                                </Button>
                            </label>
                            <input
                                ref={fileInputRef}
                                name="userAvatar"
                                type="file"
                                accept="image/*"
                                onChange={handleSetImage}
                                style={{ display: "none" }}
                            />
                            <Image src={fileUrl} maxH={200} maxW={400} />
                        </Form>
                    )}
                </Formik>
            </MotionBox>
        </Responsive>
    );
}