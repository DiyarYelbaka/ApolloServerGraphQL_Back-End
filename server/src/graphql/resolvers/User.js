import { users, posts, comments } from "../../data.js";
 const User = {
    posts: async(parent, args,{_db}) => await _db.Post.find({user: parent.id}),
    comments: async(parent, args, {_db}) => await _db.Comment.find({user: parent.id}),
}

export default User