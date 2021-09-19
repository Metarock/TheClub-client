import { Box } from '@chakra-ui/layout';
import { Button, Image } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { Responsive, InputField } from '../../../components/exportComponents';
import { useCreatePostMutation } from '../../../generated/graphql';
import { cloudinarySignature } from '../../../utils/utilCloudinary';

export const CreatePost: React.FC<RouteComponentProps> = ({ history }) => {
    const [file, setFile] = useState<File>();
    const [fileUrl, setFileUrl] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [createPost] = useCreatePostMutation();

    const uploadImage = async () => {
        if (!file) {
            console.log("file not found");
            return { success: false, url: "" };
        }

        const timestamp = Math.floor(Date.now() / 1000).toString();
        const publicId = uuidv4();
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
    // const publicId = uuidv4();

    // const uploadImage = postImage(file, uuidv4(), process.env.REACT_APP_CLOUDINARY_SECRET, process.env.REACT_APP_CLOUDINARY_KEY, "https://api.cloudinary.com/v1_1/ddvlxmcb5/image/upload");

    const handleSetImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event.currentTarget.files?.[0];

        if (!newFile) return; //if not found

        setFile(newFile);
        setFileUrl(URL.createObjectURL(newFile));
    }

    return (
        <Responsive variant="small">
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
        </Responsive>
    );
}