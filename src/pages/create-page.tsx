import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router';
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
        return { success: true, url };

    }

    const handleSetImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event.currentTarget.files?.[0];

        if (!newFile) return; //if not found

        setFile(newFile);
        setFileUrl(URL.createObjectURL(newFile));
    }

    return (
        <Formik
            initialValues={{ pageTitle: '', pageText: '', aboutUs: '' }}
            onSubmit={async (values, { setErrors, resetForm }) => {
                let pageimgUrl: string | undefined;

                if (file) {
                    const upload = await uploadImage();
                    if (!upload.success) {
                        //if upload is not successful
                        return; //return nothing
                    }

                    //if successful 
                    pageimgUrl = upload.url;
                }

                const response = await createPage({
                    variables: { pageTitle: values.pageTitle, pageText: values.pageText, aboutUs: values.aboutUs, pageimgUrl: pageimgUrl }
                })
                //if there is an error
                if (response.errors) {
                    setErrors({ pageTitle: "an error has occured with creating page" });
                    return;
                }
                resetForm();
                const page = response.data?.createPage.id;
                console.log("page is posted: ", page);
            }}

        >

        </Formik>
    );
}