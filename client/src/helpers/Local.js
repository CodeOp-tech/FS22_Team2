/**
 * All localStorage implementation is here
 * // NOTE: localStorage will last until deleted (even if browser/computer closed) versus sessionStorage
 **/

 class Local {

    static getShop() {
        let userjson = localStorage.getItem("user");
        if (!userjson) {
            return "";
        }

        let user = JSON.parse(userjson);
        return user.shop_id; // shop_id as defined in users table
    }

}

export default Local;