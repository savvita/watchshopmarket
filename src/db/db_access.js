import token from './token';

const api = 'https://localhost:7231/api';

const db_get = async (url) => {
    let results = {};
    await fetch(url, {
        method: 'get',
        headers: {
            'Authorization': "Bearer " + token.getToken()
        }
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }
        
        results = response;
    })
    .catch(() => {
        results = undefined;
    });

    return results;
}

const db_post = async (url, body) => {
    if(!body) {
        return undefined;
    }

    let results = {};
    await fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }
        
        results = response;
    })
    .catch(() => {
        results = undefined;
    });

    return results;
}

const db_put = async (url, body) => {
    if(!body) {
        return undefined;
    }

    let results = {};
    await fetch(url, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        },
        body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }
        
        results = response;
    })
    .catch(() => {
        results = undefined;
    });

    return results;
}

const db_remove = async (url) => {
    let results = {};
    await fetch(url, {
        method: 'delete',
        headers: {
            'Authorization': "Bearer " + token.getToken()
        }
    })
    .then(response => response.json())
    .then(response => {
        if(response.token) {
            token.setToken(response.token);
        }
        
        results = response;
    })
    .catch(() => {
        results = undefined;
    });

    return results;
}

const addArrayToQuery = (url, array, filterName) => {
    if(array) {
        for(let item of array) {
            url += `&${filterName}=${item.id}`;
        }
    }

    return url;
}

const getUrl = (page, perPage, model, brands, collections, styles, movementTypes, glassTypes, caseShapes, caseMaterials, strapTypes, caseColors, strapColors, dialColors, waterResistances, incrustationTypes, dialTypes, genders, minPrice, maxPrice, onSale, isTop) => {

    if(!page) {
        page = 1;
    }

    if(!perPage) {
        perPage = 10;
    }

    let url = `${api}/watches/page/${page}?perPage=${perPage}`;

    if(model) {
        url += `&model=${model}`;
    }

    url = addArrayToQuery(url, brands, 'brandIds');
    url = addArrayToQuery(url, collections, 'collectionIds');
    url = addArrayToQuery(url, styles, 'styleIds');
    url = addArrayToQuery(url, movementTypes, 'movementTypeIds');
    url = addArrayToQuery(url, glassTypes, 'glassTypeIds');
    url = addArrayToQuery(url, caseShapes, 'caseShapeIds');
    url = addArrayToQuery(url, caseMaterials, 'caseMaterialIds');
    url = addArrayToQuery(url, strapTypes, 'strapTypeIds');
    url = addArrayToQuery(url, caseColors, 'caseColorIds');
    url = addArrayToQuery(url, strapColors, 'strapColorIds');
    url = addArrayToQuery(url, dialColors, 'dialColorIds');
    url = addArrayToQuery(url, waterResistances, 'waterResistanceIds');
    url = addArrayToQuery(url, incrustationTypes, 'incrustationTypeIds');
    url = addArrayToQuery(url, dialTypes, 'dialTypeIds');
    url = addArrayToQuery(url, genders, 'genderIds');

    if(minPrice) {
        url += `&minPrice=${minPrice}`;
    }

    if(maxPrice) {
        url += `&maxPrice=${maxPrice}`;
    }

    if(onSale) {
        for(let item of onSale) {
            url += `&onSale=${item}`;
        }
    }

    if(isTop) {
        for(let item of isTop) {
            url += `&isTop=${item}`;
        }
    }

    return url;
}

const basic = function (url) {
    this.url = url;
    this.get = async function (id) {
        if(id) {
            return await db_get(`${this.url}/${id}`);
        }
    
        return await db_get(this.url);
    }

    this.update = async function (entity) {
        return await db_put(this.url, entity);
    }
    
    this.create = async function (entity) {
        return await db_post(this.url, entity);
    }
    
    this.remove = async function (id) {
        return await db_remove(`${this.url}/${id}`);
    }
}

