<template>
  <v-layout id="picto-feed" row wrap>
    <picto-feed-controls
      :muted="muted"
      v-on:mute="muted = !muted"
    />

    <template v-for="(img, i) in $store.state.feed">
      <v-flex xs12 :key="i" class="image-container">
        <figure :class="img.class" @click="zoom(i)">
          <img :src="img.base64" :class="zoomed === i ? 'zoom' : ''" >
        </figure>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import PictoFeedControls from '~/components/PictoFeed/Controls'

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
    zoom (i) {
      this.zoomed = i === this.zoomed
        ? -1
        : i
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

#picto-feed > .image-container .zoom {
  transform: scale(1.2);
}
</style>