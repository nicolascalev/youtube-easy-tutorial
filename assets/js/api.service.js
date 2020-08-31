const API_BASE_URL = 'https://covid-easyapp.herokuapp.com';

const api = axios.create({
    baseURL: API_BASE_URL
});

const auth = axios.create({
    baseURL: API_BASE_URL
})

async function initialize() {

    api.interceptors.request.use(config => {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken') || '';
        return config
    }, err => {
        return Promise.reject(err)
    })

    api.interceptors.response.use(res => {
        return res;
    }, err => {
        var error;
        error = err.message;
        if (_.get(err, 'err.response.data')) {
            error =  _.get(err, 'response.data.details');
            error = !error ? _.get(err, 'response.data.message') : error;
            error = !error ? JSON.stringify(_.get(err, 'response.data'), undefined, 2) : error;
            if (err.response.status == 401) return authreq.reloadAccessToken();
        }
        return Promise.reject(error);
    });
}

var authreq = {
    async reloadAccessToken() {
        try {
            var params = {
                headers: { 'authorization': `Bearer ${localStorage.getItem('refreshToken')}` }
            }
            var { data } = await auth.put('/getAccessToken', {}, params);
            localStorage.setItem('accessToken', data.accessToken);
            alert('Try request again')
        } catch (err) {
            alert(err.message)
        }
    },

    async login(formData) {
        try {
            var { data } = await auth.put('/login', formData);
            return data;
        } catch (err) {
            alert(err)
        }
    },

    async signup(formData) {
        try {
            var { data } = await auth.post('/signup', formData)
            return data
        } catch (err) {
            console.log('from api service', err)
            alert(err)
        }
    },

    logout() {
        var confirmed = confirm('Sure you want to logout?')
        if (!confirmed) return;
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location = 'login.html'
    }
}

var req = {

    async findOne(model, id, params = {}) {
        try {
            var { data } = await api.get(`/${model}/${id}`, { params });
            return data;
        } catch (err) {
            alert(err);
        }
    },

    async find(model, params = {}, where = {}) {
        try {
            params.where = JSON.stringify(where);
            var { data } = await api.get(`/${model}`, { params });
            return data;
        } catch (err) {
            alert(err);
        }
    },

    async create(model, formData) {
        try {
            var { data } = await api.post(`/${model}`, formData);
            return data;
        } catch (err) {
            alert(err);
        }
    },

    async destroy(model, id) {
        try {
            var { data } = await api.delete(`/${model}/${id}`);
            return data;
        } catch (err) {
            alert(err);
        }
    },

    async update(model, id, formData) {
        try {
            var { data } = await api.patch(`/${model}/${id}`, formData);
            return data;
        } catch (err) {
            alert(err)
        }
    },

    async replace(model, id, association, array) {
        const options = {
            headers: { 'content-type': 'application/json' }
        }
        var list = JSON.stringify({
            places: array.toString()
        });

        try {
            var { data } = await api.patch(`/${model}/${id}/${association}`, list, options);
            return data;
        } catch (err) {
            alert(err);
        }
    },
}

initialize();