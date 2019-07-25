# JS unit tests

## JavaScript Testing pool result

https://ashleynolan.co.uk/blog/frontend-tooling-survey-2018-results#js-testing

## Testing structure

## Install
```shell
npm i --save-dev mocha jasmine jest
npm i --save-dev babel-register babel-preset-env babel-preset-stage-0
```

### .babelrc

```json
{
  "presets": [
    "env",
    "stage-0"
  ]
}
```

### package.json

```json
{
  "scripts": {
    "jasmine": "jasmine --config=config/jasmine.json",
    "mocha": "mocha --require babel-register \"**/*.mocha.spec.js\"",
    "jest": "jest --config=config/jest.json"
  }
}
```

### config/jasmine.json

```json
{
  "spec_dir": "src",
  "spec_files": [
    "**/*.jasmine.spec.js"
  ],
  "helpers": [
    "../node_modules/babel-register/lib/node.js"
  ]
}
```

### config/jest.json

```json
{
  "rootDir": "../src",
  "testMatch": ["**/*.jest.spec.js"]
}
```

### src/getTotal/getTotal.js

```js
export function getTotal(cart) {
  return cart
    .map(item => item.price * item.qty)
    .reduce((a, b) => a + b, 0);
}
```

### src/getTotal/getTotal.[jasmine|jest|mocha].spec.js

```js
describe('getTotal', () => {
  it('should calculate the cart total', () => {});
});
```





## Reporter

### Jasmine

#### Install

```shell
npm i --save-dev jasmine-spec-reporter
```

#### config/jasmine.js

```js
import { SpecReporter } from 'jasmine-spec-reporter';

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
  spec: {
    displayPending: true
  }
}));
```

#### config/jasmine.json

```json
{
  "spec_dir": "src",
  "spec_files": [
    "**/*.jasmine.spec.js"
  ],
  "helpers": [
    "../node_modules/babel-register/lib/node.js",
    "../config/jasmine.js"
  ]
}
```





## Assertions functions

### Jasmine / Jest

#### ### src/getTotal/getTotal.[jasmine|jest].spec.js

```js
import getTotal from './getTotal';
describe('getTotal', () => {
  it('should calculate the cart total', () => {
    const cart = [
      { productId: 42, price: 12, qty: 1 },
      { productId: 43, price: 6, qty: 3 }
    ];
    const total = getTotal(cart);
    expect(total).toEqual(30);
  });
});
```

### Mocha

#### Install

```shell
npm i --save-dev chai
```

#### src/getTotal/getTotal.mocha.spec.js

```js
import { assert, expect, should } from 'chai';
import getTotal from './getTotal';
should();

describe('getTotal', () => {
  it('should calculate the cart total', () => {
    const cart = [
      { productId: 42, price: 12, qty: 1 },
      { productId: 43, price: 6, qty: 3 }
    ];
    const total = getTotal(cart);
    expect(total).to.equal(30);
    total.should.equal(30);
    assert.equal(total, 30);
  });
});
```





## Watch

### Mocha / Jest

#### package.json

```json
{
  "scripts": {
    "mocha:auto": "mocha --watch --require babel-register \"**/*.mocha.spec.js\"",
    "jest:auto": "jest --watch --config=config/jest.json"
  }
}
```

### Jasmine

#### Install

```shell
npm i --save-dev nodemon
```

#### package.json

```json
{
  "scripts": {
    "jasmine:auto": "nodemon --exec npm run jasmine"
  }
}
```





## Spies

### All

#### delay/delay.js

```js
export default function delay(callback, timer = 0) {
  return new Promise(resolve => setTimeout(resolve, timer))
    .then(callback);
}
```

### Jasmine

#### delay/delay.jasmine.spec.js

```js
import delay from './delay';
describe('delay', () => {
  it('async testing with done', done => {
    delay(() => {})
      .then(() => done());
  });
  it('async testing with promise', () => {
    return delay(() => {}, 200);
  });
  it('use spy', () => {
    const spy = jasmine.createSpy();
    return delay(spy)
      .then(() => expect(spy).toHaveBeenCalled());
  });
});
```

### Jest

