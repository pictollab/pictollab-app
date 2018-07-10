<template>
  <div id="picto-app-controls">
    <v-btn fab class="mute" @click.stop="mute">
      <v-icon>{{ muted ? 'volume_up' : 'volume_off' }}</v-icon>
    </v-btn>
    <v-btn large fab class="camera" @click.stop="capture">
      <v-icon large>camera</v-icon>
    </v-btn>
    <v-btn fab class="data" nuxt to="/data">
      <v-icon>bar_chart</v-icon>
    </v-btn>
    <v-speed-dial v-model="fab" direction="top" class="fab">
      <v-btn v-model="fab" fab slot="activator" class="fab-activator">
        <v-icon>photo_library</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn fab nuxt to="/feed">
        <v-icon>photo_album</v-icon>
      </v-btn>
      <v-btn fab nuxt to="/art">
        <v-icon>brush</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
export default {
  // Do not forget this little guy
  name: 'PictoAppControls',
  // share common functionality with component mixins
  mixins: [],
  // compose new components
  extends: {},
  // component properties/variables
  props: [ 'muted' ],
  // variables
  data () {
    return { 
      fab: false
    }
  },
  computed: {},
  // when component uses other components
  components: {},
  // methods
  watch: {},
  methods: {
    capture () { this.$emit('capture') },
    mute () { this.$emit('mute') }
  },
  // component Lifecycle hooks
  beforeCreate () {},
  mounted () {}
}
</script>

<style>
#picto-app-controls .mute {
  position: absolute;
  left: 75vw;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 2.5%;
}

#picto-app-controls .camera {
  position: absolute;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  bottom: 5%;
}

#picto-app-controls .fab {
  position: absolute;
  left: 75vw; 
  right: 0;
  margin-left: auto; 
  margin-right: auto; 
  bottom: 2.5%;
}


#picto-app-controls .data {
  position: absolute;
  left: 0; 
  right: 75vw; 
  margin-left: auto; 
  margin-right: auto; 
  bottom: 2.5%;
}
</style>