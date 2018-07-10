<template>
  <div id="picto-feed-controls">
    <v-btn fab class="back" nuxt to="/app">
      <v-icon large>keyboard_backspace</v-icon>
    </v-btn>

    <v-btn fab class="mute" @click.stop="mute">
      <v-icon>{{ muted ? 'volume_up' : 'volume_off' }}</v-icon>
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
  props: [ 'muted' ],
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
  methods: {
    mute () { this.$emit('mute') }
  },
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

#picto-feed-controls .mute {
  position: fixed;
  left: 75vw;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 2.5%;
}
</style>