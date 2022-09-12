import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from '../Home';
import Header from '../Header';
import Footer from '../Footer';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        notes: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: cache,
})


const App = () => {
  return (
    <>
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
             <Route path='/' element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
    </>
  )
}

export default App