import { createRouter, createWebHistory } from "vue-router";
import WelcomeView from "../views/WelcomeView.vue";

import LecOne from "../views/LecOne.vue";
import L1V1 from "../views/Lec1/Lec1ViewOne.vue";
import L1V2 from "../views/Lec1/Lec1ViewTwo.vue";
import L1V3 from "../views/Lec1/Lec1ViewThree.vue";
import L1V4 from "../views/Lec1/Lec1ViewFour.vue";
import L1V5 from "../views/Lec1/Lec1ViewFive.vue";

import LecTwo from "../views/LecTwo.vue";
import L2V1 from "../views/Lec2/Lec2ViewOne.vue";
import L2V2 from "../views/Lec2/Lec2ViewTwo.vue";
import L2V3 from "../views/Lec2/Lec2ViewThree.vue";
import L2V4 from "../views/Lec2/Lec2ViewFour.vue";
import L2V5 from "../views/Lec2/Lec2ViewFive.vue";

import LecThree from "../views/LecThree.vue";
import L3V1 from "../views/Lec3/Lec3ViewOne.vue";
import L3V2 from "../views/Lec3/Lec3ViewTwo.vue";
import L3V3 from "../views/Lec3/Lec3ViewThree.vue";
import L3V4 from "../views/Lec3/Lec3ViewFour.vue";
import L3V5 from "../views/Lec3/Lec3ViewFive.vue";

import LecFour from "../views/LecFour.vue";
import L4V1 from "../views/Lec4/Lec4ViewOne.vue";
import L4V2 from "../views/Lec4/Lec4ViewTwo.vue";
import L4V3 from "../views/Lec4/Lec4ViewThree.vue";
import L4V4 from "../views/Lec4/Lec4ViewFour.vue";
import L4V5 from "../views/Lec4/Lec4ViewFive.vue";

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
      children: [
        { path: "v1", component: L1V1 },
        { path: "v2", component: L1V2 },
        { path: "v3", component: L1V3 },
        { path: "v4", component: L1V4 },
        { path: "v5", component: L1V5 },
      ],
    },
    {
      path: "/lec2",
      name: "LecTwo",
      component: LecTwo,
      children: [
        { path: "v1", component: L2V1 },
        { path: "v2", component: L2V2 },
        { path: "v3", component: L2V3 },
        { path: "v4", component: L2V4 },
        { path: "v5", component: L2V5 },
      ],
    },
    {
      path: "/lec3",
      name: "LecThree",
      component: LecThree,
      children: [
        { path: "v1", component: L3V1 },
        { path: "v2", component: L3V2 },
        { path: "v3", component: L3V3 },
        { path: "v4", component: L3V4 },
        { path: "v5", component: L3V5 },
      ],
    },
    {
      path: "/lec4",
      name: "LecFour",
      component: LecFour,
      children: [
        { path: "v1", component: L4V1 },
        { path: "v2", component: L4V2 },
        { path: "v3", component: L4V3 },
        { path: "v4", component: L4V4 },
        { path: "v5", component: L4V5 },
      ],
    },
  ],
});

export default router;
