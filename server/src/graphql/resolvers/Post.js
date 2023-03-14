import { users, posts, comments } from "../../data.js";

const Post = {
    user: async(parent, args,{_db}) => await _db.User.findById(parent.user),
    comments: async(parent,__,{_db}) => await _db.Comment.find({post: parent.id}),
}

export default Post