import { users, posts, } from "../../data.js";

 const Query = {
    hello: () => 'world',
    //Get All Users
    users: async(_,__,{_db}) => {
        const users = await _db.User.find()
        return users
    },

    //Get Single User by ID
    user: (parent, args, {_db}) => {
        const user = _db.User.findById(args.id);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    },
    posts: async(_,__,{_db}) => {
        const posts = await _db.Post.find()
        return posts
    },
    post:async (parent, args,{_db}) => {
       const posts = await _db.Post.findById( args.id)
    return posts
    }
     ,

    comments: async (_,__,{_db}) => {
        const comments = await _db.Comment.find()
        return comments
    },
    comment:async (parent, args,{_db}) => {
        const comment = await _db.Comment.findById(args.id)
        return comment
    },

}

export default Query