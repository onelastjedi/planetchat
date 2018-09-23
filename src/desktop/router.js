import Vue from "vue";
import Router from "vue-router";
import { requireAuth, rejectAuth } from "@/shared/utils/router-hooks";
import { isMobile } from "@/shared/utils/helpers-common";

Vue.use(Router);

const loadView = (folder, view) => {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/${folder}/views/${view}.vue`);
};

const router = new Router({
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
      component: loadView("desktop", "Login"),
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
      component: loadView("desktop", "Signup"),
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
      component: loadView("desktop", "Forgot"),
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
      component: loadView("desktop", "Reset"),
      beforeEnter: rejectAuth,
      meta: {
        isHeader: false,
        isFooter: true,
        isNotifier: false
      }
    }
  ]
});

router.beforeEach(() => {
  if (isMobile()) location.replace("http://m.planetchat.onelastjedi.com");
});

export default router;
