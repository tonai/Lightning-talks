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
