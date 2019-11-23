import React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import StoryRouter from "storybook-react-router";
import { withA11y } from "@storybook/addon-a11y";
import { GlobalStyle } from "../src/shared/global";

addDecorator(withA11y);
addDecorator(StoryRouter());

addParameters({
  options: {
    panelPosition: "right",
    sidebarAnimations: true
  }
});
addDecorator(story => (
  <>
    <GlobalStyle />
    {story()}
  </>
));

configure(require.context("../src", true, /\.stories\.js$/), module);
