<template>
  <v-layout id="picto-feed" row wrap>
    <picto-feed-controls
      :muted="muted"
      v-on:mute="muted = !muted"
    />

    <template v-for="(img, i) in $store.state.feed">
      <v-flex xs12 :key="i" class="image-container">
        <figure :class="img.class" @click="sonify(i, img)">
          <img :src="img.base64" :class="zoomed === i ? 'zoom' : ''" >
        </figure>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import PictoFeedControls from '~/components/PictoFeed/Controls'

import analyseImage from '~/assets/js/image/analyse'

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
      muted: false,
      zoomed: -1
    }
  },
  computed: {},
  // when component uses other components
  components: {
    PictoFeedControls
  },
  // methods
  watch: {},
  methods: {
    sonify (i, img) {
      if (i !== this.zoomed) {
        this.zoomed = i

        setTimeout(() => {
          const rgb = analyseImage(document.querySelector('.zoom'))
          
          this.$store.dispatch('audio/setPreset', img.preset)
          this.$store.dispatch('audio/rgb', rgb)
          this.$store.dispatch('audio/focus')
        }, 50)
      } else {
        this.zoomed = -1
        this.$store.dispatch('audio/blur')
      }
    }
  },
  // component Lifecycle hooks
  beforeCreate () {},
  mounted () {}
}
</script>

<style>
#picto-feed > .image-container {
  max-height: 100vh;
  overflow: hidden;
}

#picto-feed > .image-container img {
  height: 100vh;
  object-fit: cover;
  transition: transform .2s;
  width: 100vw;
}

.zoom {
  transform: scale(1.2);
}
</style>