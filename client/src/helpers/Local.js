// localStorage implementation

class Local {
    // save user's info to localStorage
    static saveUserInfo(token, user, shop) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('shop', JSON.stringify(shop));
    }

    // remove user's info from localStorage
    static removeUserInfo() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userShop'); // added
    }

    // get current token
    static getToken() {
        return localStorage.getItem('token' || '');
    }

    // get current user info (if there is one logged in/saved in localStorage)
    static getUser() {
        let userjson = localStorage.getItem('user');
        return userjson ? JSON.parse(userjson) : null;
    }

    // get current user Id
    static getUserId() {
        let userjson = localStorage.getItem('user');
        if (!userjson) {
            return '';
        }

        let user = JSON.parse(userjson);
        return user.user_id;
    }

    static getUsername() {
        let userjson = localStorage.getItem('user');
        if (!userjson) {
            return '';
        }

        let user = JSON.parse(userjson);
        return user.username;
    }

    // if user has a shop, save it to localStorage
    // QUESTION: getUserShop returns a combined object including user & shop info - can we set that whole thing as user info? Do we need to separate? If so, how?
    static saveUserShop(shop) {
        // localStorage.setItem('token', token);
        // localStorage.setItem('user', JSON.stringify(user));
    }
    
    // get current user's shop info (if there is one logged in/saved in localStorage)
    static getUserShop() {
        let shopjson = localStorage.getItem('userShop');
        return shopjson ? JSON.parse(shopjson) : null;
    }

}

export default Local;