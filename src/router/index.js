import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Chart from '../views/Chart.vue'
import store from "../store";
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    title: "Home",
    icon: "home",
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    icon: "login",
    title: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "profile",
    icon: "account",
    title: "Profile",
    //component: () => import(/* webpackChunkName: "about" */ "./views/Profile.vue")
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/chart",
    name: "chart",
    icon: "chart-line",
    title: "Statistic",
    //component: () => import(/* webpackChunkName: "about" */ "./views/Profile.vue")
    component: Chart,
    meta: {
      requiresAuth: true,
      requiresRole: "admin",
    },
  },
  {
    path: "/",
    name: "divider-admin",
    title: "Information",
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "https://www.leerstandsmelder.de",
    href: true,
    name: "leerstandsmelder",
    title: "Leerstandsmelder",
    icon: "open-in-new",
    meta: {
      requiresAuth: false,
    },
  },
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: false,
    },

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters["auth/isLoggedIn"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
  //console.log("to requiresRole", to);
  if (to.matched.some((record) => record.meta.requiresRole)) {
    if (store.getters["auth/getRole"] == to.meta.requiresRole) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

// eslint-disable-next-line
router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
});


export default router
