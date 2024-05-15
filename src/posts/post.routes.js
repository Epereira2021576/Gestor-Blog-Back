import { Router } from 'express';
import { check } from 'express-validator';
import { createPost, deletePost, getPosts, searchPost, updatePost, createComment, getComments, deleteComment } from './post.controller.js';
import { validateFields } from '../middlewares/validateField.js';
import { postExistByID } from '../helpers/validatePost.js';


const router = Router();


router.post( '/',
    [
        check( "postTitle", "This field is required" ).notEmpty(),
        check( "postDescription", "This field is required" ).notEmpty(),
        check( "postCode", "This field is required" ).notEmpty(),
        validateFields,
    ], createPost );


router.get( '/', getPosts );

router.get( '/:postId',
    [
        check( "postId", "The id is not a valid MongoDB format" ).isMongoId(),
        check( "postId" ).custom( postExistByID ),
        validateFields
    ], searchPost );

router.put( '/:postId',
    [
        check( "postId", "The id is not a valid MongoDB format" ).isMongoId(),
        check( "postId" ).custom( postExistByID ),
        validateFields
    ], updatePost );
router.delete( '/:postId',
    [
        check( "postId", "The id is not a valid MongoDB format" ).isMongoId(),
        check( "postId" ).custom( postExistByID ),
        validateFields
    ], deletePost );

router.post( '/:postId/comment',
    [
        check( "comment", "This field is required" ).notEmpty(),
        check( "commentAuthor", "This field is required" ).notEmpty(),
        validateFields
    ], createComment );

router.get( '/:postId/comment', getComments );



export default router;