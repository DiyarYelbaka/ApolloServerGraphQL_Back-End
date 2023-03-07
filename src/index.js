import { createYoga, createSchema} from 'graphql-yoga'
import { createServer } from 'node:http'
import resolvers from './graphql/resolvers/index.js';
import typeDefs from './graphql/type-defs/index.js';



const yoga = createYoga({
    schema: createSchema({
        typeDefs: typeDefs,
        resolvers,
    }),
    context:{
    
    }
})

const server = createServer(yoga)
server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql')
})

