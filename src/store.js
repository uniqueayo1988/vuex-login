import Vue from 'vue'
import Vuex from 'vuex'
import globalAxios from 'axios'
// use the custom axios instance below
import axios from './axios-auth'

Vue.use(Vuex)

const API_KEY = process.env.VUE_APP_APIKEY
export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      state.user = user
    }
  },
  actions: {
    signup ({ commit, dispatch }, authData) {
      axios.post(`/accounts:signUp?key=${API_KEY}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res, '.....res....')
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          dispatch('storeUser', authData)
        })
        .catch(error => console.log(error, '.......error...'))
    },
    login ({ commit }, authData) {
      axios.post(`/accounts:signInWithPassword?key=${API_KEY}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res, '.....res....')
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
        })
        .catch(error => console.log(error, '.......error...'))
    },
    storeUser ({ commit, state }, userData) {
      if (!state.idToken) {
        return
      }
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    fetchUser ({ commit, state }) {
      if (!state.idToken) {
        return
      }
      globalAxios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res)
          const data = res.data
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          console.log(users)
          // this.email = users[0].email
          commit('storeUser', users[0])
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
})
