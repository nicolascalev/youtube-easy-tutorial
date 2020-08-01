var app = new Vue({
    el: '#app',

    data: {
        userId: undefined,
        username: undefined,
        me: null,
        loading: false,
        ownPlaces: [],
        notOwnedPlaces: [],
        checkedPlaces: [],

        addPlaceModal: false,
        placeFormData: {
            name: ''
        }
    },

    created() {
        this.verifySession()
        if (this.userId && this.username) {
            this.loadUserInfo();
            this.loadOwnPlaces()
        }
    },

    methods: {

        moment: moment,

        verifySession() {
            const userId = localStorage.getItem('userId')
            const username = localStorage.getItem('username')
            if (!userId || !username) {
                return window.location = 'login.html'
            }
            this.userId = Number(userId);
            this.username = username;
        },

        async loadUserInfo() {
            var params = {
                populate: false,
                omit: 'password'
            }
            this.loading = true;
            this.me = await req.findOne('case', this.userId, params);
            this.loading = false;
        },

        async loadOwnPlaces() {
            this.loading = true;
            let params = {
                select: 'id'
            }
            var { places } = await req.findOne('case', this.userId, params)
            this.loading = false;
            this.ownPlaces = places;
            this.checkedPlaces = _.map(places, 'id')
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
        },

        async updateStatus(status) {
            this.loading = true;
            var formData = new FormData();
            formData.append('status', status);
            var res = await req.update('case', this.userId, formData);
            this.loading = false;
            if(!res) return alert(`Sorry, we can't update your status right now`);
            this.me.status = res.status;
            alert('Status updated.')
        },

        async addPlace() {
            var formData = new FormData();
            formData.append('name', this.placeFormData.name);
            this.addPlaceModal = false;
            this.loading = true;
            var res = await req.create('place', formData);
            if (!res) return alert('Sorry we could not add a place this time')
            this.loading = false;
            alert('You just added a place!')
            this.notOwnedPlaces.unshift(res);
        },

        async replacePlaces() {
            var confirmed = confirm('Sure you want to update your places?');
            if(!confirmed) return;
            this.loading = true;
            var res = await req.replace('case', this.userId, 'places', this.checkedPlaces);
            this.loading = false;
            if(!res) return alert('We could not update your places this time 😢')
            alert('Your places were updated');
        },

        async logout() {
            authreq.logout()
        }
    },
})