exports.checkToken = function(req, res, next) {
    const jwt = require('jsonwebtoken');
    const PRIVATE_SECRET_KEY = 'TalkingCampusKey';

    const token = req.headers['x-access-token'];
    if (token == null) {
        console.log("no token")
        res.sendStatus(403)
    }
    jwt.verify(token, PRIVATE_SECRET_KEY, (err, info) => {
        if(err) {
            res.sendStatus(403);
        } else {
            if (req.params.id == info.payload) {
                next()
            } else {
                res.sendStatus(403);
            }
        }
    })
}
