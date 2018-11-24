const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const cookieParser = require('cookie-parser');
const resolvers = require('./resolvers');
const { sendCookieTokenMiddleware } = require('./utils');

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  debug: process.env.PRISMA_DEBUG
});

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({ ...req, db })
});

server.express.use(cookieParser());
server.express.use(sendCookieTokenMiddleware);

server.start(
  { cors: { origin: /^https?:\/\/(localhost:)(.*)/, credentials: true }},
  () => console.log('Server is running on http://localhost:4000')
);
