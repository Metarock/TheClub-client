import { Box, Button, Image } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { InputField, Layout, Responsive } from '../../components/exportComponents';
import { useEditProfileMutation, useMeQuery } from '../../generated/graphql';
import { cloudinarySignature } from '../../utils/utilCloudinary';


export const EditProfile: React.FC<RouteComponentProps> = ({ history }) => {

    const [file, setFile] = useState<File>();
    const [fileUrl, setFileUrl] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data, loading } = useMeQuery();
    const [updateProfile] = useEditProfileMutation();

    if (loading || !data?.me) {
        return (
            <Layout>
                Not logged in, not authenticated
            </Layout>
        )
    }
    const uploadImage = async () => {
        if (!file) {
            console.log("file not found");
            return { success: false, url: "" };
        }

        const timestamp = Math.floor(Date.now() / 1000).toString();
        const publicId = uuidv4();
        const cloudinary_secret = process.env.REACT_APP_CLOUDINARY_SECRET_AVATAR ?? "";

        const signature = await cloudinarySignature({
            publicId,
            timestamp,
            cloudinary_secret
        })

        //post image
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", process.env.REACT_APP_CLOUDINARY_KEY_AVATAR ?? "");
        formData.append("public_id", publicId);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/theclub/image/upload",
            {
                method: "POST",
                body: formData,
            }
        );
        if (!response.ok) {
            console.log("no response");
            return { success: false, url: "" }
        }

        const data = await response.json();
        const url = data.secure_url as string;
        console.log("upload image[this is the url]: ", url);
        return { success: true, url };

    }


    const handleSetImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event.currentTarget.files?.[0];

        if (!newFile) return; //if not found

        setFile(newFile);
        setFileUrl(URL.createObjectURL(newFile));
    }


    return (
        <Responsive variant="regular">
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
                        <label htmlFor="userAvatar">
                            <Button mr={8} onClick={() => fileInputRef.current?.click()}>
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
        </Responsive>
    );
}