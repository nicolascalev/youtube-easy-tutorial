var app = new Vue({
    el: '#app',
    data: {
        loading: false,
        formData: {
            username: '',
            password: ''
        },

        showSignUpModal: false,
        formErrors: [],
        signUp: {
            username: '',
            password: '',
            name: '',
            confirmPassword: '',
        }
    },

    created() {
        this.debCheckUsernameAvailable = _.debounce(this.checkUsernameAvailable, 1000)
    },

    methods: {
        async submitLoginForm(e) {
            e.preventDefault();
            this.loading = true;
            var res = await authreq.login(this.formData);
            this.loading = false;
            if (!res) return alert('Could not login.')
            localStorage.setItem('accessToken', res.accessToken)
            localStorage.setItem('refreshToken', res.refreshToken)
            localStorage.setItem('userId', res.cvcase.id)
            localStorage.setItem('username', res.cvcase.username)
            window.location = 'me.html';
        },

        async submitSignUpForm(e) {
            e.preventDefault();
            if (this.formErrors.length > 0) return alert('Fix the errors first');
            var formData = new FormData()
            for ([key,val] of _.entries(this.signUp)) {
                if (key == 'confirmPassword') continue;
                formData.append(key,val)
            }
            var res = await authreq.signup(formData)
            if(res) alert('User created, now login!')
        },

        async checkUsernameAvailable() {
            this.formErrors = [];
            var found = await req.find('case', {}, { username: this.signUp.username })
            if (found.length != 0 ) {
                this.formErrors.push('Username already in use')
            }
        },

        checkPasswordsEquality() {
            this.formErrors = [];
            if (this.signUp.password != this.signUp.confirmPassword) {
                this.formErrors.push('Your passwords are not the same')
            }
        }
    }
})
