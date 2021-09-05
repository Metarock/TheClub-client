
import { Spinner } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

export interface PostIconProps {
    Icon: IconType;
    onClick?: () => void;
    loading?: boolean;
}

const PageIcon: React.FC<PostIconProps> = ({
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

export default PageIcon;