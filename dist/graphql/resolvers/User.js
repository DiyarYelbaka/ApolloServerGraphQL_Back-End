import { users, posts, comments } from "../../data.js";
const User = {
  posts: (parent, args) => posts.filter(post => post.user_id === parent.id),
  comments: (parent, args) => comments.filter(comment => comment.user_id === parent.id)
};
export default User;