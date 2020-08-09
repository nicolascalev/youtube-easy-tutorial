var app = new Vue({
    el: '#app',

    data: {
        loading: false,
        loadingCases: false,
        places: [],
        name: '',
        selectedPlace: null,
        placeCases: []
    },

    created() {
        this.findPlaces();
        this.debFindPlaces = _.debounce(this.findPlaces,1000)
    },

    methods: {

        moment: moment,

        async findPlaces() {
            this.loading = true;
            var params = {
                limit: 100,
                sort: 'createdAt DESC',
                populate: false
            }
            var where = {
                name: { contains: this.name },
            }
            var places = await req.find('place', params, where);
            this.loading = false;
            if (!places || places.length == 0) return alert('No cases found 🙄');
            this.places = places;
        },

        async showCases(place) {
            this.loadingCases = true;
            this.selectedPlace = { ...place }
            var res = await req.findOne('place', place.id);
            this.placeCases = res.cases;
            this.loadingCases = false;
        },

        closeModal() {
            this.selectedPlace = null;
            this.placeCases = [];
        }
    }
})