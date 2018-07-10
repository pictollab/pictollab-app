import Vue from 'vue'
import VueSocketio from 'vue-socket.io'

const url = process.env.NODE_ENV === 'dev'
  ? '/'
  : 'https://pictollab.herokuapp.com/'

export default ({ app }) => {
  if (!process.env.NODE_ENV === 'dev_local')
    Vue.use(VueSocketio, url, app.store)
}