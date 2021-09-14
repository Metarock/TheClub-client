import { Story } from '@storybook/react';
import React from 'react';
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { PageIcon, PageIconProps } from './PageIcon';

export default {
    title: "Example/Icon",
    comment: PageIcon
}

const Template: Story<PageIconProps> = (args) => (
    <PageIcon {...args} />

)

export const Deleteicon = Template.bind({});
Deleteicon.args = {
    loading: true,
    onClick: () => console.log('clicked'),
    Icon: FiTrash2
}

export const Editicon = Template.bind({});
Editicon.args = {
    loading: true,
    onClick: () => console.log('clicked'),
    Icon: FiEdit2
}