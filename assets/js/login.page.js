var app = new Vue({
    el: '#app',
    data: {
        loading: false,
        formData: {
            username: '',
            password: ''
        }
    },

    methods: {
        async submitLoginForm(e) {
            e.preventDefault();
            this.loading = true;
            var res = await req.login(this.formData);
            this.loading = false;
            if(!res) return alert('Could not login.')
            localStorage.setItem('userId', res.id)
            localStorage.setItem('username', res.username)
            window.location = 'me.html';
        }
    }
})