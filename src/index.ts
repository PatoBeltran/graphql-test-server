import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';

import { QueryResolver as Query, UserResolver as User, DeviceResolver as Device, TemplateResolver as Template, AppResolver as App } from './queryResolvers';
import { MutationResolver as Mutation } from './mutationResolvers';

const port = 4000

const server = new ApolloServer({ 
  typeDefs: importSchema(path.join(__dirname, './schema.graphql')),
  resolvers: { 
    Query, 
    Mutation,
    User,
    Device,
    Template,
    App
  },
  introspection: true,
  playground: true
});

const app = express();

app.use(bodyParser.json())
server.applyMiddleware({ app });

app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
);