import Vue from "vue";
import VueMq from "vue-mq";

Vue.use(VueMq, {
  breakpoints: {
    // sm: 640,
    md: 740,
    lg: Infinity
  }
});
