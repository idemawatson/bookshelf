import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Error from "@/views/Error.vue";
import Search from "@/views/Search.vue";
import firebase from "@/plugins/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiredAuth: true }
  },
  {
    path: "/search",
    name: "search",
    component: Search,
    meta: { requiredAuth: true }
  },
  {
    path: "*",
    redirect: { name: "Error" }
  },
  {
    path: "/error",
    name: "Error",
    component: Error
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiredAuth = to.matched.some(record => record.meta.requiredAuth);
  if (requiredAuth) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next();
      } else {
        next({
          path: "/login",
          query: { redirect: to.fullPath }
        });
      }
    });
  } else {
    next();
  }
});

export default router;
