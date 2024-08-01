import "./assets/main.css";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Modal from "./BaseUI/Modal.vue";
const app = createApp(App);
app.component("EasyDataTable", Vue3EasyDataTable);
app.component("Modal", Modal);
app.use(createPinia());
app.use(router);

app.mount("#app");
