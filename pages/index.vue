<template>
  <v-container fill-height>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title primary-title>
            <h2>About the Project</h2>
          </v-card-title>
          <v-card-text>
            <p>Version: {{ $store.state.version }}</p>
            <p>Welcome to Pictollab, an application developed at Queen Mary, University of
            London exploring the uses of a process called image sonification in everyday
            creativity. You are invited to use the application for as little or as long as
            you would like. If you choose not to take part, or stop taking part at any
            point, there won't be any disadvantages for you and you will hear no more
            about it.</p>
            <p>Please read the following information carefully before you decide to take
            part; this will tell you why the research is being done and what will be asked
            of you if you choose to participate. It will also outline some rules you must
            follow if you choose to take part in this research. If anything is not clear
            or you would like more information, you may contact Andrew Thompson at
            andrew.thompson@qmul.ac.uk.</p>
            <hr/>
            <p>We are investigating ways to enable people to be creative in their everyday
            lives. To do this we have a developed this application, Pictollab, to take
            images you make and sonify them – turn them into sound and music. All users of
            the application will help to create a generate art piece that all users can
            explore over the 24 hour study period. This piece will show off all the images
            users have taken as well as being sonified itself.</p>
            <p>Pictollab requires access to your devices camera and microphone to function
            properly and you will be prompted to provide access to both on the following
            page. Access can be revoked at any time through your browser and your
            microphone and camera will not be used when the application is not running.</p>
            <p>Pictollab uses the images you capture to create a generative art piece that
            allows other users of the application to explore yours and others' photos.
            After taking a photo you will be prompted to accept (green tick) or reject
            (red cross) the image. If you accept the image will be securely uploaded to a
            server and broadcast to all other users of the app. You do not have to accept
            any image. Any images stored on the server will be destroyed after the 24 hour
            study period has ended. The following image content is prohibited:</p>
            <p>- Images depicting individuals or small groups of individuals; particularly
            images of children or vulnerable groups.</p>
            <p>- Images depicting violence.</p>
            <p>- Images depicting pornographic content.</p>
            <p>Pictollab is currently only open to current residents of the United Kingdom
            that are also currently located in the United Kingdom.</p>
            <p>Pictollab collects some information for research purposes. This includes
            information about your mobile device and the browser you use, as well as
            interaction data like the number of photos you have taken using the
            application. None of this information is able to personally identify you,
            however all participants are assigned a unique, random identifier.</p>
            <p>It is entirely up to you if you chose to take part. You may save a copy of
            this information sheet, as well as a digital copy of the ethics approval
            letter here (link).</p>
          </v-card-text>
          <v-card-actions>
            <v-btn nuxt @click.native="accept">I Understand</v-btn>
          </v-card-actions>
        </v-card> 
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
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
  methods: {
    accept () {
      this.$store.dispatch('log/event', { type: 'connect' })
      this.$router.push('/app')
    }
  },
  // component Lifecycle hooks
  beforeCreate () {},
  mounted () {}
}
</script>

<style>
  
</style>