<template>
  <v-card id="picto-app-preview" v-touch="{
    left: () => swipe('L'), 
    right: () => swipe('R') 
  }">
    <v-card-text>
      <figure :class="$store.getters.filter">
        <canvas width="720" height="1280" ref="canvas"/>
      </figure>
      <v-layout row justify-end>
        <v-flex xs2>
          <v-btn flat icon color="error" @click.stop="reject">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn flat icon color="success" @click.stop="accept">
            <v-icon>check</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  // Do not forget this little guy
  name: 'PictoAppPreview',
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
  methods: {
    accept () {
      this.$store.dispatch('log/event', {
        type: 'capture'
      })
      this.$store.dispatch('socket/upload', {
        base64: this.$refs.canvas.toDataURL(),
        class: this.$store.getters.filter
      })
      this.$emit('close')
    },
    draw (video) {
      this.$refs.canvas.getContext('2d')
        .drawImage(video, 0, 0, 720, 1280)
    },
    reject () {
      this.$emit('close')
    },
    swipe (direction) {
      switch (direction) {
        case 'L':
          this.$store.commit('FILTER_NEXT')
          break
        case 'R':
          this.$store.commit('FILTER_PREV')
          break
      }
    }
  },
  // component Lifecycle hooks
  beforeCreate () {},
  mounted () {}
}
</script>

<style>
#picto-app-preview {
  height: auto
}

#picto-app-preview canvas {
  max-height: 70vh;
  width: 100%;
}
</style>