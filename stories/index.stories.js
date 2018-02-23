import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { MarkdownMenu } from '../src';

storiesOf('Menu', module).add('Menu', () => (
  <MarkdownMenu
    selection="Hello"
    lineSelection="Hello"
    x={50}
    y={50}
    onChange={action('clicked')}
  />
));
