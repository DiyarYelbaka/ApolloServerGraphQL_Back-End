import { users, posts, comments } from "../../data.js";
const Query = {
  hello: () => 'world',
  //Get All Users
  users: () => users,
  //Get Single User by ID
  user: (parent, args) => {
    const user = users.find(user => user.id === args.id);
    if (!user) {
      throw "User not found";
    }
    return user;
  },
  posts: () => posts,
  post: (parent, args) => posts.find(post => post.id === args.id),
  comments: () => comments,
  comment: (parent, args) => comments.find(comment => comment.id === args.id)
};
export default Query;