import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './AppHeijunka.vue'

createApp(App).use(createPinia()).mount('#app')
