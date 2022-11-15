import Local from './Local.js';

class Api {
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
    static async getUser(userId) {
        return await this._doFetch(`/users/${userId}`);
    }

    // GET all shops
    static async getAllShops() {
        return await this._doFetch('/shops');
    }
    
    // GET shop by shop_id
    static async getShopProfile() {
        return await this._doFetch(`/shops/profile/${shop_id}`);
    }

    // GET shop by owner's user_id (PROTECTED)
    static async getUserShop(user_id) {
        return await this._doFetch(`/shops/${user_id}`);
    }

    // POST create new shop (PROTECTED)
    static async createShop() {
        return await this._doFetch(`/shops/new/${user_id}`);
    }

    // GET general private content (members-only access pages, etc.)
    static async getContent(url) {
        return await this._doFetch(url);
    }

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
}

export default Api;