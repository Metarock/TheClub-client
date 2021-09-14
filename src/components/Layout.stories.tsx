import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Layout } from "./Layout";

export default {
    title: 'Layout',
    component: Layout
} as ComponentMeta<typeof Layout>

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />

export const smallVariant = Template.bind({});
let childrenProp = (
    <>
        <div>
            A testing of layout
        </div>
    </>
)
smallVariant.args = {
    variant: 'small',
    children: childrenProp
}