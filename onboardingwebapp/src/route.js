// import Home from './components/Home.vue'
// import SignUp from './components/SignUp.vue'

// import { createRouter, createWebHistory } from 'vue-router'

// const route = [
//     {
//         name: 'Home',
//         component: Home,
//         path: '/'
//     },
//     {
//         name: 'SignUp',
//         component: SignUp,
//         path: '/signup'
//     },
// ]


// const router = createRouter({
//     history: createWebHistory(),
//     route
// })
// export default router


import { createRouter, createWebHistory } from 'vue-router'

const routes = [

    // lazy-loaded when the route is visited then component  is loaded
    {
        path: '/',
        name: 'Home',
        component: () => import('./components/Home')
    },

    {
        path: '/signup',
        name: 'SignUp',
        component: () => import('./components/SignUp')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('./components/Login')
    },
    {
        path: '/add',
        name: 'AddStudent',
        component: () => import('./components/AddStudent')
    },

    {
        path: '/update/:id',
        name: 'UpdateStudent',
        component: () => import('./components/UpdateStudent')
    },

    {
        path: '/view/:id',
        name: 'StudentDetails',
        component: () => import('./components/StudentDetails')
    },


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
