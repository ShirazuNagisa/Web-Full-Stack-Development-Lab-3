import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// 创建 Vue 应用实例，注册路由，最后挂载到 #app 上
createApp(App).use(router).mount('#app')
