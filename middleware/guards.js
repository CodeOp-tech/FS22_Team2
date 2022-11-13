// testing out JSON Web Token
const jwt = require('jsonwebtoken');
const SECRET_KEY = require("../config.js");

// Make sure user logged in
function ensureUserLoggedIn(req, res, next) {
    let token = _getToken(req);

    try {
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (err) {
        res.status(401).send({ error: 'Unauthorized' });
    }
}

// Make sure user is accessing their own profile page
function ensureSameUser(req, res, next) {
    let token = _getToken(req);
    try {
        let payload = jwt.verify(token, SECRET_KEY);
        if (payload.user-id === Number(req.params.user-id)) {
            next();
        } else {
            res.status(403).send({ error: 'Forbidden' });
        }
    } catch(err) {
        res.status(401).send({ error: 'Unauthorized' });
    }
}