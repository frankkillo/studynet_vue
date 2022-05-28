import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      username: '',
      id: ''
    },
    isAuthenticated: false,
    token: ''
  },
  getters: {
  },
  mutations: {
    initializeStore (state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.user.username = localStorage.getItem('username')
        state.user.id = localStorage.getItem('user_id')
        state.isAuthenticated = true
      } else {
        state.user.username = ''
        state.user.id = ''
        state.token = ''
        state.isAuthenticated = ''
      }
    },
    setToken (state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken (state) {
      state.user.username = ''
      state.user.id = ''
      state.token = ''
      state.isAuthenticated = false
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
