import Local from "./Local.js";

class Api {
    //_doFetch method - internal use only, to user in other functions
     static async _doFetch(url, method = 'GET', body = null) {
        // prep fetch options
        let options = {
            method,
            headers: {}
        }

        // add token to headers if it exists in localStorage
        let token = Local.getToken();
        if(token) {
            options.headers['authorization'] = `Bearer ${token}`;
        }

        // add body if it is supplied
        if (body) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        // do fetch and store results in myresponse object
        let myresponse = { 
            ok: false, 
            data: null,
            status: 0,
            error: ''
        };

        try {
            let response = await fetch(url, options);
            if (response.ok) {
                myresponse.ok = true;
                myresponse.data = await response.json();
                myresponse.status = response.status;
            } else {
                myresponse.status = response.status;
                myresponse.error = response.statusText;
            }
        } catch (err) {
        myresponse.error = err.message;
        }
        return myresponse;
    }

    /******* USER FETCHES *******/

    // Register a new user
    // NOTE: removed has_shop to test; add back in later
    static async registerUser(username, password, email, has_shop) {
        let body = { username, password, email, has_shop };

        return await this._doFetch('/register', 'POST', body);
    }
    
    // Log in a user
    static async loginUser(username, password) {
        let body = { username, password };

        return await this._doFetch('/login', 'POST', body);
    }

    // GET all users
    static async getUsers() {
        return await this._doFetch('/users');
    }

    // GET user by id (PROTECTED)
    static async getUser(user_id) {
        return await this._doFetch(`/users/${user_id}`);
    }
    
    // GET general private content (members-only access pages, etc.) - NOT USED
    // static async getContent(url) {
    //     return await this._doFetch(url);
    // }

    // PUT add user_points
    static async addUserPoints(user_id) {
        return await this._doFetch(`/users/points/${user_id}`, 'PUT');
    }

    /******* SHOP FETCHES *******/

    // EDIT/PUT shop info (PROTECTED)
    static async updateShop(shopData, shop_id) {
        let body = { shopData }
        return await this._doFetch(`/shops/edit/${shop_id}`, 'PUT', body);
    }
    
    // GET all shops
    static async getAllShops() {
        return await this._doFetch('/shops');
    }
    
    // GET shop by shop_id
    static async getShopProfile(shop_id) {
        return await this._doFetch(`/shops/profile/${shop_id}`);
    }

    // GET shop by owner's user_id (PROTECTED)
    static async getUserShop(user_id) {
        return await this._doFetch(`/shops/${user_id}`);
    }

    // POST create new shop (PROTECTED)
    // static async createShop(user_id) {
    //     return await this._doFetch(`/shops/new/${user_id}`);
    // } 

    /******* PRODUCT FETCHES *******/

    // GET products by shop
    static async getProductsByShop(shop_id) {
        return await this._doFetch(`/products/${shop_id}`);
    }

    // EDIT/PUT product quantity
    static async updateQuantity(product_id, product_quantity) {
        let body = { product_quantity }
        return await this._doFetch(`/products/${product_id}`, 'PUT', body);
    }

    // ADD/POST products 
    static async addProducts(formData, shop_id) {
        let body = {formData};
        return await this._doFetch(`/products/${shop_id}`, 'POST', body);
    }
    
    // ADD/POST purchases 
     static async addPurchases(purchase_sum, user_id) {
        let body = {purchase_sum, user_id };

        return await this._doFetch('/purchases', 'POST', body);
    }

    // ADD/POST purchased_items
    static async addPurchasedItems(purchaseId, cartProducts) { // items is an array 
        let body = {purchaseId, cartProducts };

        return await this._doFetch('/purchaseditems', 'POST', body);
    }

    // GET purchased items
    static async getPurchasedItems() {
        return await this._doFetch('/purchaseditems');
    }

    // GET purchased items by user id
    static async getPurchasedItemsByUser(user_id) {
        return await this._doFetch(`/purchaseditems/${user_id}`);
    }

    // GET purchased items by shop id
    static async getPurchasedItemsByShop(shop_id) {
        return await this._doFetch(`/purchaseditems/shops/${shop_id}`);
    }

    /******* REVIEWS FETCHES *******/

    // GET all reviews
    // static async getReviews() {
    //     return await this._doFetch(`/reviews`);
    // }

    // GET reviews by product
    static async getProductReviews(product_id) {
        return await this._doFetch(`/reviews/${product_id}`);
    }

    // ADD/POST reviews
    static async addReview(newReview, product_id, user_id) {
        let body = {newReview, product_id, user_id };        

        return await this._doFetch(`/reviews`, 'POST', body);
    }
}

export default Api;
