import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";


import "bootstrap/dist/css/bootstrap.min.css";
// Scripts
import "bootstrap/dist/js/bootstrap.bundle";


const app = createApp(App);
app.use(VueAxios, axios);


app.mount("#app");
