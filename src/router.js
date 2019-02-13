import Vue from 'vue'
import Router from 'vue-router'
// import component Home dan About
import Home from './views/Home.vue' // boleh juga -> import CHeader from '@/views/Home.vue'
import About from './views/About.vue'

Vue.use(Router)
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        // jika routenya / maka component yang akan ditampilkan pada router-
        // view adalah Home 
        {
            path: '/',
            name: 'home',
            component: Home
        }, {
            path: '/about',
            name: 'about',
            component: About
        },
        // jika routenya apapun selain definisi di atas maka component yang
        //akan ditampilkan pada router - view
        // adalah Home, route default untuk mencegah error
        {
            path: '*',
            redirect: {
                name: 'home'
            }
        },
    ],
})
export default router