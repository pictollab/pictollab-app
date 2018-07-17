<template>
  <div id="picto-feed-controls">
    <v-btn fab class="back" nuxt to="/app">
      <v-icon large>keyboard_backspace</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  // Do not forget this little guy
  name: 'PictoFeedControls',
  // share common functionality with component mixins
  mixins: [],
  // compose new components
  extends: {},
  // component properties/variables
  props: [],
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
  mounted () {}
}
</script>

<style>
#picto-feed-controls {
  z-index: 99;
}

#picto-feed-controls .back {
  position: fixed;
  left: 0; 
  right: 75vw; 
  margin-left: auto; 
  margin-right: auto; 
  top: 2.5%;
}
</style>