import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    textarea?: boolean
}

export const InputField: React.FC<InputFieldProps> = ({ label, textarea, size: _, ...props }) => {

    let InputOrTextarea = Input;
    if (textarea) {
        InputOrTextarea = Textarea as any
    }

    //use hook from formik, setting up for input field
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputOrTextarea {...field} {...props} id={field.name} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
}