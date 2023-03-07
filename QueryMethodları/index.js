import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { nanoid } from 'nanoid';
import { users, events, locations, participants } from './data.js'

const typeDefs = `#graphql
  
  type User { 
    id: ID!
    username:String!
    email: String!
    events:[Event!]
  }

  type Event{
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
    user:User!
    location:Location!
    participants:[Participant!]
  }

  type Location{
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  type Participant{
    id: ID!
    user_id:ID!
    event_id:ID!
  }

  type Query {
    users : [User!]
    user(id:ID!) : User!

    events: [Event!]
    event(id:ID!):Event!

    locations:[Location!]
    location(id:ID!):Location!

    participants:[Participant!]
    participant(id:ID!):Participant
  }

  type Mutation{
    createUser(username:String! email:String!): User!
  }
  
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent,args)=> users.find((user)=> user.id == args.id ),

    events: ()=> events,
    event:(_,args)=> events.find((event)=> event.id == args.id ),

    locations : ()=> locations,
    location:(_,args) => locations.find((location)=> location.id == args.id),

    participants: ()=> participants,
    participant:(parent,args)=> participants.find(participant => participant.id == args.id)
  },

  User:{
   // Bir User'a ait bir veya birden fazla Event olabilir.
    events:(parent,args)=> events.filter(event => event.user_id == parent.id)
  },

  Event:{

  //Bir Event, bir User ile ilişkili olmalıdır.
    user:(parent,args)=> users.find(users=> parent.user_id == users.id),

  //Bir Event, bir Location ile ilişkili olmalıdır.
    location:(parent,args) => locations.find(locations => locations.id == parent.location_id ),

   //Bir Event birden fazla Participant ile ilişkili olmalıdır.
   participants:(parent,args)=> participants.filter(participants => participants.event_id == parent.id)
   
  },

  Mutation:{
    createUser:(parent,args)=>  {
      const user = {
        id:nanoid(),
        username:args.username,
        email: args.email,
      };

      users.push(user)
      return user;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);