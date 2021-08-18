const postsModel = require('../models/posts.model');
const userModel  = require('../models/user.model');

const createPost = async (req, res) => {
    if( !req.body.text ) return res.status(400).send({
        code: 101,
        message: 'Text is required',
    });

    const postObj = new postsModel({
        user_id : req.body.user._id,
        text    : req.body.text,
        hashtag : req.body.hashtag,
    });
    const result = await postObj.save();

    if( !result ) return res.response(400).send({
        code : 103,
        message: 'An error ocurred please try again',
    });

    return res.status(201).send({ data : postObj });
}

// TODO validar paginación
const getAllPosts = async( _, res ) => {
    const posts = await postsModel.find()
        .populate('user_id')
    return res.status(200).send( { data : posts } );
}

const getPostsByUserId = async ( req, res ) => {
    try {
        // Validar id usuario
        const user = await userModel.findById( req.params['id'] );
        if( !user ) return res.status(401).send({
            code: 105,
            message: 'You are not authorized for view posts of this user',
        });

        const posts = await postsModel.find( { user_id: user._id } );

        return res.status(200).send( { data: posts } );

    } catch(e) {
        console.log(`Posts controller getPostsByUserId error: ${e}`);
        return res.status(400).send({
            code: 104,
            message: 'An error ocurred. Please try again later',
        });

    }
}

module.exports = { createPost, getAllPosts, getPostsByUserId };
