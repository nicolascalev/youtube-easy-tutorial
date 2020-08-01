var app = new Vue({
    el: '#app',
    data: {
        cases: 0,
        places: 0,
        casesLast24Hrs: 0,
        placesLast24Hrs: 0,
    },

    created() {
        this.loadStats()
    },

    methods: {
        async loadStats() {
            var res = await req.find('stats')
            this.cases = res.cases;
            this.places = res.places;
            this.casesLast24Hrs = res.casesLast24Hrs;
            this.placesLast24Hrs = res.placesLast24Hrs;
        }
    },
})