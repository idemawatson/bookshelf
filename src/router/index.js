import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Error from "@/views/Error.vue";
import Error500 from "@/views/Error500.vue";
import Search from "@/views/Search.vue";
import User from "@/views/User.vue";
import Friend from "@/views/Friend.vue";
import FriendHome from "@/views/FriendHome.vue";
import store from "@/store";
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
    path: "/user",
    name: "user",
    component: User,
    meta: { requiredAuth: true }
  },
  {
    path: "/friend",
    name: "friend",
    component: Friend,
    meta: { requiredAuth: true }
  },
  {
    path: "/friendhome",
    name: "friendhome",
    component: FriendHome,
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
  },
  {
    path: "/500",
    name: "Error500",
    component: Error500
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiredAuth = to.matched.some(record => record.meta.requiredAuth);
  const user = store.state.user;
  if (to.path === "/login" && user !== null) {
    next({
      path: "/home"
    });
  } else if (requiredAuth) {
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
