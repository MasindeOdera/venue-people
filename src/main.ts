import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { plugin, defaultConfig } from "@formkit/vue";
import { createAutoAnimatePlugin } from "@formkit/addons";
import { matches, required } from "@formkit/rules";
import "./assets/styles/global.scss";
import "./assets/styles/formkit-theme.css";

// Register the rules
defaultConfig({
  plugins: [createAutoAnimatePlugin()],
  rules: {
    matches,
    required,
  },
});

createApp(App).use(store).use(router).use(plugin, defaultConfig).mount("#app");
