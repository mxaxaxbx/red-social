const userModel = require('../models/user.model');

const user = async (req, res, next) => {
    const user = await userModel.findById( req.body.user._id );

    if( !user ) return res.status(400).send({
        code: 101,
        message: 'Invaliduser',
    });

    next();
}

module.exports = user;
