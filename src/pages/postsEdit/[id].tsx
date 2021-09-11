import { RouteComponentProps, useParams } from "react-router-dom";
import React from "react";

export const EditPost: React.FC<RouteComponentProps> = () => {
    const { id }: any = useParams(); //get id
    const getId = parseInt(id);
    return (
        <div>
            This is an edit post
        </div>
    )
}
