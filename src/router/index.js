import Vue from "vue";
import router from "vue-router";
import Agenda from "@/components/Agenda";

Vue.use(router);

export default new router({
  routes: [
    {
      path: "/",
      name: "Agenda",
      component: Agenda
    }
  ]
});
