var app = new Vue({
    el: '#app',

    data: {
        cases: [],
        name: '',
        statusFilter: '',
        selectedCase: null
    },

    created() {
        this.findCases();
    },

    methods: {
        async findCases() {
            var params = {
                limit: 100,
                sort: 'createdAt DESC',
                populate: false
            }
            var where = {
                or: [
                    { name: { contains: this.name } },
                    { status: this.statusFilter }
                ]
            }
            var cases = await req.find('case', params, where);
            if (!cases) return alert('No cases found 🙄');
            this.cases = cases;
        },

        async applyStatus(status) {
            this.statusFilter = status;
            if (status == '') return this.findCases();
            var params = {
                limit: 100,
                sort: 'createdAt DESC',
                populate: false
            }
            var where = { status }
            var cases = await req.find('case', params, where);
            if (!cases) return alert('No cases found 🙄');
            this.cases = cases;
        },

        showPlaces(cvcase) {
            this.selectedCase = { ...cvcase }
        }
    }
})