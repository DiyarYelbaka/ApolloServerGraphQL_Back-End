import { nanoid } from 'nanoid';
import { users, posts, comments } from "../../data.js";
import mongoose from 'mongoose';



const Mutation = {
    // User
    createUser: async(parent, args,{pubSub,_db}) => {
       // users.push(user)
       const newUser = new _db.User({
        ...args.data,
       })
       const user = await newUser.save()

        pubSub.publish('userCreated', user)
        

        return user
    },
    updateUser:async (parent, args,{pubSub,_db}) => {
        const is_user_exist = await _db.User.findById(args.id)

        if (!is_user_exist) {
            console.log('saaaaaaaaaaaaaaa')

            throw new Error('User not found')
        }
        const updated_user = await _db.User.findByIdAndUpdate(args.id,args.data,{
            new : true,
        })

        pubSub.publish('userUpdated', updated_user)

        return updated_user
    },
    deleteUser: async(parent, args,{pubSub,_db}) => {
        const is_user_exist = await _db.User.findById(args.id)

        if (!is_user_exist) {
            throw new Error('Users not found')
        }
        const deleted_user = await _db.User.findByIdAndDelete(args.id)
      

        pubSub.publish('userDeleted', deleted_user)

        return deleted_user
    },
    deleteAllUser: async(_,__,{_db}) => {
        const delete_users = await _db.User.deleteMany({})
        return {
            count: delete_users.deletedCount
        }
    },



    //Post
    createPost: async(parent, args,{pubSub,_db}) => {
     
        const newPost = new _db.Post({
            ...args.data,
         })
         const post = await newPost.save()

         const user = await _db.User.findById(new mongoose.Types.ObjectId(args.data.user))
         user.posts.push(post.id)
         user.save()

        pubSub.publish('postCreated', post)
        return post

    },
    updatePost: async (parent, args,{pubSub,_db}) => {
        const is_post_exist = await _db.Post.findById(args.id)
       
        if (!is_post_exist) {
            console.log('saaaaaaaaaaaaaaa')

            throw new Error('Post not found')
        }

        const updated_post = await _db.Post.findByIdAndUpdate(args.id,args.data,{
            new : true,
        })

        pubSub.publish('postUpdated', updated_post)

        return updated_post
    },
    deletePost: async(parent, args,{pubSub,_db}) => {
        const is_post_exist = await _db.Post.findById(args.id)

        if (!is_post_exist) {
            throw new Error('Post not found')
        }
        const deleted_post = await _db.Post.findByIdAndDelete(args.id)

        pubSub.publish('postDeleted', deleted_post)

        return deleted_post
    },
    deleteAllPosts:async (_,__,{_db}) => {
        const delete_posts = await _db.Post.deleteMany({})
        return {
            count: delete_posts.deletedCount
        }
    },

    //Comment
    createComment: async(parent, args,{pubSub,_db}) => {

        const newComment =  new _db.Comment({
            ...args.data
        });
        const comment= await newComment.save()

        const post = await _db.Post.findById(new mongoose.Types.ObjectId(args.data.post))
        const user = await _db.User.findById(new mongoose.Types.ObjectId(args.data.user))
        
        user.comments.push(comment.id);
        post.comments.push(comment.id)

        await user.save()
        await post.save()

        pubSub.publish('commentCreated', comment)
        return comment
    },
    updateComment: async(parent, args,{pubSub,_db}) => {
        const is_comment_exist = await _db.Comment.findById(args.id)
       
        if (!is_comment_exist) {
            console.log('saaaaaaaaaaaaaaa')

            throw new Error('Post not found')
        }

        const updated_comment = await _db.Comment.findByIdAndUpdate(args.id,args.data,{
            new : true,
        })

        pubSub.publish('commentUpdated', updated_comment)

        return updated_comment
    },

    deleteComment: async(parent, args,{pubSub,_db}) => {
        const is_comment_exist = await _db.Comment.findById(args.id)

        if (!is_comment_exist) {
            throw new Error('Post not found')
        }
        const deleted_comment = await _db.Comment.findByIdAndDelete(args.id)
        pubSub.publish('commentDeleted', deleted_comment)

        return deleted_comment

    },
    deleteAllComments: async (_,__,{_db}) => {
        const delete_comment = await _db.Comment.deleteMany({})
        return {
            count: delete_comment.deletedCount
        }
    },
}
export default Mutation