var app = new Vue({
    el: '#app',

    data: {
        cases: [],
        name: '',
    },

    created() {
        findCases();
    },

    methods: {
        async findCases() {
            var params = {
                limit: 100,
                sort: 'createdAt DESC',
                populate: false
            }
            var where = {
                name: { includes: this.name }
            }
            var cases = await req.find('case', params, where);
            if(!cases) return alert('No cases found 🙄');
            this.cases = cases;
        }
    }
})