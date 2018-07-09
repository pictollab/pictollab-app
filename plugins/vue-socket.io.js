import Vue from 'vue'
import VueSocketio from 'vue-socket.io'

export default ({ app }) => {
  Vue.use(VueSocketio, 'https://pictollab.herokuapp.com/', app.store)
}