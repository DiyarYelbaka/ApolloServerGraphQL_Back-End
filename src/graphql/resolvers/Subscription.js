import { users, posts, comments } from "../../data.js";
import pubSub from '../../pubSub.js';
const Subscription = {
    //User
    userCreated: {
        // This will return the value on every 1 sec until it reaches 0
        subscribe: () => pubSub.subscribe('userCreated'),
        resolve: (payload) => payload
    },
    userUpdated:{
        subscribe: () => pubSub.subscribe('userUpdated'),
        resolve: (payload) => payload
    },
    userDeleted:{
        subscribe: () => pubSub.subscribe('userDeleted'),
        resolve: (payload) => payload
    },

    //Post
    postCreated: {
        // This will return the value on every 1 sec until it reaches 0
        subscribe:  () => pubSub.subscribe('postCreated'),
        resolve: (payload, variables) => {  
            if(!variables.user_id) return payload      
            if (payload.user_id !== variables.user_id) {
                throw new Error(`Invalid user ID. Expected ${variables.user_id}, but got ${payload.user_id}.`);    
                
            }
            // console.log('1111',payload)
            // console.log('222',variables)
            return payload
          },
      
    },
    postUpdated:{
        subscribe: () => pubSub.subscribe('postUpdated'),
        resolve: (payload) => payload
    },
    postDeleted:{
        subscribe: () => pubSub.subscribe('postDeleted'),
        resolve: (payload) => payload
    },
     //Post
    commentCreated: {
        // This will return the value on every 1 sec until it reaches 0
        subscribe: () => pubSub.subscribe('commentCreated'),
        resolve: (payload) => payload
    },
    commentUpdated:{
        subscribe: () => pubSub.subscribe('commentUpdated'),
        resolve: (payload) => payload
    },
    commentDeleted:{
        subscribe: () => pubSub.subscribe('commentDeleted'),
        resolve: (payload) => payload
    }
}

export default Subscription