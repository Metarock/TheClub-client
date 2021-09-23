import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import { v4 as uuidv4 } from 'uuid';
import { InputField, Responsive } from "../../../../components/exportComponents";
import { MotionBox } from "../../../../components/ui/Motion";
import { useEditPageMutation, usePageQuery } from "../../../../generated/graphql";
import { postImage } from "../../../../utils/postImage";

export const EditPage: React.FC<RouteComponentProps> = ({ history }) => {
    const { id }: any = useParams();
    console.log(id);
    const getId = parseInt(id);
    console.log(getId);
    const [file, setFile] = useState<File>();
    const [fileUrl, setFileUrl] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data, loading } = usePageQuery({ variables: { id: getId } });
    console.log("Page ", data?.page.pageTitle);
    console.log("Page ", data?.page.pageText);
    console.log("Page ", data?.page.aboutUs);
    const [updatePage] = useEditPageMutation();


    const uploadImage = async () => {
        return postImage(file, uuidv4(), process.env.REACT_APP_CLOUDINARY_SECRET_AVATAR, process.env.REACT_APP_CLOUDINARY_KEY_AVATAR, "https://api.cloudinary.com/v1_1/theclub/image/upload");
    }
    const handleSetImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event.currentTarget.files?.[0];

        if (!newFile) return; //if not found

        setFile(newFile);
        setFileUrl(URL.createObjectURL(newFile));
    }


    if (loading || !data?.page) {
        return (
            <Box
                height="650px"
                width="780px"
                position="fixed"
                top="50%"
                left="50%"
                mt="-80px"
                ml="-30px"
            >
                <Spinner size="xl" />
            </Box>
        )
    }

    return (
        <Responsive variant="regular">
            <MotionBox
                opacity="0"
                initial={{
                    translateX: -150,
                    opacity: 0
                }}
                animate={{
                    translateX: 0,
                    opacity: 1,
                    transition: {
                        duration: 0.55
                    }
                }}
            >

                <Formik
                    initialValues={{ pageTitle: data.page.pageTitle, pageText: data.page.pageText, aboutUs: data.page.aboutUs }}
                    onSubmit={async (values, { setErrors, resetForm }) => {
                        let imgUrl: string | undefined;

                        if (file) {
                            const upload = await uploadImage();
                            if (!upload.success) return;

                            imgUrl = upload.url;
                        }
                        await updatePage({ variables: { id: getId, ...values, pageimgUrl: imgUrl } })
                        resetForm();
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
                            <Button
                                mt={4}
                                type="submit"
                                isLoading={isSubmitting}
                                colorScheme="teal"
                            >
                                Update page
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
