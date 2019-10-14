import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Register from './views/Register'
import NoPage from './views/404'
import Login from './views/Login'
import Home from './views/Home'
import InfoShow from './views/InfoShow'
import DataList from './views/dataList'
import InfoMsg from './views/InfoMsg'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/Login',
            name: 'login',
            component: Login
        },
        {
            path: '/index',
            component: Index,
            children: [
                {
                    path:'',
                    component:Home
                },
                {
                    path:'/home',
                    name:'home',
                    component:Home
                },
                {
                    path:'/infoShow',
                    name:'infoShow',
                    component:InfoShow
                },
                {
                    path:'/dataList',
                    name:'dataList',
                    component:DataList
                },
                {
                    path:'/infoMsg',
                    name:'infoMsg',
                    component:InfoMsg
                }
            ]
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '*',
            name: '/404',
            component: NoPage
        },
        /*{
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/!* webpackChunkName: "about" *!/ './views/About.vue')
        }*/
    ]
})
//路由守卫
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false;
    if (to.path == '/login' || to.path == '/register') {
        next();
    } else {
        isLogin ? next() : next('/login');
    }
})

export default router;