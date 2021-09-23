import { Box } from '@chakra-ui/layout';
import { Button, Image } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { InputField, Responsive } from '../../../components/exportComponents';
import { MotionBox } from '../../../components/ui/Motion';
import { useCreatePostMutation } from '../../../generated/graphql';
import { postImage } from '../../../utils/postImage';

export const CreatePost: React.FC<RouteComponentProps> = ({ history }) => {
    const [file, setFile] = useState<File>();
    const [fileUrl, setFileUrl] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [createPost] = useCreatePostMutation();

    const uploadImage = async () => {
        return postImage(file, uuidv4(), process.env.REACT_APP_CLOUDINARY_SECRET, process.env.REACT_APP_CLOUDINARY_KEY, "https://api.cloudinary.com/v1_1/ddvlxmcb5/image/upload");
    }

    const handleSetImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event.currentTarget.files?.[0];

        if (!newFile) return; //if not found

        setFile(newFile);
        setFileUrl(URL.createObjectURL(newFile));
    }

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
                    initialValues={{ title: '', text: '' }}
                    onSubmit={async (values, { setErrors, resetForm }) => {
                        let imgUrl: string | undefined;

                        if (file) {
                            const upload = await uploadImage();
                            if (!upload.success) return;

                            imgUrl = upload.url;
                        }

                        const response = await createPost({ variables: { postimgUrl: imgUrl, input: values } });
                        if (response.errors) {
                            setErrors({ title: 'an error occured' });
                            return;
                        }
                        resetForm();
                        const post = response.data?.createPost.postCreatorId;
                        history.push(`/pages/${post}`);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form id="newpost" style={{ width: "100%" }}>
                            <InputField
                                name="title"
                                placeholder="pageTitle"
                                label="Title"
                            />
                            <Box mt={4}>
                                <InputField
                                    textarea
                                    name="text"
                                    placeholder="text..."
                                    label="Description"
                                />
                            </Box>
                            <Box mt={4}>
                                <Button ml={12} type="submit" isLoading={isSubmitting}>
                                    Create Post
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
            </MotionBox>
        </Responsive>
    );
}