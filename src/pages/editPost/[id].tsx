import React from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';

const EditPost: React.FC<RouteComponentProps> = () => {
    const { id }: any = useParams();
    const getId = parseInt(id);

    return (
        <div>
            This is a edit post view
        </div>
    )
}

export default EditPost;