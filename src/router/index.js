import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Index from '../components/Index.vue'
import Users from '../components/auth/Users.vue'
import Roles from '../components/auth/Roles.vue'
import Menus from '../components/auth/Menus.vue'
import Forbid from '../components/exception/Forbid.vue'

const routes = [
  {
    path:'/',redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children : [
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/users',
        name: 'Users',
        component: Users
      },
      {
        path: '/roles',
        name: 'Roles',
        component: Roles
      },
      {
        path: '/menus',
        name: 'Menus',
        component: Menus
      },
      {
        path: '/forbid',
        name: 'Forbid',
        component: Forbid
      }
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) =>{
  return next();

});
export default router
