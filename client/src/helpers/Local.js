// localStorage implementation
// every browser has, and where all cookies/storage are saved (Application -> Local Storage)

class Local {
    /****** USER INFO *****/
    // save user's info to localStorage (for login)
    static saveUserInfo(token, user, shop) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('shop', JSON.stringify(shop));
    }

    // remove user's info from localStorage (for logout)
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

    // get current user's id
    static getUserId() {
        let userjson = localStorage.getItem('user');
        if (!userjson) {
            return '';
        }

        let user = JSON.parse(userjson);
        return user.user_id;
    }

    // get current user's points
    static getUserPoints() {
        let userjson = localStorage.getItem('user');
        if (!userjson) {
            return '';
        }

        let user = JSON.parse(userjson);
        return user.user_points;
    }

    // reset user data
    static updateUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
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

    /****** CART *****/
    // get total amount in cart, save total
    static saveTotal(amount) {
        localStorage.setItem('amount', amount);
    }

    // get total that is stored in Local Storage
    static getTotal() {
        let totalAmountjson = localStorage.getItem('amount');
        if (!totalAmountjson) {
            return '';
        }

        let totalAmount = JSON.parse(totalAmountjson);
        return totalAmount; // since only one parameter (and not an object being stored)
    }

    // save array of cart products
    static saveCartProducts(cartProducts) {
        // need to stringify the cartProducts array
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }

    // get array of cartProducts stored in Local Storage
    static getCartProducts() {
        // default empty array if getItem returns null because no cartProducts stored
        let cartProductsjson = localStorage.getItem('cartProducts' || '[]');
        if (!cartProductsjson) {
            return '';
        }

        let cartProducts = JSON.parse(cartProductsjson);
        return cartProducts; // since only one parameter (and not an object being stored)
    }
}

export default Local;