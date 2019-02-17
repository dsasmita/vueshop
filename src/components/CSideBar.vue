<template>
    <v-navigation-drawer absolute="" clipped="" fixed="" v-model="drawer">
        <!-- header toolbar pada sidebar supaya lebih cantik -->
        <v-toolbar color="primary" dark="" @click="drawer=false">
            <v-btn dark="" icon="">
                <v-icon>
                    close
                </v-icon>
            </v-btn>
            <v-toolbar-title>
                Vueshop
            </v-toolbar-title>
        </v-toolbar>
        <v-list v-if="guest">
            <v-list-tile>
                <v-btn @click="register()" block="" class="white--text" color="secondary" depressed="" round="">
                    Register
                    <v-icon dark="" right="">
                        person_add
                    </v-icon>
                </v-btn>
            </v-list-tile>
            <v-list-tile>
                <v-btn @click="login()" block="" class="white--text" color="accent lighten-1" depressed="" round="">
                    Login
                    <v-icon dark="" right="">
                        lock_open
                    </v-icon>
                </v-btn>
            </v-list-tile>
        </v-list>
        <v-list v-if="!guest">
            <v-list-tile>
                <v-list-tile-avatar v-if="user.avatar">
                    <img :src="getImage('/users/'+user.avatar)">
                    </img>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{ user.name }}
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-btn @click.stop="logout();" block="" class="white--text" color="error lighten-1" depressed="" round="" small="">
                    Logout
                    <v-icon dark="" right="" small="">
                        settings_power
                    </v-icon>
                </v-btn>
            </v-list-tile>
        </v-list>
        <v-list class="pt-0" dense="">
            <v-divider>
            </v-divider>
            <!-- menu navigasi pada properti data items -->
            <v-list-tile :href="item.route" :key="index" :to="{name: item.route}" v-for="(item,index) in items">
                <v-list-tile-action>
                    <v-icon>
                        {{ item.icon }}
                    </v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{ item.title }}
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>
<script>

import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name: 'c-side-bar',
    data: () => ({
        items: [{
            title: 'Home',
            icon: 'dashboard',
            route: 'home'
        }, {
            title: 'About',
            icon: 'question_answer',
            route: 'about'
        }, ]
    }),
    computed: { 
        ...mapGetters({
            sideBar: 'sideBar',
            user: 'auth/user',
            guest: 'auth/guest',
        }),
        drawer: {
            get() {
                return this.sideBar
            },
            set(value) {
                this.setSideBar(value)
            }
        },
    },
    methods: { 
        ...mapActions({
            setSideBar: 'setSideBar',
            setStatusDialog: 'dialog/setStatus',
            setComponent: 'dialog/setComponent',
            setAuth: 'auth/set',
            setAlert: 'alert/set',
        }),
        login() {
            this.setStatusDialog(true)
            this.setComponent('login')
            this.setSideBar(false)
        },
        register() {
            this.setStatusDialog(true)
            this.setComponent('register')
            this.setSideBar(false)
        },
        logout() {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.user.api_token,
                },
            }
            this.axios.post('/logout', {}, config).then((response) => {
                this.setAuth({}) // kosongkan auth ketika logout
                this.setAlert({
                    status: true,
                    text: 'Logout successfully',
                    type: 'success',
                })
                this.setSideBar(false)
            }).catch((error) => {
                let responses = error.response
                this.setAlert({
                    status: true,
                    text: responses.data.message,
                    type: 'error',
                })
            })
        },
        register(){
            this.setStatusDialog(true)
            this.setComponent('register')
            this.setSideBar(false)
        }
    },
}
</script>