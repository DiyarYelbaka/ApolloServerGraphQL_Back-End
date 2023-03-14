import { nanoid } from 'nanoid';
import { users, posts, comments } from './data.js'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  # User
  type User {
    id: ID!
    fullName: String!
    age:Int!
    posts:[Post!]!
    comments: [Comment!]!
  }

  input CreateUserInput{
    fullName:String!
    age:Int!
  }

  input UpdateUserInput{
    fullName:String
    age:Int
  }

  #Post
  type Post {
    id: ID!
    title: String!
    user_id: ID!
    user: User!
    comments: [Comment!]!
  }

  input CreatePostInput{
    title:String!
    user_id:ID!
  }

  input UpdatePostInput{
    title:String
    user_id:ID
  }



  #Comment
  type Comment {
    id: ID!
    text: String!
    post_id: ID!
    user: User!
    post: Post!
  }

  input CreateCommentInput{
    text:String! 
    post_id:ID! 
    user_id:ID!
  }

  input UpdateCommentInput{
    text:String
    post_id:ID
    user_id:ID
  }

  type DeleteAllOutput{
    count:ID!
  }
   
 

  #Query
  type Query {
    users: [User!]!
    user(id: ID!): User!
    posts: [Post!]!
    post(id: ID!): Post!
    comments: [Comment!]!
    comment(id: ID!): Comment!
  }
  
  #Mutation
  type Mutation{
    #User
    createUser(data:CreateUserInput!): User!
    updateUser(id:ID!, data:UpdateUserInput!): User!
    deleteUser(id:ID!): User!
    deleteAllUser:DeleteAllOutput!
    #Post
    createPost(data:CreatePostInput!): Post!
    updatePost(id:ID!,data:UpdatePostInput!): Post!
    deletePost(id:ID!): Post!
    deleteAllPosts:DeleteAllOutput!
    #Comment
    createComment(data:CreateCommentInput): Comment!
    updateComment(id:ID!,data:UpdateCommentInput!): Comment!
    deleteComment(id:ID!): Comment!
    deleteAllComments:DeleteAllOutput!
  }

  type Subscription {
    count: Int!
  }

`;



const resolvers= {
  Subscription: {
    count: {
      subscribe : (_, __, { pubSub }) => {
        let count = 0;
        setInterval(()=>{
          count++;
          pubSub.publish('count',{count})
        })

        return pubSub.asyncIterator('count')
      }
    }
  },
  Mutation:{
    // User
    createUser:(parent,args)=>{
     const user = {
        fullName:args.data.fullName,
        id:nanoid(),
        age:args.data.age
      }
      users.push(user)
      return user
    },
    updateUser:(parent,args)=>{
      const user_index = users.findIndex(user => user.id === args.id)

      if(user_index === -1){
        throw new Error('User not found')
      }
    const updated_user= (users[user_index] = {
        ...users[user_index],
        ...args.data,
      })

      return  updated_user
    },
    deleteUser:(parent,args)=>{
     const user_index = users.findIndex(user => user.id === args.id)

     if (user_index === -1){
      throw new Error('Users not found')
     }
     const deleted_user =users[user_index]
     users.splice(user_index,1)
     
     return deleted_user
    },
    deleteAllUser:()=>{
      const length = users.length;
      users.splice(0,length);

      return{
        count:length
      }
    },
    


    //Post
   createPost:(parent,args)=>{
    const post={
      title:args.data.title,
      user_id:args.data.user_id
    }
    posts.push(post)
    return  post
   },
   updatePost:(parent,args)=>{
      const post_index = posts.findIndex(post => post.id === args.id)

      if(post_index === -1){
        throw new Error('Post not found.')
      }

      const updated_post = posts[post_index]={
        ...posts[post_index],
        ...args.data
      }

      return updated_post
   },
   deletePost:(parent,args)=>{
    const post_index = posts.findIndex(post => post.id === args.id)

    if(post_index === -1){
      throw new Error('Users not found')
    }

    const delete_post = posts[post_index]
    posts.splice(post_index,1)

    return delete_post
   },
   deleteAllPosts:()=>{
    const length = posts.length;
    posts.splice(0,length);

    return{
      count:length
    }
  },

   //Comment
   createComment:(parent,args)=>{
      const comment ={
        id:nanoid(),
        ...args.data
      }

      comments.push(comment)
      return comment
    },
   updateComment:(parent,args)=>{
    const comment_index = comments.findIndex(comment => comment.id === args.id)

    if(comment_index === -1){
      throw new Error('Post not found')
    }

    const updated_comment = comments[comment_index]={
      ...comments[comment_index],
      ...args.data
    }

    return updated_comment
    },

   deleteComment:(parent,args)=>{
    const comment_index = comments.findIndex(comment => comment.id == args.id)

    if(comment_index === -1){
      throw new Error('Comment not found')
    }

    const delete_comment = comments[comment_index]
    comments.splice(delete_comment,1)

    return delete_comment

   },
   deleteAllComments:()=>{
    const length = comments.length;
    comments.splice(0,length);

    return{
      count:length
    }
  },
   
  

  },

  Query: {
    //Get All Users
    users: () => users,

    //Get Single User by ID
    user: (parent, args) => {
      const user = users.find((user) => user.id === args.id);

      if (!user) {
        throw "User not found";
      }

      return user;
    },
    posts: () => posts,
    post: (parent, args) => posts.find((post) => post.id === args.id),

    comments: () => comments,
    comment: (parent, args) => comments.find((comment) => comment.id === args.id),

  },

  User: {
    posts: (parent, args) => posts.filter((post) => post.user_id === parent.id),
    comments: (parent, args) => comments.filter((comment) => comment.user_id === parent.id),
  },
  Post: {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    comments: (parent) => comments.filter((comment) => comment.post_id === parent.id),
  },
  Comment: {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    post: (parent, args) => posts.find((post) => post.id === parent.post_id),
  },
 
};



const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);


