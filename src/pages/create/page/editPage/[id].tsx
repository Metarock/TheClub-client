import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Form, Formik } from "formik";
import { v4 as uuidv4 } from 'uuid';
import React, { useRef, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import { Layout, Responsive, InputField } from "../../../../components/exportComponents";
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
            <Layout>
                <div>Loading....</div>
            </Layout>
        )
    }

    return (
        <Responsive variant="regular">
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
        </Responsive>
    );
}
