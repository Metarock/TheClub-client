import { Box } from '@chakra-ui/layout';
import React from 'react';

export type ResponsiveVariant = "small" | "regular"
interface ResponvieProps {
    variant?: ResponsiveVariant;
}

/**
 * For responsiveness across devices
 * @param param0 
 * @returns 
 */
export const Responsive: React.FC<ResponvieProps> = ({ children, variant = 'regular' }) => {
    return (
        <Box
            mt={8}
            mx="auto"
            maxW={variant === "regular" ? "800px" : "400px"}
            w="100%"
        >
            {children}
        </Box>
    );
}