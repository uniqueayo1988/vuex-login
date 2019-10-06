import Vue from 'vue'
import Vuex from 'vuex'
// use the custom axios instance below
import axios from './axios-auth'

Vue.use(Vuex)

const API_KEY = process.env.VUE_APP_APIKEY
export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null
  },
  mutations: {

  },
  actions: {
    signup ({ commit }, authData) {
      axios.post(`/accounts:signUp?key=${API_KEY}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => console.log(res, '.....res....'))
        .catch(error => console.log(error, '.......error...'))
    },
    login ({ commit }, authData) {
      axios.post(`/accounts:signInWithPassword?key=${API_KEY}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => console.log(res, '.....res....'))
        .catch(error => console.log(error, '.......error...'))
    }
  },
  getters: {

  }
})
