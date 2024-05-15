import Post from '../posts/post.model.js'

export const postExistByID = async ( id ) => {
    const post = await Post.findById( id );
    if ( !post ) {
        throw new Error( `The post with id ${id} does not exist` );
    }
}