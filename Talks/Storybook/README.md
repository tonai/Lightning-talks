# Storybook

## Presentation

### Project

* Web site : https://storybook.js.org/
* Github : https://github.com/storybooks/storybook

### Examples

Global :
* Airbnb : http://airbnb.io/react-dates/
* Lonely Planet : https://lonelyplanet.github.io/backpack-ui/
* Storybook : https://storybooks-official.netlify.com/

Smile :
* Consolis : http://morpholis.lxc:9001
* HEC : http://storybook.hec-edu.vitry.intranet

### Version

* **stable** : v3.4.8
* **alpha** : v4.0.0-alpha.14

### Framework compatibility

* React / React Native
* Angular
* Polymer
* Vue
* Mithril (v4)
* Marko (v4)
* HTML (v4)

### Addons

The most important :
* **knobs** - Interactively edit component prop data in the Storybook UI

Others :
* **a11y** - Test components for user accessibility in Storybook
* **actions** - Log actions as users interact with components in the Storybook UI
* **backgrounds** - Let users choose backgrounds in the Storybook UI
* **centered** - Center the alignment of your components within the Storybook UI
* **events** - Interactively fire events to components that respond to EventEmitter
* **graphql** - Query a GraphQL server within Storybook stories
* **info** - Annotate stories with extra component usage information
* **jest** - View the results of components' unit tests in Storybook
* **links** - Create links between stories
* **notes** - Annotate Storybook stories with notes
* **options** - Customize the Storybook UI in code
* **storyshots** - Easy snapshot testing for components in Storybook
* **storysource** - View the code of your stories within the Storybook UI
* **viewport** - Change display sizes and layouts for responsive components using Storybook

## Setup

### React (automatic mode)

#### Install react

```bash
cd react-auto
create-react-app .
```

Run:
```bash
npm run start
```

#### Install storybook

```bash
npm i -g @storybook/cli
getstorybook
```

Run:
```bash
npm run storybook
```

#### Create component with story

Create `src/Header.js`:
```jsx
import React from 'react';
import logo from './logo.svg';
import './App.css';

export default function Header({ title }) {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">{title}</h1>
    </header>
  );
}
```

Update `src/App.js`:
```jsx
import React, { Component } from 'react';
import Header from './Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Welcome to React" />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```

Update `src/stories/index.js`:
```jsx
import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '../Header';

storiesOf('Header', module)
  .add('default', () => <Header/>);
```

#### Add knobs

Install:
```bash
npm install --save-dev @storybook/addon-knobs
npm install
```

Update `.storybook/addons.js` and add:
```jsx
import '@storybook/addon-knobs/register';
```

Update `src/stories/index.js`:
```jsx
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Header from '../Header';

const stories = storiesOf('Header', module);
stories.addDecorator(withKnobs);
stories.add('default', () => <Header title={text('Title', 'Welcome to React')}/>);
```

### HTML using stencil (manual mode) 

#### Install stencil

```bash
git clone https://github.com/ionic-team/stencil-component-starter.git stencil-manual
cd stencil-manual/
git remote rm origin
npm install
```

Run:
```bash
npm run start
```

#### Install storybook + story

```bash
npm install --save-dev @storybook/html@4.0.0-alpha.24
```

Update `package.json`:
```json
{
  "scripts": {
    "storybook": "start-storybook -p 9009 -s www"
  }
}
```

Create `.storybook/config.js`:
```js
import { configure } from '@storybook/html';
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}
configure(loadStories, module);
```

Create `.storybook/preview-head.html`:
```html
<script src="/build/mycomponent.js"></script>
<link rel="stylesheet" type="text/css" href="/build/mycomponent.css">
```

Create `src/components/my-component/my-component.stories.js`:
```jsx
import { storiesOf } from '@storybook/html';
const stories = storiesOf('My component', module);
stories.add('default', () => (`<my-component first="Stencil" last="'Don't call me a framework' JS"></my-component>`));
```

Run:
```bash
npm run build
npm run storybook
```

#### Add knobs

Install:
```bash
npm install --save-dev @storybook/addon-knobs@4.0.0-alpha.14
npm install --save-dev moment
```

Create `.storybook/addons.js`:
```jsx
import '@storybook/addon-knobs/register';
```

Update `src/stories/index.js`:
```jsx
import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
const stories = storiesOf('My component', module);
stories.addDecorator(withKnobs);
stories.add('default', () => (`<my-component first="${text('First', 'Stencil')}" last="${text('Last', "'Don't call me a framework' JS")}"></my-component>`));
```
