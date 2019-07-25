# GraphQl

## API

### Install

```shell
npm i --save-dev json-server
```

### db.json

```json
{
  "articles": [
    {
      "id": 1,
      "title": "Article 1",
      "category": 1,
      "published": true,
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      "id": 2,
      "title": "Article 2",
      "category": 2,
      "published": true,
      "content": "Donec malesuada enim ac ipsum dictum placerat."
    },
    {
      "id": 3,
      "title": "Article 3",
      "category": 1,
      "published": false,
      "content": "Phasellus sit amet bibendum augue."
    }
  ],
  "categories": [
    {
      "id": 1,
      "title": "News"
    },
    {
      "id": 2,
      "title": "Blog post"
    }
  ]
}
```

### package.json

```json
{
  "scripts": {
    "api": "json-server -p 3001 --watch api/db.json"
  }
}
```

### Launch API

```shell
npm run api
```

Endpoints :
* http://localhost:3001/articles
* http://localhost:3001/categories





## Init express server

### Install

```shell
mkdir lt-grapql
cd lt-graphql
npm init
npm install express express-graphql graphql --save
```

### server/index.js

```js
const express = require('express');
const port = 3000;

const app = express();
app.listen(port);
console.log(`Listening to port ${port}`);
```

### packages.json

```json
{
  "scripts": {
    "server": "node server/index.js"
  }
}
```





## Init GraphQL basic schema

### server/index.js

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');

const port = 3000;

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'AppSchema',
    fields: ({
      title: { type: GraphQLString },
      content: { type: GraphQLString },
    }),
  }),
});

const app = express();

app.use('/', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(port);
console.log(`Listening to port ${port}`);
```

### GraphiQL

```
{
  title
  content
}
```





## Init list of articles

### server/index.js

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');

const port = 3000;

const ArticleType = new GraphQLObjectType({
  name: 'ArticleType',
  fields: ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'AppSchema',
    fields: ({
      articles: {
        type: new GraphQLList(ArticleType),
      },
    }),
  }),
});

const app = express();

app.use('/', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(port);
console.log(`Listening to port ${port}`);
```

### GraphiQL

```
{
  articles {
    title
    content
  }
}
```





## Fetch articles

### Install

```shell
npm install node-fetch --save
```

### server/index.js

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');
const fetch = require('node-fetch');

const port = 3000;

const ArticleType = new GraphQLObjectType({
  name: 'ArticleType',
  fields: ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'AppSchema',
    fields: ({
      articles: {
        type: new GraphQLList(ArticleType),
        resolve: () =>
          fetch('http://localhost:3001/articles')
            .then(res => res.json()),
      },
    }),
  }),
});

const app = express();

app.use('/', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(port);
console.log(`Listening to port ${port}`);
```

### GraphiQL

```
{
  articles {
    title
    content
  }
}
```





## Get article

### server/index.js

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');
const fetch = require('node-fetch');

const port = 3000;

const ArticleType = new GraphQLObjectType({
  name: 'ArticleType',
  fields: ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'AppSchema',
    fields: ({
      articles: {
        type: new GraphQLList(ArticleType),
        resolve: () =>
          fetch('http://localhost:3001/articles')
            .then(res => res.json()),
      },
      article: {
        type: ArticleType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve: (root, args) =>
          fetch(`http://localhost:3001/articles/${args.id}`)
            .then(res => res.json()),
      },
    }),
  }),
});

const app = express();

app.use('/', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(port);
console.log(`Listening to port ${port}`);
```

### GraphiQL

```
{
  article(id: 1) {
    title
    content
  }
}
```





## Add categories

### server/index.js

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');
const fetch = require('node-fetch');

const port = 3000;

const CategoryType = new GraphQLObjectType({
  name: 'CategoryType',
  fields: ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
  })
});

const ArticleType = new GraphQLObjectType({
  name: 'ArticleType',
  fields: ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'AppSchema',
    fields: ({
      articles: {
        type: new GraphQLList(ArticleType),
        resolve: () =>
          fetch('http://localhost:3001/articles')
            .then(res => res.json()),
      },
      article: {
        type: ArticleType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) =>
          fetch(`http://localhost:3001/articles/${args.id}`)
            .then(res => res.json()),
      },
      categories: {
        type: new GraphQLList(CategoryType),
        resolve: () =>
          fetch('http://localhost:3001/categories')
            .then(res => res.json()),
      },
      category: {
        type: CategoryType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) =>
          fetch(`http://localhost:3001/categories/${args.id}`)
            .then(res => res.json()),
      },
    }),
  }),
});

