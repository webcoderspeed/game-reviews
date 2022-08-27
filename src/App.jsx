import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

import Home from './pages/Home';
import ReviewDetails from './pages/ReviewDetails';
import Category from './pages/Category';
import Header from './components/Header';

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const client = new ApolloClient({
  uri: `${BACKEND_URL}/graphql`,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className='App'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/reviews/:slug' element={<ReviewDetails />} />
            <Route path='/category/:id' element={<Category />} />
          </Routes>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
