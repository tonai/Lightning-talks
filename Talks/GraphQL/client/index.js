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
