import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore }  from '@/stores/user'
import Login    from '@/views/Login.vue'
import Landing  from '@/views/Landing.vue'
import Signup   from '@/views/Signup.vue'
import Feed     from '@/views/Feed.vue'
import Profile  from '@/views/Profile.vue'
import NewQuackView from '@/views/NewQuackView.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: { hideNavbar: true } 
  },
  {
    path: '/login',
    component: Login,
    meta: { hideNavbar: true }
  },
  {
    path: '/signup',
    component: Signup,
    meta: { hideNavbar: true }
  },
  {
    path: '/feed',
    component: Feed
  },
  {
    path: '/profile',
    component: Profile,
  },
  //TODO: Agregar el resto de las rutas
  { path: '/new-quack', 
    component: NewQuackView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const publicPage = to.meta.hideNavbar === true
  const userStore  = useUserStore()

  if (!publicPage && !userStore.isAuthenticated) {
    return next('/login')
  }
  next()
})

export default router