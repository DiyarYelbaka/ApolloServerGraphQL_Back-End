import { users, posts, comments } from "../../data.js";

const Comment = {
    user: async(parent, args,{_db}) => await _db.User.findById(parent.user) ,
    post: async(parent, args,{_db}) => await _db.Post.findById(parent.post)
}

export default Comment;