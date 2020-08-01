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
            var res = await authreq.login(this.formData);
            this.loading = false;
            if(!res) return alert('Could not login.')
            localStorage.setItem('accessToken', res.accessToken)
            localStorage.setItem('refreshToken', res.refreshToken)
            localStorage.setItem('userId', res.cvcase.id)
            localStorage.setItem('username', res.cvcase.username)
            window.location = 'me.html';
        }
    }
})