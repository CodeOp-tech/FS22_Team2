// localStorage implementation

class Local {
    // save user's info to localStorage
    static saveUserInfo(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    // remove user's info from localStorage
    static removeUserInfo() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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

    // get current user info (if there is one) - QUESTION: besides string vs. null, how is this different from above?
    static getUserId() {
        let userjson = localStorage.getItem('user');
        if (!userjson) {
            return '';
        }

        let user = JSON.parse(userjson);
        return user.id;
    }

    static getUsername() {
        let userjson = localStorage.getItem('user');
        if (!userjson) {
            return '';
        }

        let user = JSON.parse(userjson);
        return user.username;
    }

}

export default Local;