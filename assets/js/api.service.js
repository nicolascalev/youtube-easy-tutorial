const api = axios.create({
    baseURL: 'https://covid-easyapp.herokuapp.com'
});

async function initApi() {
    // in case you need an interceptor on the request it goes here

    function initInterceptors() {
        api.interceptors.response.use(res => {
            return res;
        }, err => {
            var error;
            if (err.response) {
                if (err.response.data.details) {
                    error = err.response.data.details;
                } else {
                    error = err.response.data;
                }
            } else {
                error = err.message;
            }
            return Promise.reject(error);
        });
    }
    initInterceptors();
}
initApi();


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

    async replace(model, id, association, array) {
        const options = {
            headers: { 'content-type': 'text/plain' }
        }
        var array = `[${array.toString()}]`;
        try {
            var { data } = await api.put(`/${model}/${id}/${association}`, array, options);
            return data;
        } catch (err) {
            alert(err);
        }
    }
}