#### delay/delay.jest.spec.js

```js
import delay from './delay';
describe('delay', () => {
  it('async testing with done', done => {
    delay(() => {})
      .then(() => done());
  });
  it('async testing with promise', () => {
    return delay(() => {}, 200);
  });
  it('use spy', () => {
    const spy = jest.fn();
    return delay(spy)
      .then(() => expect(spy).toHaveBeenCalled());
  });
});
```

### Mocha

#### Install

```shell
npm i --save-dev sinon
```
#### delay/delay.jest.spec.js

```js
import { expect } from 'chai';
import sinon from 'sinon';
import delay from './delay';

describe('delay', () => {
  it('async testing with done', done => {
    delay(() => {})
      .then(() => done());
  });
  it('async testing with promise', () => {
    return delay(() => {}, 200);
  });
  it('use spy', () => {
    const spy = sinon.fake();
    return delay(spy)
      .then(() => expect(spy.called).to.equal(true));
  });
});
```





## Mocks / Stubs

### All

#### getTotalItems/getTotalItems.js

```js
import service from './service';
export default function getTotalItems() {
  return service.getCart()
    .then(cart => cart.map(item => item.qty))
    .then(countItems => countItems.reduce((a, b) => a + b, 0))
    .catch(error => error.message);
}
```

#### getTotalItems/service.js

```js
export default {
  getCart() {
    return fetch('/api/cart').then(res => res.json());
  }
};
```

### Jest

#### getTotalItems/getTotalItems.jest.spec.js

```js
import getTotalItems from './getTotalItems';
jest.mock('./service');

describe('getTotalItems', () => {
  it('should return the total number of items in the cart', () => {
    const resultPromise = getTotalItems();
    return resultPromise.then(total => expect(total).toEqual(4));
  });
});
```

#### getTotalItems/__mocks__/service.js

```js
export default {
  getCart() {
    return Promise.resolve([
      { productId: 42, price: 12, qty: 1 },
      { productId: 43, price: 6, qty: 3 }
    ]);
  }
};
```

### Jasmine

#### getTotalItems/getTotalItems.jasmine.spec.js

```js
import getTotalItems from './getTotalItems';
import service from './service';

describe('getTotalItems', () => {
  beforeEach(() => {
    spyOn(service, 'getCart').and.returnValue(Promise.resolve([
      { productId: 42, price: 12, qty: 1 },
      { productId: 43, price: 6, qty: 3 }
    ]));
  });

  it('should return the total number of items in the cart', () => {
    const resultPromise = getTotalItems();
    return resultPromise.then(total => expect(total).toEqual(4))
  });
});
```

### Mocha

#### getTotalItems/getTotalItems.mocha.spec.js

```js
import { expect } from 'chai';
import sinon from 'sinon';
import getTotalItems from './getTotalItems';
import service from './service';

describe('getTotalItems', () => {
  beforeEach(() => {
    sinon.stub(service, 'getCart').returns(Promise.resolve([
      { productId: 42, price: 12, qty: 1 },
      { productId: 43, price: 6, qty: 3 }
    ]));
  });

  it('should return the total number of items in the cart', () => {
    const resultPromise = getTotalItems();
    return resultPromise.then(total => expect(total).to.equal(4));
  });
});
```





## Code coverage

### Jest

#### package.json

```json
{
  "scripts": {
    "jest:cov": "jest --coverage --config=config/jest.json"
  }
}
```

### Jasmine /Mocha

#### Install

```shell
npm install --save-dev nyc
```

#### package.json

```json
{
  "scripts": {
    "jasmine:cov": "nyc --reporter=lcov npm run jasmine",
    "mocha:cov": "nyc --reporter=lcov npm run mocha"
  },
  "nyc": {
    "exclude": ["**/*.spec.js"],
    "include": ["src/**"]
  }
}
```





## Finish the job

### Jest

#### getTotalItems/getTotalItems.jest.spec.js

