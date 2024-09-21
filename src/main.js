import "./assets/main.css";
// import * as deepEqual from 'fast-deep-equal';
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import router from "./router";
import Modal from "./BaseUI/Modal.vue";
import ModalRequirements from "./BaseUI/ModalRequirements.vue";
import BaseCard from "./BaseUI/BaseCardAuth.vue";
const app = createApp(App);
app.component("EasyDataTable", Vue3EasyDataTable);
app.component("Modal", Modal);
app.component("ModalRequirements", ModalRequirements);
app.component("BaseCard", BaseCard);
app.use(createPinia());
app.use(router);
app.use(Toast);
app.mount("#app");
