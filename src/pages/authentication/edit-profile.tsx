import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Responsive } from '../../components/exportComponents';


export const EditProfile: React.FC<RouteComponentProps> = ({ history }) => {
    return (
        <Responsive variant="regular">
            Edit profile
        </Responsive>
    );
}