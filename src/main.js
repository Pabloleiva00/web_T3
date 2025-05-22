import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'vuetify/styles'

import '@/assets/styles.css'

const app = createApp(App) 

const pinia = createPinia() 
app.use(pinia)

const userStore = useUserStore(pinia)
userStore.restoreFromStorage()

app.use(router)
app.use(vuetify)


app.mount('#app')
