import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
// import socket from "./utils/socket.io";
// import lib from "./utils/lib";
// import _ from "lodash";
// import "./utils/vue-mq";

/**
 * Gives global access to socket inside components with this.$socket
 */
// Vue.prototype.$socket = socket;

/* Gives global access to lib inside components with this.$lib */
// Vue.prototype.$lib = lib;

/* Gives global access to lodash inside components with this.$_ */
// Vue.prototype.$_ = _;

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app");