```js
import service from './service';
import getTotalItems from './getTotalItems';
jest.mock('./service');

describe('getTotalItems', () => {
  let spy;

  afterEach(() => {
    if (spy) {
      spy.mockRestore();
    }
  });

  it('should fail', () => {
    spy = jest.spyOn(service, 'getCart');
    spy.mockReturnValue(Promise.reject({ message: 'An error occured' }));
    const resultPromise = getTotalItems();
    return resultPromise.then(message => expect(message).toEqual('An error occured'));
  });

  it('should return the total number of items in the cart', () => {
    const resultPromise = getTotalItems();
    return resultPromise.then(total => expect(total).toEqual(4))
  });
});
```

### Mocha

#### getTotalItems/getTotalItems.mocha.spec.js

```js
import { expect } from 'chai';
import sinon from 'sinon';
import getTotalItems from './getTotalItems';
import service from './service';

describe('getTotalItems', () => {
  let serviceStub;

  before(() => {
    serviceStub = sinon.stub(service, 'getCart')
  });

  it('should fail', () => {
    serviceStub.returns(Promise.reject({ message: 'An error occured' }));
    const resultPromise = getTotalItems();
    return resultPromise.then(message => expect(message).to.equal('An error occured'));
  });

  it('should return the total number of items in the cart', () => {
    serviceStub.returns(Promise.resolve([
      { productId: 42, price: 12, qty: 1 },
      { productId: 43, price: 6, qty: 3 }
    ]));
    const resultPromise = getTotalItems();
    return resultPromise.then(total => expect(total).to.equal(4));
  });
});
```

### Jasmine

#### getTotalItems/getTotalItems.jasmine.spec.js

```js
import getTotalItems from './getTotalItems';
import service from './service';

describe('getTotalItems', () => {
  let spy;

  beforeAll(() => {
    spy = spyOn(service, 'getCart');
  });

  it('should fail', () => {
    spy.and.returnValue(Promise.reject({ message: 'An error occured' }));
    const resultPromise = getTotalItems();
    return resultPromise.then(message => expect(message).toEqual('An error occured'));
  });

  it('should return the total number of items in the cart', () => {
    spy.and.returnValue(Promise.resolve([
      { productId: 42, price: 12, qty: 1 },
      { productId: 43, price: 6, qty: 3 }
    ]));
    const resultPromise = getTotalItems();
    return resultPromise.then(total => expect(total).toEqual(4))
  });
});
```





## Reset mocks

### Mocha

#### getTotalItems/getTotalItems.mocha.spec.js

```js
import { expect } from 'chai';
import sinon from 'sinon';
import getTotalItems from './getTotalItems';
import service from './service';

describe('getTotalItems', () => {
  let serviceStub;

  before(() => {
    serviceStub = sinon.stub(service, 'getCart')
  });

  beforeEach(() => {
    serviceStub.resetHistory();
  });

  it('should fail', () => {
    serviceStub.returns(Promise.reject({ message: 'An error occured' }));
    const resultPromise = getTotalItems();
    return resultPromise.then(message => {
      expect(message).to.equal('An error occured');
      expect(serviceStub.calledOnce).to.equal(true);
    });
  });

  it('should return the total number of items in the cart', () => {
    serviceStub.returns(Promise.resolve([
      { productId: 42, price: 12, qty: 1 },
      { productId: 43, price: 6, qty: 3 }
    ]));
    const resultPromise = getTotalItems();
    return resultPromise.then(total => {
      expect(total).to.equal(4);
      expect(serviceStub.calledOnce).to.equal(true);
    });
  });
});
```

### Jasmine

#### getTotalItems/getTotalItems.jest.spec.js

```js
import getTotalItems from './getTotalItems';
import service from './service';

describe('getTotalItems', () => {
  let spy;

  beforeAll(() => {
    spy = spyOn(service, 'getCart');
  });

  beforeEach(() => {
    spy.calls.reset();
  });

  it('should fail', () => {
    spy.and.returnValue(Promise.reject({ message: 'An error occured' }));
    const resultPromise = getTotalItems();
    return resultPromise.then(message => {
      expect(message).toEqual('An error occured');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('should return the total number of items in the cart', () => {
    spy.and.returnValue(Promise.resolve([
      { productId: 42, price: 12, qty: 1 },
      { productId: 43, price: 6, qty: 3 }
    ]));
    const resultPromise = getTotalItems();
    return resultPromise.then(total => {
      expect(total).toEqual(4);
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });
});
```

