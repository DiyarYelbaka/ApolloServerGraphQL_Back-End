import { nanoid } from 'nanoid';
import { users, posts, comments } from "../../data.js";
import pubSub from '../../pubSub.js';

const Mutation = {
    // User
    createUser: (parent, args) => {
        const user = {
            id: nanoid(),
            fullName: args.data.fullName,
            age:args.data.age
        }
        users.push(user)

        pubSub.publish('userCreated', user)
        

        return user
    },
    updateUser: (parent, args) => {
        const user_index = users.findIndex(user => user.id === args.id)

        if (user_index === -1) {
            throw new Error('User not found')
        }
        const updated_user = (users[user_index] = {
            ...users[user_index],
            ...args.data,
        })

        pubSub.publish('userUpdated', updated_user)

        return updated_user
    },
    deleteUser: (parent, args) => {
        const user_index = users.findIndex(user => user.id === args.id)

        if (user_index === -1) {
            throw new Error('Users not found')
        }
        const deleted_user = users[user_index]
        users.splice(user_index, 1)

        pubSub.publish('userDeleted', deleted_user)

        return deleted_user
    },
    deleteAllUser: () => {
        const length = users.length;
        users.splice(0, length);

        return {
            count: length
        }
    },



    //Post
    createPost: (parent, args) => {
        const post = {
            id:nanoid(),
            title: args.data.title,
            user_id: args.data.user_id
        }
        posts.push(post)
        pubSub.publish('postCreated', post)
        return post
    },
    updatePost: (parent, args) => {
        const post_index = posts.findIndex(post => post.id === args.id)

        if (post_index === -1) {
            throw new Error('Post not found.')
        }

        const updated_post = posts[post_index] = {
            ...posts[post_index],
            ...args.data
        }

        pubSub.publish('postUpdated', updated_post)

        return updated_post
    },
    deletePost: (parent, args) => {
        const post_index = posts.findIndex(post => post.id === args.id)

        if (post_index === -1) {
            throw new Error('Users not found')
        }

        const delete_post = posts[post_index]
        posts.splice(post_index, 1)

        pubSub.publish('postDeleted', delete_post)

        return delete_post
    },
    deleteAllPosts: () => {
        const length = posts.length;
        posts.splice(0, length);

        return {
            count: length
        }
    },

    //Comment
    createComment: (parent, args) => {
        const comment = {
            id: nanoid(),
            ...args.data
        }

        comments.push(comment)
        pubSub.publish('commentCreated', comment)
        return comment
    },
    updateComment: (parent, args) => {
        const comment_index = comments.findIndex(comment => comment.id === args.id)

        if (comment_index === -1) {
            throw new Error('Post not found')
        }

        const updated_comment = comments[comment_index] = {
            ...comments[comment_index],
            ...args.data
        }

        pubSub.publish('commentUpdated', updated_comment)

        return updated_comment
    },

    deleteComment: (parent, args) => {
        const comment_index = comments.findIndex(comment => comment.id == args.id)

        if (comment_index === -1) {
            throw new Error('Comment not found')
        }

        const delete_comment = comments[comment_index]
        comments.splice(delete_comment, 1)

        pubSub.publish('commentDeleted', delete_comment)

        return delete_comment

    },
    deleteAllComments: () => {
        const length = comments.length;
        comments.splice(0, length);

        return {
            count: length
        }
    },
}
export default Mutation