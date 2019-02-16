<template>
    <v-app>
        <!-- component header -->
        <c-header>
        </c-header>
        <!-- component sidebar -->
        <c-side-bar>
        </c-side-bar>
        <!-- konten utama -->
        <v-content>
            <v-slide-y-transition mode="out-in">
                <router-view>
                </router-view>
            </v-slide-y-transition>
        </v-content>
        <!-- component footer -->
        <c-footer>
        </c-footer>
        <c-alert></c-alert>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-
        bottom-transition">
            <search></search>
        </v-dialog>
    </v-app>
</template>
<script>
import CHeader from '@/components/CHeader.vue'
import CFooter from '@/components/CFooter.vue'
import CSideBar from '@/components/CSideBar.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'App',
    components: {
        CHeader,
        CFooter,
        CSideBar,
        CAlert: () => import(/* webpackChunkName: "c-alert" */ '@/components/CAlert.vue'),
        Search: () => import(/* webpackChunkName: "search" */ '@/views/Search.vue')
    },
    methods: {
        ...mapActions({
            setStatusDialog: 'dialog/setStatus',
        }),
    },
    computed: { 
        ...mapGetters({
            statusDialog: 'dialog/status',
        }),
        dialog: {
            get() {
                return this.statusDialog
            },
            set(value) {
                this.setStatusDialog(value)
            }
        },
    },
}
</script>