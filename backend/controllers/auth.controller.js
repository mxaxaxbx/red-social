const bcrypt    = require('bcrypt');
const userModel = require('../models/user.model');

const login = async (req, res) => {
    let user = await userModel.findOne( { email: req.body.email } );
    
    if( !user ) return res.status(401).send({
        code: 102,
        message: 'Invalid credentials',
    });

    const hash = await bcrypt.compare( req.body.password, user.password );

    if( !hash ) return res.status(401).send({
        code: 102,
        message: 'Invalid credentials',
    });

    try {
        const jwtToken = user.generateJWT();
        return res.status(200).send( { data: jwtToken } );
    } catch(e) {
        console.log(`Auth Controler Login Error: ${e}`);
        return res.status(400).send({
            code: 105,
            message: 'An error ocurred. Please try again later',
        });
    }
}

const register = async (req, res) => {
    try {
        if( !req.body.name || !req.body.email || !req.body.password ) return res.status(401).send({
            code : 101,
            message : 'complete all data',
        });
        
        const user = await userModel.findOne( { email : req.body.email } );
        // usuario ya está registrado
        if( user ) return res.status(401).send({
            code: 102,
            message: 'Invalid credentials',
        });
        
        const hash = await bcrypt.hash(req.body.password, 10);

        const userObj = new userModel({
            name     : req.body.name,
            email    : req.body.email,
            password : hash,
            status   : true
        });

        const result = userObj.save();
        if( !result ) return res.status(400).send({
            code: 103,
            message: 'An error ocurred please try again later',
        });

        return res.status(201).send({
            data : {
                email : userObj.email,
            }
        });

    } catch(e) {
        console.log(`Auth register error: ${e}`);
        return res.status(400).send({
            code: 104,
            message: 'An error ocurred please try again later'
        });
    }


}

module.exports = {login, register};
