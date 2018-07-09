import Vue from 'vue'
import VueSocketio from 'vue-socket.io'

export default ({ app }) => {
  if (!process.env.NODE_ENV === 'dev') {
    Vue.use(VueSocketio, 'https://pictollab.herokuapp.com/', app.store)
  }
}