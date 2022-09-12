require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/graphql', graphqlHTTP({
  graphiql: process.env.NODE_ENV === 'development',
}));

// eslint-disable-next-line no-console
app.listen(PORT, console.log(`Server started listening on port ${PORT}...`));
