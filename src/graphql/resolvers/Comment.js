import { users, posts, comments } from "../../data.js";

const Comment = {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    post: (parent, args) => posts.find((post) => post.id === parent.post_id),
}

export default Comment;