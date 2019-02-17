<template>
    <v-card>
        <v-toolbar color="primary" dark="">
            <v-btn @click="close" dark="" icon="">
                <v-icon>
                    close
                </v-icon>
            </v-btn>
            <v-toolbar-title>
                Login and Start Shopping!
            </v-toolbar-title>
        </v-toolbar>
        <v-divider>
        </v-divider>
        <v-container fluid="">
            <v-form lazy-validation="" ref="form" v-model="valid">
                <v-text-field :rules="emailRules" append-icon="email" label="E-mail" required="" v-model="email">
                </v-text-field>
                <v-text-field :append-icon="showPassword ? 'visibility' : 'visibility_off'" :rules="passwordRules" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" counter="" hint="At least 6 characters" label="Password" v-model="password">
                </v-text-field>
                <div class="text-xs-center">
                    <v-btn :disabled="!valid" @click="submit" color="accent lighten-1">
                        Login
                        <v-icon dark="" right="">
                            lock_open
                        </v-icon>
                    </v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name: 'login',
    data() {
        return {
            valid: true,
            email: 'sherman24@example.net',
            emailRules: [
                v => !!v || 'E-mail is required',
                // v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_] {2,}) + /.test(v) || 'E-mail must be valid'
            ],
        	showPassword: false,
            password: '',
            passwordRules: [
                v => !!v || 'Password required.',
                v => (v && v.length >= 6) || 'Min 6 characters',
            ],
    }
},
computed: { 
	...mapGetters({
            user: 'auth/user',
        }),
    },
    methods: { 
    	...mapActions({
            setAlert: 'alert/set',
            setStatusDialog: 'dialog/setStatus',
            setAuth: 'auth/set',
        }),
        close() {
            this.setStatusDialog(false)
        },
        submit() {
            if (this.$refs.form.validate()) {
                let formData = {
                    'email': this.email,
                    'password': this.password
                }
                this.axios.post('/login', formData).then((response) => {
                    let data_user = response.data.data
                    this.setAuth(data_user)
                    if (this.user.id > 0) {
                        this.setAlert({
                            status: true,
                            text: 'Login success',
                            type: 'success',
                        })
                        this.setStatusDialog(false)
                    } else {
                        this.setAlert({
                            status: true,
                            text: 'Login error',
                            type: 'error',
                        })
                    }
                }).catch((error) => {
                    let responses = error.response
                    this.setAlert({
                        status: true,
                        text: responses.data.message,
                        type: 'error',
                    })
                })
            }
        },
    },
}
</script>