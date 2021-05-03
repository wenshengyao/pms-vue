import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import service from "@/util/request";
import installElementPlus from './plugins/element'
import './assets/css/global.css'
const app = createApp(App)
installElementPlus(app)
app.use(router).mount('#app')

app.config.globalProperties.$http = service
app.config.globalProperties.$http.interceptors.response.use()