export default function ({ store, route }) {
  store.dispatch('log/event', {
    type: 'nav',
    to: route.path
  })
}
