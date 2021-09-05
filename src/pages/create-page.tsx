import { Box } from '@chakra-ui/layout';
import { Button, Image } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { InputField } from '../components/InputField';
import { Responsive } from '../components/Responsive';
import { useCreatePageMutation } from '../generated/graphql';
import { cloudinarySignature } from '../utils/utilCloudinary';

export const CreatePage: React.FC<RouteComponentProps> = ({ history }) => {
    const [file, setFile] = useState<File>();
    const [fileUrl, setFileUrl] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [createPage] = useCreatePageMutation();

    const uploadImage = async () => {
        if (!file) {
            console.log("file not found");
            return { success: false, url: "" };
        }

        const timestamp = Math.floor(Date.now() / 1000).toString();
        const publicId = "test";
        const cloudinary_secret = process.env.REACT_APP_CLOUDINARY_SECRET ?? "";

        const signature = await cloudinarySignature({
            publicId,
            timestamp,
            cloudinary_secret
        })

        //post image
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", process.env.REACT_APP_CLOUDINARY_KEY ?? "");
        formData.append("public_id", publicId);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/ddvlxmcb5/image/upload",
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

    let body = null;
    return (
        <Responsive variant="small">
            <Formik
                enableReinitialize
                initialValues={{ pageTitle: '', pageText: '', aboutUs: '' }}
                onSubmit={async (values, { setErrors, resetForm }) => {
                    let imgUrl: string | undefined;

                    if (file) {
                        const upload = await uploadImage();
                        if (!upload.success) {
                            //if upload is not successful
                            return; //return nothing
                        }

                        //if successful 
                        imgUrl = upload.url;
                        console.log("formik this is the img url", imgUrl);
                    }

                    const response = await createPage({
                        variables: { ...values, pageimgUrl: imgUrl }
                    })
                    //if there is an error
                    //TO DO
                    // Fix the error message
                    if (response.errors) {
                        setErrors({ pageTitle: "this is an error", pageText: "error on text" });
                        return;
                    }
                    resetForm();
                    const page = response.data?.createPage.id;
                    console.log("page is posted: ", page);
                    history.push("/");
                }}

            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="pageTitle"
                            placeholder="pageTitle"
                            label="Title"
                        />
                        <Box mt={4}>
                            <InputField
                                textarea
                                name="pageText"
                                placeholder="text..."
                                label="Description"
                            />
                        </Box>
                        <Box mt={4}>
                            <InputField
                                textarea
                                name="aboutUs"
                                placeholder="text..."
                                label="About us"
                            />
                        </Box>
                        <Box mt={4}>
                            <Button ml={12} type="submit" isLoading={isSubmitting}>
                                Create Page
                            </Button>
                            <label htmlFor="postImage">
                                <Button mr={8} onClick={() => fileInputRef.current?.click()}>
                                    Upload Image
                                </Button>
                            </label>
                            <input
                                ref={fileInputRef}
                                name="postImage"
                                type="file"
                                accept="image/*"
                                onChange={handleSetImage}
                                style={{ display: "none" }}
                            />
                            <Image src={fileUrl} maxH={200} maxW={400} />
                        </Box>
                    </Form>
                )}
            </Formik>
            {body ? body : null}
        </Responsive>
    );
}