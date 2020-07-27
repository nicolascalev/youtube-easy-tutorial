var app = new Vue({
    el: '#app',

    data: {
        userId: undefined,
        username: undefined,
        loading: false,
        ownPlaces: [],
        notOwnedPlaces: []
    },

    created() {
        this.verifySession()
        this.loadOwnPlaces()
    },

    methods: {
        verifySession() {
            const userId = localStorage.getItem('userId')
            const username = localStorage.getItem('username')
            if (!userId || !username) {
                return window.location = 'login.html'
            }
            this.userId = Number(userId);
            this.username = username;
        },

        async loadOwnPlaces() {
            this.loading = true;
            let params = {
                select: 'id'
            }
            var { places } = await req.findOne('case', this.userId, params)
            this.loading = false;
            this.ownPlaces = places;
            await this.loadNotOwnedPlaces();
        },

        async loadNotOwnedPlaces() {
            var nin = _.map(this.ownPlaces, 'id');
            var params = {
                sort: 'createdAt DESC',
                populate: false
            }
            var where = {
                id: { nin }
            }
            this.loading = true;
            var places = await req.find('place', params, where)
            this.loading = false;
            this.notOwnedPlaces = places;
        }
    },
})