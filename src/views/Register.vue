<template>
    <v-card>
        <v-toolbar color="primary" dark="">
            <v-btn @click.native="close" dark="" icon="">
                <v-icon>
                    close
                </v-icon>
            </v-btn>
            <v-toolbar-title>
                Register and Start Shopping!
            </v-toolbar-title>
        </v-toolbar>
        <v-divider>
        </v-divider>
        <v-container fluid="">
            <v-form lazy-validation="" ref="form" v-model="valid">
                <v-text-field :counter="255" :rules="nameRules" append-icon="person" label="Name" required="" v-model="name">
                </v-text-field>
                <v-text-field :rules="emailRules" append-icon="email" label="E-mail" required="" v-model="email">
                </v-text-field>
                <v-text-field :append-icon="showPassword ? 'visibility' : 'visibility_off'" :rules="passwordRules" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" counter="" hint="At least 6 characters" label="Password" v-model="password">
                </v-text-field>
                <v-checkbox :rules="[v => !!v || 'You must agree to continue!']" label="Do You agree with our Privacy Policy?" required="" v-model="checkbox">
                </v-checkbox>
                <div class="text-xs-center">
                    <v-btn :disabled="!valid" @click="submit" color="primary">
                        submit
                        <v-icon dark="" right="">
                            person_add
                        </v-icon>
                    </v-btn>
                    <v-btn @click="clear">
                        clear
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
    name: 'register',
    data() {
        return {
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 255) || 'Name must be less than 255 characters '
            ],
            showPassword: false,
            password: '',
            passwordRules: [
                v => !!v || 'Password required.',
                v => (v && v.length >= 6) || 'Min 6 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                // v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_] {2,\}) + /.test(v) || 'E-mail must be valid'
            ],
        checkbox: false
    }
},
computed: { ...mapGetters({
            user: 'auth/user',
        }),
    },
    methods: { ...mapActions({
            setAlert: 'alert/set',
            setStatusDialog: 'dialog/setStatus',
            setAuth: 'auth/set',
        }),
        close() {
            this.setStatusDialog(false)
        },
        submit() {
            if (this.$refs.form.validate()) {
                let formData = new FormData()
                formData.set('name', this.name)
                formData.set('email', this.email)
                formData.set('password', this.password)
                this.axios.post('/register', formData).then((response) => {
                    let data_user = response.data.data
                    this.setAuth(data_user)
                    this.setAlert({
                        status: true,
                        text: 'register success',
                        type: 'success',
                    })
                    this.close()
                }).catch((error) => {
                    let responses = error.response
                    let messages = responses.data.message
                    let errorMessage = messages[Object.keys(messages)[0]]
                    
                    this.setAlert({
                        status: true,
                        text: errorMessage[0],
                        type: 'error',
                    })
                })
            }
        },
        clear() {
            this.$refs.form.reset()
        }
    },
}
</script>