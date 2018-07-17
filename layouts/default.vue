<template>
  <v-app>
    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
import detect from 'browser-detect'

export default {
  // Do not forget this little guy
  name: '',
  // share common functionality with component mixins
  mixins: [],
  // compose new components
  extends: {},
  // component properties/variables
  props: {},
  // variables
  data () {
    return {

    }
  },
  computed: {},
  // when component uses other components
  components: {},
  // methods
  watch: {},
  methods: {},
  // component Lifecycle hooks
  beforeCreate () {},
  mounted () {
    this.$store.dispatch('user/setBrowser', detect())

    window.addEventListener('blur', () => {
      this.$store.dispatch('audio/pause')
    }, false)

    window.addEventListener('focus', () => {
      this.$store.dispatch('audio/resume')
    }, false)
  }
}
</script>

<style>
  
</style>