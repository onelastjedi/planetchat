import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/shared/store/store";
import socket from "@/shared/utils/socket.io";
import lib from "@/shared/utils/lib";
import _ from "lodash";
/**
 * Gives global access to socket inside components with this.$socket
 */
Vue.prototype.$socket = socket;

/* Gives global access to lib inside components with this.$lib */
Vue.prototype.$lib = lib;

/* Gives global access to lodash inside components with this.$_ */
Vue.prototype.$_ = _;

/* Disables hints */
Vue.config.productionTip = false;

/* Construct and mount new Vue app */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
