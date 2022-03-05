import { withActions } from "@storybook/addon-actions";
import { withKnobs } from '@storybook/addon-knobs';

export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'dark',
        value: 'rgba(35, 39, 57, 1)',
      },
      {
        name: 'light',
        value: 'rgba(255, 255, 255, 1)',
      },
    ],
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  decorators: [withKnobs, withActions]
}