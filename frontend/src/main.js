import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Aura from "@primevue/themes/aura";
import PrimeVue from "primevue/config";
import router from "./config/routes";
import ToastService from "primevue/toastservice";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(Toast);
app.use(ToastService);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.mount("#app");

/** TAILWIND TELEPITES */
