import { Box } from '@chakra-ui/layout';
import { Button, Image } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { InputField, Responsive } from '../../../components/exportComponents';
import { MotionBox } from '../../../components/ui/Motion';
import { useCreatePageMutation } from '../../../generated/graphql';
import { postImage } from '../../../utils/postImage';

export const CreatePage: React.FC<RouteComponentProps> = ({ history }) => {
    const [file, setFile] = useState<File>();
    const [fileUrl, setFileUrl] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [createPage] = useCreatePageMutation();

    const uploadImage = async () => {
        return postImage(file, uuidv4(), process.env.REACT_APP_CLOUDINARY_SECRET, process.env.REACT_APP_CLOUDINARY_KEY, "https://api.cloudinary.com/v1_1/ddvlxmcb5/image/upload");
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
            </MotionBox>
        </Responsive>
    );
}