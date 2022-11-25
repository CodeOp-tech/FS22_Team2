const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../config.js");

// Make sure user logged in 
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

// Make sure user is accessing their own profile page 
function ensureSameUser(req, res, next) {
    let token = _getToken(req);
    console.log("token",token);
    try {
        // check that token is ok (if not, will throw error)
        let payload = jwt.verify(token, SECRET_KEY);
        // if token is ok, check that user id matches
        if (payload.userId === Number(req.params.user_id)) {
        // if okay, will proceed; else will throw error
            next();
        } else {
            res.status(403).send({ error: 'Forbidden' });
        }
    } catch(err) {
        res.status(401).send({ error: 'Unauthorized' });
    }
}

// Make sure user is accessing their own shop
function ensureShopOwner(req, res, next) {
    let token = _getToken(req);
    try {
        // check that token is ok (if not, will throw error)
        let payload = jwt.verify(token, SECRET_KEY);
        // if token is ok, check that shopId matches req params
        if (payload.shopId === Number(req.params.shop_id)) {
            // if okay, proceed with the function
            next();
        } else {
            // if payload doesn't match params, it's the wrong user
            res.status(403).send({ error: 'Forbidden' });
        }
    } catch(err) {
        // if some other problem, we can't verify the user
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
    ensureSameUser,
    ensureShopOwner
};