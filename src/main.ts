import { createApp } from 'vue'
import router from './router'
import App from './Maya.vue'
import '@/assets/base.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
