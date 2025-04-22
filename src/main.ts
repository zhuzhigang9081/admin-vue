import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import router from './router/index'
import App from './App.vue'

const pinia = createPinia()

createApp(App)
    .use(ElementPlus)
    .use(router)
    .use(pinia)
    .mount('#app')
