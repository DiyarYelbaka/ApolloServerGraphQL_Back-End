import { createYoga, createSchema} from 'graphql-yoga'
import { createServer } from 'node:http'
import resolvers from './graphql/resolvers/index.js';
import typeDefs from './graphql/type-defs/index.js';
import pubSub from './pubSub.js';
import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'
import db from './db.js'

db()

import User from './models/User.js';
import Post from './models/Post.js';
import Comment from './models/Comment.js';



const yoga = createYoga({
    schema: createSchema({
        typeDefs: typeDefs,
        resolvers,
    }),
    context:{
    pubSub,
    db,
    _db:{
      User,
      Post,
      Comment
    }
    },
    graphiql: {
        subscriptionsProtocol: 'WS'
      }
})

const httpServer = createServer(yoga)

const wsServer = new WebSocketServer({
    server: httpServer,
    path: yoga.graphqlEndpoint
})

useServer(
    {
      execute: (args) => args.rootValue.execute(args),
      subscribe: (args) => args.rootValue.subscribe(args),
      onSubscribe: async (ctx, msg) => {
        const { schema, execute, subscribe, contextFactory, parse, validate } =
         yoga.getEnveloped({
            ...ctx,
            req: ctx.extra.request,
            socket: ctx.extra.socket,
            params: msg.payload
          })
   
        const args = {
          schema,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
          contextValue: await contextFactory(),
          rootValue: {
            execute,
            subscribe
          }
        }
   
        const errors = validate(args.schema, args.document)
        if (errors.length) return errors
        return args
      }
    },
    wsServer
  )

httpServer.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql')
})

