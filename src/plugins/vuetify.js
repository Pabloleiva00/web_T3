// src/plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: '#edfbed',
          primary: '#D1A200',
          secondary: '#FFFBCC',
          surface: '#ffffff',
          text: '#1d1d1d',
        }
      }
    }
  },
  defaults: {
    VBtn: {
      rounded: 'lg',              
      elevation: 0,               
      class: 'custom-btn',    
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: true,
      class: 'custom-input',      
    },
    VForm: {
      class: 'custom-form',      
    },
    VList: {
    class: 'custom-v-list',
    density: 'comfortable' 
    },
    VListItem: {
      class: 'custom-v-list-item'
    },
    VCard: {
      class: 'auth-card-border',
      rounded: 'xl',
      elevation: 2,
      style: {
        padding: '2rem',
        maxWidth: '400px',
        margin: '0 auto'
      }
    }
  }
})
