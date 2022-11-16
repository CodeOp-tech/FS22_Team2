// localStorage implementation

class Local {
    /****** USER INFO *****/
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
        localStorage.removeItem('shop'); // added
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
    
    /****** SHOP INFO *****/
    // get current user's shop info (if there is one logged in/saved in localStorage)
    static getShop() {
        let shopjson = localStorage.getItem('shop');
        return shopjson ? JSON.parse(shopjson) : null;
    }

    // get current shop id
    static getShopId() {
        let shopjson = localStorage.getItem('shop');
        if (!shopjson) {
            return '';
        }
    
        let shop = JSON.parse(shopjson);
        return shop.shop_id;
    }

    // get current shop id
    static getShopId() {
        let shopjson = localStorage.getItem('shop');
        if (!shopjson) {
            return '';
        }
        
        let shop = JSON.parse(shopjson);
        return shop.shop_id;
    }

}

export default Local;