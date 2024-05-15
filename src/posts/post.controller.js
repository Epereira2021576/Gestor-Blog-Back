import Post from './post.model.js';


export const createPost = async ( req, res ) => {
    try {
        const { postTitle, postDescription, postCode, authorName, image } = req.body;
        const post = new Post( { postTitle, postDescription, postCode, authorName, image } );
        await post.save();

        res.status( 201 ).json( post );
    } catch ( e ) {
        res.status( 500 ).json( `Error ${e}` );
    }
}

export const getPosts = async ( req, res ) => {
    try {
        const posts = await Post.find();
        if ( !posts ) {
            return res.status( 404 ).json( { error: 'Posts not found' } );
        }
        res.status( 200 ).json( posts );
    } catch ( e ) {
        res.status( 500 ).json( `Error ${e}` );
    }
}

export const deletePost = async ( req, res ) => {
    try {
        const { postId } = req.params;
        const post = await Post.findByIdAndDelete( postId, { new: true } );
        res.status( 200 ).send( post );
    } catch ( e ) {
        res.status( 500 ).json( `Error ${e}` );
    }
}

export const searchPost = async ( req, res ) => {
    try {
        const { postId } = req.params;

        const posts = await Post.find( { _id: postId } );
        res.status( 200 ).json( posts );
    } catch ( e ) {
        res.status( 500 ).json( `Error ${e}` );
    }
}

export const updatePost = async ( req, res ) => {
    try {
        const { postId } = req.params;

        const { title, description, code } = req.body;

        const updateFields = {};
        if ( title ) updateFields.title = title;
        if ( description ) updateFields.description = description;
        if ( code ) updateFields.code = code;

        const post = await Post.findByIdAndUpdate( postId, updateFields, { new: true } );

        res.status( 200 ).json( post );
    } catch ( e ) {
        res.status( 500 ).json( 'Error occured: ', e );
    }
}

export const createComment = async ( req, res ) => {
    try {
        const postId = req.params.postId;
        const { comment, commentAuthor } = req.body;

        const newComment = new Comment( {
            comment,
            commentAuthor,
            postId
        } );

        const savedComment = await newComment.save();

        res.status( 201 ).json( savedComment );
    } catch ( e ) {
        console.error( e )
        res.status( 500 ).json( 'Error adding comment: ', e );
    }
}

export const getComments = async ( req, res ) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find( { postId } );

        res.status( 200 ).json( comments );
    } catch ( e ) {
        console.error( e );
        res.status( 500 ).send( e );
    }
}

export const deleteComment = async ( req, res ) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findOne( { commentId } )
        if ( !comment ) {
            return res.status( 404 ).json( { error: 'Comment not found' } );
        }
        await Comment.findByIdAndDelete( commentId );
        res.status( 200 ).json( { message: 'Comment deleted' } );
    } catch ( e ) {
        res.status( 500 ).send( e );
    }
}



