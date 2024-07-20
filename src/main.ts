import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { plugin, defaultConfig } from "@formkit/vue";
import "./assets/styles/global.scss";

createApp(App).use(store).use(router).use(plugin, defaultConfig).mount("#app");