const app = express();

app.use('/', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(port);
console.log(`Listening to port ${port}`);
```

### GraphiQL

```
{
  article(id: 1) {
    title
    content
  }
  category(id: 1) {
    id,
    title
  }
}
```





## Add relation

### server/index.js

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');
const fetch = require('node-fetch');

const port = 3000;

const CategoryType = new GraphQLObjectType({
  name: 'CategoryType',
  fields: ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
  })
});

const ArticleType = new GraphQLObjectType({
  name: 'ArticleType',
  fields: ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve: root =>
        fetch(`http://localhost:3001/categories/${root.category}`)
          .then(res => res.json()),
    }
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'AppSchema',
    fields: ({
      articles: {
        type: new GraphQLList(ArticleType),
        resolve: () =>
          fetch('http://localhost:3001/articles')
            .then(res => res.json()),
      },
      article: {
        type: ArticleType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) =>
          fetch(`http://localhost:3001/articles/${args.id}`)
            .then(res => res.json()),
      },
      categories: {
        type: new GraphQLList(CategoryType),
        resolve: () =>
          fetch('http://localhost:3001/categories')
            .then(res => res.json()),
      },
      category: {
        type: CategoryType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) =>
          fetch(`http://localhost:3001/categories/${args.id}`)
            .then(res => res.json()),
      },
    }),
  }),
});

const app = express();

app.use('/', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(port);
console.log(`Listening to port ${port}`);
```

### GraphiQL

```
{
  articles {
    title
    content
    category {
      id
      title
    }
  }
}
```

**Add console.log in resolve to show requests + lazy capabilities + cache missing**





## Optimizations

### Install

```shell
npm install dataloader --save
```

### server/index.js

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');
const fetch = require('node-fetch');
const DataLoader = require('dataloader');

const port = 3000;

const categoryLoader = new DataLoader(ids =>
  Promise.all(
    ids.map(id => console.log('Fetch child category', id) ||
      fetch(`http://localhost:3001/categories/${id}`)
        .then(res => res.json())
    )
  )
);

const CategoryType = new GraphQLObjectType({
  name: 'CategoryType',
  fields: ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
  })
});

const ArticleType = new GraphQLObjectType({
  name: 'ArticleType',
  fields: ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve: root => categoryLoader.load(root.category),
    }
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'AppSchema',
    fields: ({
      articles: {
        type: new GraphQLList(ArticleType),
        resolve: () => console.log('Fetch articles') ||
          fetch('http://localhost:3001/articles')
            .then(res => res.json()),
      },
      article: {
        type: ArticleType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => console.log('Fetch article', args.id) ||
          fetch(`http://localhost:3001/articles/${args.id}`)
            .then(res => res.json()),
      },
      categories: {
        type: new GraphQLList(CategoryType),
        resolve: () => console.log('Fetch categories') ||
          fetch('http://localhost:3001/categories')
            .then(res => res.json()),
      },
      category: {
        type: CategoryType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => categoryLoader.load(args.id),
      },
    }),
  }),
});

const app = express();

app.use('/', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(port);
console.log(`Listening to port ${port}`);
```

### GraphiQL

```
{
  articles {
    title
    content
    category {
      id
      title
    }
  }
  article(id: 1) {
    title
    content
    category {
      id
      title
    }
  }
  category(id: 1) {
    id
    title
  }
}
```





## By request optimizations

### server/index.js

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');
const fetch = require('node-fetch');
const DataLoader = require('dataloader');

const port = 3000;

const CategoryType = new GraphQLObjectType({
  name: 'CategoryType',
  fields: ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
  })
});

const ArticleType = new GraphQLObjectType({
  name: 'ArticleType',
  fields: ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve: (root, args, context) => context.categoryLoader.load(root.category),
    }
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'AppSchema',
    fields: ({
      articles: {
        type: new GraphQLList(ArticleType),
        resolve: () => console.log('Fetch articles') ||
          fetch('http://localhost:3001/articles')
            .then(res => res.json()),
      },
      article: {
        type: ArticleType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => console.log('Fetch article', args.id) ||
          fetch(`http://localhost:3001/articles/${args.id}`)
            .then(res => res.json()),
      },
      categories: {
        type: new GraphQLList(CategoryType),
        resolve: () => console.log('Fetch categories') ||
          fetch('http://localhost:3001/categories')
            .then(res => res.json()),
      },
      category: {
        type: CategoryType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args, context) => context.categoryLoader.load(args.id),
      },
    }),
  }),
});

