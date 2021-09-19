import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Card } from "./Card";

export default {
    title: 'Card',
    component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />

export const exampleCard = Template.bind({});
exampleCard.args = {
    id: 2,
    aboutUs: "test",
    pageTitle: "Title test",
    pageText: "Text",
    creatorName: "Sanggy",
    headerLink: true,
    userIsOwner: true,
    pageimgUrl: "https://res.cloudinary.com/ddvlxmcb5/image/upload/v1631431093/6b9c6c43-5ba6-45b8-9681-71bebe36d484.jpg",
}