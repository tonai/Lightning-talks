import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
const stories = storiesOf('My component', module);
stories.addDecorator(withKnobs);
stories.add('default', () => (`<my-component first="${text('First', 'Stencil')}" last="${text('Last', "'Don't call me a framework' JS")}"></my-component>`));
