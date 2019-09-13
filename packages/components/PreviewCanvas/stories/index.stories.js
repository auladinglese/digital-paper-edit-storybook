import React from 'react';

import { storiesOf } from '@storybook/react';
import PreviewCanvas from '../index.js';

const playlist = [

];

storiesOf('PreviewCanvas', module)
  .add('Default', () =>
    <PreviewCanvas
      playlist={ playlist }
    />
  );
