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
        userName: Object.values(parsedToken)[0],
        expired: Date.now() - parsedToken["exp"] * 1000 > 0,
        isActive: Object.values(parsedToken)[2] === 'True',
        isUser: Object.values(parsedToken)[3].includes('User'),
        isManager: Object.values(parsedToken)[3].includes('Manager'),
        isAdmin: Object.values(parsedToken)[3].includes('Admin')
    };
}

const logOut = () => {
    sessionStorage.removeItem(token_key);

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