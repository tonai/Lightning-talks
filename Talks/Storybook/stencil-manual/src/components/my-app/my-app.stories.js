import { storiesOf } from '@storybook/html';
import { withKnobs, color } from '@storybook/addon-knobs';
const stories = storiesOf('My component', module);
stories.addDecorator(withKnobs);
stories.add('app', () => (`
  <my-app>
    <my-carousel>
      <my-carousel-item index="0">
        <div class="carousel-item-content" style="background-color: ${color('Color item 1', 'rgba(255, 0, 0, 1)')};">item 1</div>
      </my-carousel-item>
      <my-carousel-item index="1">
        <div class="carousel-item-content" style="background-color: ${color('Color item 2', 'rgba(0, 255, 0, 1)')};">item 2</div>
      </my-carousel-item>
      <my-carousel-item index="2">
        <div class="carousel-item-content" style="background-color: ${color('Color item 3', 'rgba(0, 0, 255, 1)')};">item 3</div>
      </my-carousel-item>
    </my-carousel>
  </my-app>
`));
