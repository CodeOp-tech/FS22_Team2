import Local from './Local.js';

class Api {
     // _doFetch method - internal use only, to user in other functions
     static async _doFetch(url, method = 'GET', body = null) {
        // prep fetch options
        let options = {
            method,
            headers: {}
        }

        // add token to headers if it exists in localStorage
        let token = Local.getToken();
        if(token) {
            options.headers['Authorization'] = `Bearer ${token}`;
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

    // Log in a user
    static async loginUser(username, password) {
        let body = { username, password };

        return await this._doFetch('/login', 'POST', body);
    }

    // GET all users
    static async getUsers() {
        return await this._doFetch('/users');
    }

    // GET user by id
    static async getUser(userId) {
        return await this._doFetch(`/users/${userId}`);
    }

    // GET general private content (members-only access pages, etc.)
    static async getContent(url) {
        return await this._doFetch(url);
    }

    // EDIT/PUT product quantity
    static async updateQuantity(product_id, product_quantity) {
        let body = { product_quantity }
        return await this._doFetch(`/products/${product_id}`, 'PUT', body);
    }

     // ADD/POST purchases 
     static async addPurchases(purchase_sum, purchase_points, user_id) {
        let body = {purchase_sum, purchase_points, user_id };

        return await this._doFetch('/purchases', 'POST', body);
    }

    // ADD/POST purchased_items
    static async addPurchasedItems(purchase_quantity, purchase_id, product_id, shop_id) {
        let body = {purchase_quantity, purchase_id, product_id, shop_id };

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

}

export default Api;