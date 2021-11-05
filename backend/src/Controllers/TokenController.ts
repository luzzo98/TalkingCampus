exports.checkToken = function(req, res, next) {
    const jwt = require('jsonwebtoken');
    const PRIVATE_SECRET_KEY = 'TalkingCampusKey';

    const token = req.headers['x-access-token'];
    if (token == null) {
        res.sendStatus(403)
    }
    jwt.verify(token, PRIVATE_SECRET_KEY, (err, info) => {
        if(err){
            res.sendStatus(403);
        } else {
            console.log("INFO ->", info)
            console.log(req.params)
            console.log(req.params.id)
            if (req.params.id == info.user.email) {
                next()
            } else {
                res.sendStatus(403);
            }
        }
    })
}
