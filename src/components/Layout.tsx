import React from 'react';
import { Responsive, ResponsiveVariant } from './Responsive';

interface LayoutProps {
    variant?: ResponsiveVariant
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
    return (
        <>

            <Responsive variant={variant}>
                {children}
            </Responsive>
        </>
    );
}