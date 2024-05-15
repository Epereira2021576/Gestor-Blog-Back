import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema( {
    comment: {
        type: String,
        required: true
    },
    commentAuthor: {
        type: String,
        required: true
    },
    commentDate: {
        type: Date,
        default: Date.now
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }


}
);
const Comment = mongoose.model( 'Comment', commentSchema )

const postSchema = new mongoose.Schema( {
    postTitle: {
        type: String,
        required: true
    },

    postDescription: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    postCode: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now
    },

} );

const Post = mongoose.model( 'Post', postSchema );

export default Post;