const app = express();

app.use('/', graphqlHTTP(req => {
  const categoryLoader = new DataLoader(ids =>
    Promise.all(
      ids.map(id => console.log('Fetch category', id) ||
        fetch(`http://localhost:3001/categories/${id}`)
          .then(res => res.json())
      )
    )
  );
  return {
    schema,
    graphiql: true,
    context: { categoryLoader }
  };
}));

app.listen(port);
console.log(`Listening to port ${port}`);
```

### GraphiQL

```
{
  articles {
    title
    content
    category {
      id
      title
    }
  }
  article(id: 1) {
    title
    content
    category {
      id
      title
    }
  }
  category(id: 1) {
    id
    title
  }
}
```





## Add cycle relation

### db.json

```json
{
  "articles": [
    {
      "id": 1,
      "title": "Article 1",
      "category": 1,
      "published": true,
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      "id": 2,
      "title": "Article 2",
      "category": 2,
      "published": true,
      "content": "Donec malesuada enim ac ipsum dictum placerat."
    },
    {
      "id": 3,
      "title": "Article 3",
      "category": 1,
      "published": false,
      "content": "Phasellus sit amet bibendum augue."
    }
  ],
  "categories": [
    {
      "id": 1,
      "title": "News",
      "articles": [1]
    },
    {
      "id": 2,
      "title": "Blog post",
      "articles": [1]
    }
  ]
}
```

### server/index.js

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');
const fetch = require('node-fetch');
const DataLoader = require('dataloader');

const port = 3000;

const CategoryType = new GraphQLObjectType({
  name: 'CategoryType',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve: (root, args, context) => context.articleLoader.loadMany([1, 2, 3]),
    },
  })
});

const ArticleType = new GraphQLObjectType({
  name: 'ArticleType',
  fields: () => ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve: (root, args, context) => context.categoryLoader.load(root.category),
    }
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'AppSchema',
    fields: () => ({
      articles: {
        type: new GraphQLList(ArticleType),
        resolve: () => console.log('Fetch articles') ||
          fetch('http://localhost:3001/articles')
            .then(res => res.json()),
      },
      article: {
        type: ArticleType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => console.log('Fetch article', args.id) ||
          fetch(`http://localhost:3001/articles/${args.id}`)
            .then(res => res.json()),
      },
      categories: {
        type: new GraphQLList(CategoryType),
        resolve: () => console.log('Fetch categories') ||
          fetch('http://localhost:3001/categories')
            .then(res => res.json()),
      },
      category: {
        type: CategoryType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args, context) => context.categoryLoader.load(args.id),
      },
    }),
  }),
});

const app = express();

app.use('/', graphqlHTTP(req => {
  const articleLoader = new DataLoader(ids =>
    Promise.all(
      ids.map(id => console.log('Fetch article', id) ||
        fetch(`http://localhost:3001/articles/${id}`)
          .then(res => res.json())
      )
    )
  );
  const categoryLoader = new DataLoader(ids =>
    Promise.all(
      ids.map(id => console.log('Fetch category', id) ||
        fetch(`http://localhost:3001/categories/${id}`)
          .then(res => res.json())
      )
    )
  );
  return {
    schema,
    graphiql: true,
    context: { articleLoader, categoryLoader }
  };
}));

app.listen(port);
console.log(`Listening to port ${port}`);
```

### GraphiQL

```
{
  articles {
    title
    category {
      title
      articles {
        title
        category {
          title
          articles {
            title
          }
        }
      }
    }
  }
}
```





##  Add limitations

### Libs

* https://github.com/4Catalyzer/graphql-validation-complexity
* https://github.com/ivome/graphql-query-complexity
* https://github.com/stems/graphql-depth-limit

### server/index.js

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');
const fetch = require('node-fetch');
const DataLoader = require('dataloader');
const depthLimit = require('graphql-depth-limit');

const port = 3000;

const CategoryType = new GraphQLObjectType({
  name: 'CategoryType',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve: (root, args, context) => context.articleLoader.loadMany([1, 2, 3]),
    },
  })
});

const ArticleType = new GraphQLObjectType({
  name: 'ArticleType',
  fields: () => ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve: (root, args, context) => context.categoryLoader.load(root.category),
    }
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'AppSchema',
    fields: () => ({
      articles: {
        type: new GraphQLList(ArticleType),
        resolve: () => console.log('Fetch articles') ||
          fetch('http://localhost:3001/articles')
            .then(res => res.json()),
      },
      article: {
        type: ArticleType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => console.log('Fetch article', args.id) ||
          fetch(`http://localhost:3001/articles/${args.id}`)
            .then(res => res.json()),
      },
      categories: {
        type: new GraphQLList(CategoryType),
        resolve: () => console.log('Fetch categories') ||
          fetch('http://localhost:3001/categories')
            .then(res => res.json()),
      },
      category: {
        type: CategoryType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args, context) => context.categoryLoader.load(args.id),
      },
    }),
  }),
});

