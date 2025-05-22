import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      createdAt: ''  
    },
    isAuthenticated: false
  }),
  getters: {
    fullName: (state) =>
      `${state.user.firstName} ${state.user.lastName}`.trim(),
    email: (state) => state.user.email,
    
    memberSince: (state) => {
      if (!state.user.createdAt) return ''
      const d = new Date(state.user.createdAt)
      const months = [
        'January','February','March','April','May','June',
        'July','August','September','October','November','December'
      ]
      return `${months[d.getMonth()]} ${d.getFullYear()}`
    }
  },
  actions: {
    signup(payload) {
      const now = new Date().toISOString()
      const data = { ...payload, createdAt: now }
      sessionStorage.setItem('sessionUser', JSON.stringify(data))
      this.user = { ...data }
      this.isAuthenticated = true
      sessionStorage.setItem('isAuth', 'true')
    },
    login({ email, password }) {
      const stored = JSON.parse(sessionStorage.getItem('sessionUser') || '{}')
      if (stored.email === email && stored.password === password) {
        this.user = { ...stored }
        this.isAuthenticated = true
        sessionStorage.setItem('isAuth', 'true')
      } else {
        throw new Error('Credenciales inválidas')
      }
    },
    restoreFromStorage() {
      const authFlag = sessionStorage.getItem('isAuth') === 'true'
      const stored   = JSON.parse(sessionStorage.getItem('sessionUser') || '{}')
      if (authFlag && stored.email) {
        this.user = { ...stored }
        this.isAuthenticated = true
      }
    },
    updateUser(payload) {
      this.user = { ...this.user, ...payload }
      sessionStorage.setItem('sessionUser', JSON.stringify(this.user))
    },
    logout() {
      this.user = { firstName:'', lastName:'', email:'', password:'', createdAt: '' }
      this.isAuthenticated = false
      sessionStorage.removeItem('isAuth')
      sessionStorage.removeItem('sessionUser')
    }
  }
})
