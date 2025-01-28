import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import router from './config/routes';

const app = createApp(App);
app.use(router)
app.use(PrimeVue , {
    theme: {
        preset: Aura
    }
});
app.mount('#app');

/** TAILWIND TELEPITES */