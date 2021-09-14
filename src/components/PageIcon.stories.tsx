import React from 'react';
import { Story, Meta } from '@storybook/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { PageIconProps, PageIcon } from './PageIcon';
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IconType } from 'react-icons';

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