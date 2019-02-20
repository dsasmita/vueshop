import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Home from './views/Home.vue'
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
    }, {
        path: '/checkout',
        name: 'checkout',
        component: () =>
            import ( /* webpackChunkName: "checkout" */ './views/Checkout.vue'),
        meta: {
            auth: true
        }
    }],
})

router.beforeEach((to, from, next) => {
    // jika routing ada meta auth-nya maka
    if (to.matched.some(record => record.meta.auth)) {
        // jika user adalah guest
        if (store.getters['auth/guest']) {
            // tampilkan pesan bahwa harus login dulu
            store.dispatch('alert/set', {
                status: true,
                text: 'Login first',
                type: 'error',
            })
            // tampilkan form login
            store.dispatch('setPrevUrl', to.path)
            store.dispatch('dialog/setComponent', 'login')
            store.dispatch('dialog/setStatus', true)
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router