### Jest

#### getTotalItems/getTotalItems.jest.spec.js

```js
import service from './service';
import getTotalItems from './getTotalItems';
jest.mock('./service');

describe('getTotalItems', () => {
  let spy;

  beforeAll(() => {
    spy = jest.spyOn(service, 'getCart');
  });

  beforeEach(() => {
    spy.mockReset();
  });

  it('should fail', () => {
    spy.mockReturnValue(Promise.reject({ message: 'An error occured' }));
    const resultPromise = getTotalItems();
    return resultPromise.then(message => {
      expect(message).toEqual('An error occured');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('should return the total number of items in the cart', () => {
    spy.mockReturnValue(Promise.resolve([
      { productId: 42, price: 12, qty: 1 },
      { productId: 43, price: 6, qty: 3 }
    ]));
    const resultPromise = getTotalItems();
    return resultPromise.then(total => {
      expect(total).toEqual(4);
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });
});
```





## Test service

#### getTotalItems/service.jest.spec.js

```js
import service from './service';

describe('service', () => {
  let spy;

  beforeEach(() => {
    spy = jest.fn();
    global.fetch = jest.fn().mockReturnValue(Promise.resolve({
      json: spy
    }));
  });

  it('should call the json function', () => {
    return service
      .getCart()
      .then(() => {
        expect(global.fetch).toHaveBeenCalled();
        expect(spy).toHaveBeenCalled();
      });
  });
});
```

### Mocha

#### getTotalItems/getTotalItems.mocha.spec.js

```js
import { expect } from 'chai';
import sinon from 'sinon';
import getTotalItems from './getTotalItems';
import service from './service';

describe('getTotalItems', () => {
  before(() => {
    sinon.stub(service, 'getCart');
  });

  beforeEach(() => {
    service.getCart.resetHistory();
  });

  after(() => {
    service.getCart.restore();
  });

  it('should fail', () => {
    service.getCart.returns(Promise.reject({ message: 'An error occured' }));
    const resultPromise = getTotalItems();
    return resultPromise.then(message => {
      expect(message).to.equal('An error occured');
      expect(service.getCart.calledOnce).to.equal(true);
    });
  });

  it('should return the total number of items in the cart', () => {
    service.getCart.returns(Promise.resolve([
      { productId: 42, price: 12, qty: 1 },
      { productId: 43, price: 6, qty: 3 }
    ]));
    const resultPromise = getTotalItems();
    return resultPromise.then(total => {
      expect(total).to.equal(4);
      expect(service.getCart.calledOnce).to.equal(true);
    });
  });
});
```

#### getTotalItems/service.mocha.spec.js

```js
import { expect } from 'chai';
import sinon from 'sinon';
import service from './service';

describe('service', () => {
  let spy;

  beforeEach(() => {
    spy = sinon.fake();
    global.fetch = sinon.fake.returns(Promise.resolve({
      json: spy
    }));
  });

  it('should call the json function', () => {
    return service
      .getCart()
      .then(() => {
        expect(global.fetch.called).to.equal(true);
        expect(spy.called).to.equal(true);
      });
  });
});
```

### Jasmine

#### getTotalItems/service.jasmine.spec.js

```js
import service from './service';

describe('service', () => {
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy();
    global.fetch = jasmine.createSpy().and.returnValue(Promise.resolve({
      json: spy
    }));
  });

  it('should call the json function', () => {
    return service
      .getCart()
      .then(() => {
        expect(global.fetch).toHaveBeenCalled();
        expect(spy).toHaveBeenCalled();
      });
  });
});
```





## Compare table

|                       | Mocha          | Jasmine         | Jest |
|-----------------------|:--------------:|:---------------:|:----:|
| testing structure     | X              | X               | X    |
| assertions functions  | chai           | X               | X    |
| watch                 | X              | nodemon / karma | X    |
| mocks / spies / stubs | sinon          | X               | X    |
| code coverage         | nyc / istanbul | nyc / istanbul  | X    |
