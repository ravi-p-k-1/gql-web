import React from 'react';
import BookListComponent from './components/BookListComponent';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AddBookComponent from './components/AddBookComponent';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Reading List</h1>
        <BookListComponent />
        <AddBookComponent />
      </div>
    </ApolloProvider>
  );
}

export default App;
