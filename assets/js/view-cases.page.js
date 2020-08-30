var app = new Vue({
    el: '#app',

    data: {
        loading: false,
        loadingPlaces: false,
        cases: [],
        name: '',
        statusFilter: '',
        selectedCase: null,
        casePlaces: []
    },

    created() {
        this.findCases();
        this.debFindCases = _.debounce(this.findCases, 1000)
    },

    methods: {

        moment: moment,

        async findCases() {
            this.loading = true;
            var params = {
                limit: 100,
                sort: 'createdAt DESC',
                omit: 'username, password',
                populate: false
            }
            var where = {
                name: { contains: this.name },
            }
            if (this.statusFilter != '') {
                where.status = this.statusFilter
            }
            var cases = await req.find('case', params, where);
            this.loading = false;
            if (!cases || cases.length == 0) return alert('No cases found 🙄');
            this.cases = cases;
        },

        async applyStatus(status) {
            this.loading = true;
            this.statusFilter = status;
            if (status == '') return this.findCases();
            var params = {
                limit: 100,
                sort: 'createdAt DESC',
                populate: false
            }
            var where = { status }
            var cases = await req.find('case', params, where);
            this.loading = false;
            if (!cases) return alert('No cases found 🙄');
            this.cases = cases;
        },

        async showPlaces(cvcase) {
            this.loadingPlaces = true;
            this.selectedCase = { ...cvcase }
            var res = await req.findOne('case', cvcase.id);
            this.casePlaces = res.places;
            this.loadingPlaces = false;
        },

        closeModal() {
            this.selectedCase = null;
            this.casePlaces = [];
        }
    }
})