const Brands = new basic(`${api}/brands`);
const Caseshapes = new basic(`${api}/caseshapes`);
const Collections = new basic(`${api}/collections`);

const Colors = new basic(`${api}/colors`);
Colors.get = async function (id, type) {
    if(!id && !type) {
        return await db_get(this.url);
    }

    if(!id || !type) {
        return undefined;
    }

    return await db_get(`${this.url}/${type}/${id}`);
}

const Countries = new basic(`${api}/countries`);
const DialTypes = new basic(`${api}/dialtypes`);
const Functions = new basic(`${api}/functions`);
const Genders = new basic(`${api}/genders`);
const GlassTypes = new basic(`${api}/glasstypes`);
const IncrustationTypes = new basic(`${api}/incrustationtypes`);

const Materials = new basic(`${api}/materials`);
Materials.get = async function (id, type) {
    if(!id && !type) {
        return await db_get(this.url);
    }

    if(!id || !type) {
        return undefined;
    }

    return await db_get(`${this.url}/${type}/${id}`);
}

const MovementTypes = new basic(`${api}/movementtypes`);

const Orders = new basic(`${api}/orders`);
Orders.getByUser = async function(id) {
    if(!id) {
        return undefined;
    }

    return await db_get(`${this.url}/user/${id}`);
}
Orders.getByManager = async function(id) {
    if(!id) {
        return undefined;
    }

    return await db_get(`${this.url}/manager/${id}`);
}
Orders.update = async function(id) {
    if(!id) {
        return undefined;
    }

    return await db_put(`${this.url}/${id}`, {});
}
Orders.create = async function() {
    if(!token.getToken()) {
        return undefined;
    }

    await db_post(this.url, {});
}

const StrapTypes = new basic(`${api}/straptypes`);
const Styles = new basic(`${api}/styles`);

const Users = new basic(`${api}/users`);
Users.create = () => {
    return undefined;
}
Users.restore = async function(id) {
    if(!id) {
        return undefined;
    }

    return await db_put(`${this.url}/restore/${id}`, {});
}

const Watches = new basic(`${api}/watches`);
Watches.getByFilters = async function (filters) {
    let url = getUrl(...filters);
    return await db_get(url);
}
Watches.restore = async function (id) {
    if(!id) {
        return undefined;
    }

    return await db_put(`${this.url}/restore/${id}`, {});
}

const WaterResistances = new basic(`${api}/waterresistances`);

const Basket = new basic(`${api}/baskets`);
Basket.get = async function() {
    if(!token.getToken()) {
        return undefined;
    }

    return await db_get(`${api}/baskets`);
}

Basket.create = function() {
    return undefined;
}

Basket.update = async function(basket) {
    if(!basket || !token.getToken()) {
        return undefined;
    }

    return await db_put(this.url, basket.details);
}

Basket.remove = async function() {
    if(!token.getToken()) {
        return undefined;
    }

    return await db_remove(this.url);
}

//========= Authorization ====================
const signIn = async (login, password) => {
    return await db_post(`${api}/auth`, { userName: login, password: password });
}

const signUp = async (login, email, password) => {
    return await db_post(`${api}/auth/user`, { userName: login, email: email, password: password });
}
//============================================


const functions = {
    signIn: signIn,
    signUp: signUp,
    Basket: Basket,
    Watches: Watches,
    WaterResistances: WaterResistances,
    Users: Users,
    StrapTypes: StrapTypes,
    Styles: Styles,
    Orders: Orders,
    MovementTypes: MovementTypes,
    Materials: Materials,
    Brands: Brands,
    Caseshapes: Caseshapes,
    Collections: Collections,
    Colors: Colors,
    Countries: Countries,
    DialTypes: DialTypes,
    Functions: Functions,
    Genders: Genders,
    GlassTypes: GlassTypes,
    IncrustationTypes: IncrustationTypes
};

export default functions;