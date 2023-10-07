const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if(token) {
        jwt.verify(token, req.app.get('api_secret_key'), (err,decoded) => {
            if(err) {
                res.json({
                    status :false,
                    message: 'FAİLED ! '
                });
            }else {
                req.decoded = decoded;
                next();
            }
        });
    }else{
        res.status(500).json({status : false , message: 'No Token provided'});
    }
}


