import { createRouter, createWebHistory } from "vue-router";
import WelcomeView from "../views/WelcomeView.vue";

import LecOne from "../views/LecOne.vue";
import LecTwo from "../views/LecTwo.vue";
import LecThree from "../views/LecThree.vue";
import LecFour from "../views/LecFour.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "WelcomeView",
      component: WelcomeView,
    },
    {
      path: "/lec1",
      name: "LecOne",
      component: LecOne,
    },
    {
      path: "/lec2",
      name: "LecTwo",
      component: LecTwo,
    },
    {
      path: "/lec3",
      name: "LecThree",
      component: LecThree,
    },
    {
      path: "/lec4",
      name: "LecFour",
      component: LecFour,
    },
  ],
});

export default router;
