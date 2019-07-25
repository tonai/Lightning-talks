import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Header from '../Header';

const stories = storiesOf('Header', module);
stories.addDecorator(withKnobs);
stories.add('default', () => <Header title={text('Title', 'Welcome to React')}/>);
