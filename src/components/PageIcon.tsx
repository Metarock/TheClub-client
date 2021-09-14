
import { Spinner } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

export interface PageIconProps {
    Icon: IconType;
    onClick?: () => void;
    loading?: boolean;
}

export const PageIcon: React.FC<PageIconProps> = ({
    Icon,
    onClick,
    loading = false,
}) => {
    return loading ? (
        <Spinner />
    ) : (
        <Icon size={18} style={{ marginLeft: 8 }} onClick={onClick} />
    );
};
