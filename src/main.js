
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import 'bootstrap/dist/css/bootstrap.min.css';
// Scripts
import 'bootstrap/dist/js/bootstrap.bundle';


const app = createApp(App);

app.use(router);

app.mount("#app");
