

const Subscription = {
    //User
    userCreated: {
        // This will return the value on every 1 sec until it reaches 0
        subscribe: (_,__,{pubSub}) => pubSub.subscribe('userCreated'),
        resolve: (payload) => payload
    },
    userUpdated:{
        subscribe: (_,__,{pubSub}) => pubSub.subscribe('userUpdated'),
        resolve: (payload) => payload
    },
    userDeleted:{
        subscribe: (_,__,{pubSub}) => pubSub.subscribe('userDeleted'),
        resolve: (payload) => payload
    },

    //Post
    postCreated: {
        // This will return the value on every 1 sec until it reaches 0
        subscribe:  (_,__,{pubSub}) => pubSub.subscribe('postCreated'),
        resolve: (payload, variables) => {  
            if(!variables.user_id) return payload      
            if (payload.user !== variables.user_id) {
                throw new Error(`Invalid user ID. Expected ${variables.user_id}, but got ${payload.user_id}.`);    
                
            }
            return payload
          },
      
    },
    postUpdated:{
        subscribe: (_,__,{pubSub}) => pubSub.subscribe('postUpdated'),
        resolve: (payload) => payload
    },
    postDeleted:{
        subscribe: (_,__,{pubSub}) => pubSub.subscribe('postDeleted'),
        resolve: (payload) => payload
    },
     //Post
    commentCreated: {
        // This will return the value on every 1 sec until it reaches 0
        subscribe: (_,__,{pubSub}) => pubSub.subscribe('commentCreated'),
        resolve: (payload) => payload
    },
    commentUpdated:{
        subscribe: (_,__,{pubSub}) => pubSub.subscribe('commentUpdated'),
        resolve: (payload) => payload
    },
    commentDeleted:{
        subscribe: (_,__,{pubSub}) => pubSub.subscribe('commentDeleted'),
        resolve: (payload) => payload
    }
}

export default Subscription