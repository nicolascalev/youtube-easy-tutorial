var app = new Vue({
    el: '#app',

    data: {
        places: [],
        name: '',
        selectedPlace: null
    },

    created() {
        this.findPlaces();
    },

    methods: {

        moment: moment,

        async findPlaces() {
            var params = {
                limit: 100,
                sort: 'createdAt DESC',
                populate: false
            }
            var where = {
                name: { contains: this.name },
            }
            var places = await req.find('place', params, where);
            if (!places || places.length == 0) return alert('No cases found 🙄');
            this.places = places;
        },

        showCases(place) {
            this.selectedPlace = { ...place }
        }
    }
})