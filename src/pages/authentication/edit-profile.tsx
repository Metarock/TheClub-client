import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Responsive } from '../../components/exportComponents';


export const EditProfile: React.FC<RouteComponentProps> = ({ history }) => {
    return (
        <Responsive variant="regular">
            This is the edit profile, why action fail but pushed my website?
        </Responsive>
    );
}