const token_key = 'token'; 

const setToken = (token) => {
    localStorage.setItem(token_key, token);
}

const getToken = () => {
    return localStorage.getItem(token_key);
}

const getUserInfo = () => {
    const token = getToken();
    
    if(!token) {
        return {
            userName: '',
            expired: true,
            isUser: false,
            isManager: false,
            isAdmin: false,
            isActive: false
        };
    }
    const parsedToken = parseJwt(token);

    return {
        userName: parsedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        expired: Date.now() - parsedToken["exp"] * 1000 > 0,
        isActive: parsedToken["IsActive"] ? parsedToken["IsActive"].toLowerCase() === 'true' : false,
        isUser: parsedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('User'),
        isManager: parsedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Manager'),
        isAdmin: parsedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes('Admin')
    };
}

const logOut = () => {
    localStorage.removeItem(token_key);

    return {
        username: '',
        isUser: false,
        isManager: false,
        isAdmin: false
    };
}

function parseJwt (token) {
    if(!token) {
        return undefined;
    }

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const functions = {
    setToken: setToken,
    getToken: getToken,
    getUserInfo: getUserInfo,
    logOut: logOut
};

export default functions;