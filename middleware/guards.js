const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../config.js");

// Make sure user logged in - works!
function ensureUserLoggedIn(req, res, next) {
    let token = _getToken(req);
    try {
        // checks if token if valid; continues if ok, throws error if not
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (err) {
        res.status(401).send({ error: 'Unauthorized' });
    }
}

// Make sure user is accessing their own profile page - works!
function ensureSameUser(req, res, next) {
    let token = _getToken(req);
    try {
        // check that token is ok (if not, will throw error)
        let payload = jwt.verify(token, SECRET_KEY);
        // if token is ok, check that user id matches
        if (payload.userId === Number(req.params.userId)) {
        // if okay, will proceed; else will throw error
            next();
        } else {
            res.status(403).send({ error: 'Forbidden' });
        }
    } catch(err) {
        res.status(401).send({ error: 'Unauthorized' });
    }
}

// Make sure the person accessing this resource is the owner of the shop
function ensureShopOwner(req, res, next) {
    let token = _getToken(req);
    try {
        // check that token is ok (if not, will throw error)
        let payload = jwt.verify(token, SECRET_KEY);
        // if token is ok, check that user id matches
        if (payload.userId === Number(req.params.userId)) {
        // if okay, will proceed; else will throw error
            next();
        } else {
            res.status(403).send({ error: 'Forbidden' });
        }
    } catch(err) {
        res.status(401).send({ error: 'Unauthorized' });
    }
}

// get JWT token if found, else return ''
function _getToken(req) {
    // Return '' if header not found
    if ( !('authorization' in req.headers) ) {
        return '';
    }

    // Split header into 'Bearer' and token
    let authHeader = req.headers['authorization'];
    let [str, token] = authHeader.split(' ');

    return (str === 'Bearer') ? token : '';
}


module.exports = {
    ensureUserLoggedIn,
    ensureSameUser
};