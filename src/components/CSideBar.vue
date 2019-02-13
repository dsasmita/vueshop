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
        <v-list>
            <v-list-tile>
                <!-- tombol register -->
                <v-btn block="" class="white--text" color="secondary" depressed="" round="">
                    Register
                    <v-icon dark="" right="">
                        person_add
                    </v-icon>
                </v-btn>
            </v-list-tile>
            <v-list-tile>
                <!-- tombol login -->
                <v-btn block="" class="white--text" color="accent lighten-1" depressed="" round="">
                    Login
                    <v-icon dark="" right="">
                        lock_open
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
        // mapping state sideBar menggunakan map getter
        ...mapGetters({
            sideBar: 'sideBar',
        }),
        // ubah properti data drawer menjadi computed dimana nilainya membaca
        // dari state sideBar
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
        // mapping action setSideBar pada store menggunakan map action
        ...mapActions({
            setSideBar: 'setSideBar',
        }),
    },
}

</script>