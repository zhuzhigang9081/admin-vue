import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import { createPinia } from "pinia";
import router from "./router/index";
import App from "./App.vue";
import directive from "./directive/index";

const app = createApp(App);
const pinia = createPinia();
//将element-plus的图标注册到app
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus).use(router).use(pinia).mount("#app");
directive(app);
