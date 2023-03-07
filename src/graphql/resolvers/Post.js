import { users, posts, comments } from "../../data.js";

const Post = {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    comments: (parent) => comments.filter((comment) => comment.post_id === parent.id),
}

export default Post