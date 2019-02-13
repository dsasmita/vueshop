import Vue from 'vue'
import Router from 'vue-router'
// import component Home dan About
import Home from './views/Home.vue' // boleh juga -> import CHeader from '@/views/Home.vue'
import About from './views/About.vue'
Vue.use(Router)
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    }, {
        path: '/about',
        name: 'about',
        component: About
    }, {
        path: '*',
        redirect: {
            name: 'home'
        }
    }, {
        path: '/categories',
        name: 'categories',
        component: () =>
            import ( /* webpackChunkName: "categories" */ './views/Categories.vue')
    }, {
        path: '/books',
        name: 'books',
        component: () =>
            import ( /* webpackChunkName: "books" */ './views/Books.vue')
    }, {
        path: '/category/:slug',
        name: 'category',
        component: () =>
            import ( /* webpackChunkName: "category" */ './views/Category.vue')
    }, {
        path: '/book/:slug',
        name: 'book',
        component: () =>
            import ( /* webpackChunkName: "book" */ './views/Book.vue')
    }],
})
export default router