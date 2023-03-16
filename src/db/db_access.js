import token from './token';

const api = 'https://localhost:7231/api';
//const api = 'https://watchwebapi20230228182952.azurewebsites.net/api';

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
            url += `&${filterName}=${item}`;
        }
    }

    return url;
}

const getUrl = (filters) => {

    if(!filters.page) {
        filters.page = 1;
    }

    if(!filters.perPage) {
        filters.perPage = 10;
    }

    let url = `${api}/watches/page/${filters.page}?perPage=${filters.perPage}`;

    if(filters.model) {
        url += `&model=${filters.model}`;
    }

    url = addArrayToQuery(url, filters.brands, 'brandIds');
    url = addArrayToQuery(url, filters.collections, 'collectionIds');
    url = addArrayToQuery(url, filters.styles, 'styleIds');
    url = addArrayToQuery(url, filters.movementTypes, 'movementTypeIds');
    url = addArrayToQuery(url, filters.glassTypes, 'glassTypeIds');
    url = addArrayToQuery(url, filters.caseShapes, 'caseShapeIds');
    url = addArrayToQuery(url, filters.caseMaterials, 'caseMaterialIds');
    url = addArrayToQuery(url, filters.strapTypes, 'strapTypeIds');
    url = addArrayToQuery(url, filters.caseColors, 'caseColorIds');
    url = addArrayToQuery(url, filters.strapColors, 'strapColorIds');
    url = addArrayToQuery(url, filters.dialColors, 'dialColorIds');
    url = addArrayToQuery(url, filters.waterResistances, 'waterResistanceIds');
    url = addArrayToQuery(url, filters.incrustationTypes, 'incrustationTypeIds');
    url = addArrayToQuery(url, filters.dialTypes, 'dialTypeIds');
    url = addArrayToQuery(url, filters.genders, 'genderIds');

    if(filters.minPrice) {
        url += `&minPrice=${filters.minPrice}`;
    }

    if(filters.maxPrice) {
        url += `&maxPrice=${filters.maxPrice}`;
    }

    if(filters.onSale) {
        for(let item of filters.onSale) {
            url += `&onSale=${item}`;
        }
    }

    if(filters.isTop) {
        for(let item of filters.isTop) {
            url += `&isTop=${item}`;
        }
    }

    return url;
}

const db_uploadFiles = async (url, files) => {
    if(!files) {
        return undefined;
    }

    let results = {};
    const formData = new FormData();
    formData.append('title', 'files');

    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }
    
    await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + token.getToken()
        },
        body: formData
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

const Files = function() {
    this.upload = async function (files) {
        return await db_uploadFiles(`${api}/files`, files);
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

const Orders = function() {
    basic.call(this, `${api}/orders`);
    this.getByUser = async function(id) {
        if(!id) {
            return undefined;
        }
    
        return await db_get(`${this.url}/user/${id}`);
    }
    this.getByManager = async function(id) {
        if(!id) {
            return undefined;
        }
    
        return await db_get(`${this.url}/manager/${id}`);
    }
    this.update = async function(id) {
        if(!id) {
            return undefined;
        }
    
        return await db_put(`${this.url}/${id}`, {});
    }
    this.create = async function(info) {
        if(!token.getToken() || !info) {
            return undefined;
        }
    
        await db_post(this.url, info);
    }
}

const StrapTypes = new basic(`${api}/straptypes`);
const Styles = new basic(`${api}/styles`);

const Users = function() {
    basic.call(this, `${api}/users`);
    this.create = function() {
        return undefined;
    }
    this.restore = async function(id) {
        if(!id) {
            return undefined;
        }
    
        return await db_put(`${this.url}/restore/${id}`, {});
    }
}

const Payments = function() {
    basic.call(this, `${api}/payments`);
    this.getAll = async function() {
        return await db_get(`${this.url}?all=true`);
    }
}

const Deliveries = function() {
    basic.call(this, `${api}/deliveries`);
    this.getAll = async function() {
        return await db_get(`${this.url}?all=true`);
    }
}

const Watches = function() {
    basic.call(this, `${api}/watches`);
    this.getByFilters = async function (filters) {
        let url = getUrl(filters);
        return await db_get(url);
    }
    this.restore = async function (id) {
        if(!id) {
            return undefined;
        }
    
        return await db_put(`${this.url}/restore/${id}`, {});
    }
}

const WaterResistances = new basic(`${api}/waterresistances`);

const Basket = function() {
    basic.call(this, `${api}/baskets`);
    this.get = async function() {
        if(!token.getToken()) {
            return undefined;
        }
    
        return await db_get(`${api}/baskets`);
    }

    this.create = function() {
        return undefined;
    }

    this.update = async function(basket) {
        if(!basket || !token.getToken()) {
            return undefined;
        }
    
        return await db_put(this.url, basket.details);
    }

    this.remove = async function() {
        if(!token.getToken()) {
            return undefined;
        }
    
        return await db_remove(this.url);
    }
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
    Basket: new Basket(),
    Watches: new Watches(),
    WaterResistances: WaterResistances,
    Users: new Users(),
    Payments: new Payments(),
    Deliveries: new Deliveries(),
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
    IncrustationTypes: IncrustationTypes,
    Files: new Files()
};

export default functions;