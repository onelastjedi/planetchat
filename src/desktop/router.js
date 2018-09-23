import Vue from "vue";
import Router from "vue-router";
import { requireAuth, rejectAuth } from "@/shared/utils/router-hooks";

Vue.use(Router);

const loadView = (folder, view) => {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/${folder}/views/${view}.vue`);
};

export default new Router({
  mode: "history",
  /* eslint-disable-next-line */
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: loadView("desktop", "Home"),
      beforeEnter: requireAuth,
      meta: {
        isHeader: true,
        isFooter: false,
        isNotifier: true
      }
    },
    {
      path: "/create",
      name: "create",
      component: loadView("desktop", "Home"),
      beforeEnter: requireAuth,
      meta: {
        isHeader: true,
        isFooter: false,
        isNotifier: true
      }
    },
    {
      path: "/groups/:id",
      name: "group",
      component: loadView("desktop", "Home"),
      beforeEnter: requireAuth,
      meta: {
        isHeader: true,
        isFooter: false,
        isNotifier: true
      }
    },
    {
      path: "/settings",
      name: "settings",
      component: loadView("desktop", "Settings"),
      beforeEnter: requireAuth,
      meta: {
        isHeader: true,
        isFooter: false,
        isNotifier: true
      }
    },
    {
      path: "/settings/details",
      name: "details",
      component: loadView("desktop", "Settings"),
      beforeEnter: requireAuth,
      meta: {
        isHeader: true,
        isFooter: false,
        isNotifier: true
      }
    },
    {
      path: "/settings/privacy",
      name: "privacy",
      component: loadView("desktop", "Settings"),
      beforeEnter: requireAuth,
      meta: {
        isHeader: true,
        isFooter: false,
        isNotifier: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: loadView("shared", "Login"),
      beforeEnter: rejectAuth,
      meta: {
        isHeader: false,
        isFooter: true,
        isNotifier: false
      }
    },
    {
      path: "/signup",
      name: "signup",
      component: loadView("shared", "Signup"),
      beforeEnter: rejectAuth,
      meta: {
        isHeader: false,
        isFooter: true,
        isNotifier: false
      }
    },
    {
      path: "/forgot",
      name: "forgot",
      component: loadView("shared", "Forgot"),
      beforeEnter: rejectAuth,
      meta: {
        isHeader: false,
        isFooter: true,
        isNotifier: false
      }
    },
    {
      path: "/reset",
      name: "reset",
      component: loadView("shared", "Reset"),
      beforeEnter: rejectAuth,
      meta: {
        isHeader: false,
        isFooter: true,
        isNotifier: false
      }
    }
  ]
});
