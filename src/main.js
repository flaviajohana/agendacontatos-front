import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

axios.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    return config;
  },
  err => {
    console.log(err);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error);
  }
);

Vue.use(VueAxios, axios);
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
