import { Box } from '@chakra-ui/layout';
import React from 'react';

export type WrapperVariant = "small" | "regular"
interface WrapperProps {
    variant?: WrapperVariant;
}

/**
 * For responsiveness across devices
 * @param param0 
 * @returns 
 */
export const Responsive: React.FC<WrapperProps> = ({ children, variant = 'regular' }) => {
    return (
        <Box
            mt={8}
            mx="auto"
            maxW={variant === "regular" ? "800" : "400px"}
            w="100%"
        >
            {children}
        </Box>
    );
}