const app = express();

app.use('/', graphqlHTTP(req => {
  const articleLoader = new DataLoader(ids =>
    Promise.all(
      ids.map(id => console.log('Fetch article', id) ||
        fetch(`http://localhost:3001/articles/${id}`)
          .then(res => res.json())
      )
    )
  );
  const categoryLoader = new DataLoader(ids =>
    Promise.all(
      ids.map(id => console.log('Fetch category', id) ||
        fetch(`http://localhost:3001/categories/${id}`)
          .then(res => res.json())
      )
    )
  );
  return {
    schema,
    graphiql: true,
    context: { articleLoader, categoryLoader },
    validationRules: [ depthLimit(2) ]
  };
}));

app.listen(port);
console.log(`Listening to port ${port}`);
```

### GraphiQL

```
{
  articles {
    title
    category {
      title
      articles {
        title
        category {
          title
          articles {
            title
          }
        }
      }
    }
  }
}
```





## Enable CORS

### server/index.js

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');
const fetch = require('node-fetch');
const DataLoader = require('dataloader');
const depthLimit = require('graphql-depth-limit');
const cors = require('cors');

const port = 3000;

const CategoryType = new GraphQLObjectType({
  name: 'CategoryType',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve: (root, args, context) => context.articleLoader.loadMany([1, 2, 3]),
    },
  })
});

const ArticleType = new GraphQLObjectType({
  name: 'ArticleType',
  fields: () => ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve: (root, args, context) => context.categoryLoader.load(root.category),
    }
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'AppSchema',
    fields: () => ({
      articles: {
        type: new GraphQLList(ArticleType),
        resolve: () => console.log('Fetch articles') ||
          fetch('http://localhost:3001/articles')
            .then(res => res.json()),
      },
      article: {
        type: ArticleType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => console.log('Fetch article', args.id) ||
          fetch(`http://localhost:3001/articles/${args.id}`)
            .then(res => res.json()),
      },
      categories: {
        type: new GraphQLList(CategoryType),
        resolve: () => console.log('Fetch categories') ||
          fetch('http://localhost:3001/categories')
            .then(res => res.json()),
      },
      category: {
        type: CategoryType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args, context) => context.categoryLoader.load(args.id),
      },
    }),
  }),
});

const app = express();

app.use(cors());
app.use('/', graphqlHTTP(req => {
  const articleLoader = new DataLoader(ids =>
    Promise.all(
      ids.map(id => console.log('Fetch article', id) ||
        fetch(`http://localhost:3001/articles/${id}`)
          .then(res => res.json())
      )
    )
  );
  const categoryLoader = new DataLoader(ids =>
    Promise.all(
      ids.map(id => console.log('Fetch category', id) ||
        fetch(`http://localhost:3001/categories/${id}`)
          .then(res => res.json())
      )
    )
  );
  return {
    schema,
    graphiql: true,
    context: { articleLoader, categoryLoader },
    validationRules: [ depthLimit(2) ]
  };
}));

app.listen(port);
console.log(`Listening to port ${port}`);
```





## Client: webpack setup

### Install

```js
npm install --save-dev webpack webpack-dev-server webpack-cli
```

### client/webpack.config.js

```js
module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname + '/client',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client'
  }
};
```

### packages.json

```json
{
  "scripts": {
    "start": "webpack-dev-server --config ./client/webpack.config.js --mode development"
  }
}
```

### client/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
  <script src="bundle.js"></script>
  <pre id="pre"></pre>
</body>
</html>
```

### client/index.js

```js
console.log('Hello world');
```





## Client: Appolo

### Install

```shell
npm install apollo-boost graphql-tag graphql --save
```

### client/index.js

```js
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'http://localhost:3000'
});

const query = gql`
{
  articles {
    title
    content
    category {
      title
    }
  }
}
`;
client.query({ query })
  .then(data => document.getElementById('pre').innerHTML = JSON.stringify(data.data, null, 2))
  .catch(error => console.error(error));
```
