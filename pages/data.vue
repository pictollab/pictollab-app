<template>
  <v-flex xs12>
  <v-toolbar>
    <v-toolbar-title>Data</v-toolbar-title>
    <v-spacer/>
    <v-btn icon nuxt to="/app">
      <v-icon>arrow_forward_ios</v-icon>
    </v-btn>
  </v-toolbar>

    <v-list dense subheader>
      <v-subheader>
        <b>Client Info</b>  
      </v-subheader>
      <v-flex xs12>
        <v-subheader>Browser</v-subheader>
        <v-list-tile v-for="(item, key, i) in $store.state.user.browser" :key="i">
          <v-list-tile-content>
            <v-list-tile-title>{{ key }}: {{ item }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader>ID</v-subheader>
        <v-list-tile>
          <v-list-tile-content>
            {{ $store.state.user.id || 'null' }}
          </v-list-tile-content>
        </v-list-tile>
      </v-flex>

      <v-divider/>

      <v-subheader>
        <b>Stats</b>
      </v-subheader>
      <v-flex xs12>
        <v-subheader>Connection Time</v-subheader>
        <v-list-tile>
          <v-list-tile-content>
            {{ $store.state.log.stats.connectionTime }}
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader>Page Visits</v-subheader>
        <v-list-tile v-for="(item, key, i) in $store.state.log.stats.pageVisits" :key="i">
          <v-list-tile-content>
            <v-list-tile-title>{{ key }}: {{ item }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader>Photos</v-subheader>
        <v-list-tile>
          <v-list-tile-content>
            Captured: {{ $store.state.log.stats.interactions.photo.captured }}
          </v-list-tile-content>
        </v-list-tile>
                <v-list-tile>
          <v-list-tile-content>
            Uploaded: {{ $store.state.log.stats.interactions.photo.uploaded }}
          </v-list-tile-content>
        </v-list-tile>
      </v-flex>

      <v-divider/>

      <v-subheader>
        <b>Timeline</b>
      </v-subheader>
      <v-flex xs12>
        <v-data-table 
          :headers="[ 
            { text: 'Type', sortable: false, value: 'type' },
            { text: 'Data', sortable: false, value: 'data' },
            { text: 'Timestamp', sortable: true, value: 'timestamp' }
          ]" 
          :items="$store.state.log.timeline" 
          hide-actions>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.type }}</td>
              <td>{{ props.item.data }}</td>
              <td>{{ props.item.timestamp.client }}</td>
            </template>
        </v-data-table>
      </v-flex>
    </v-list>
  </v-flex>
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
  methods: {},
  // component Lifecycle hooks
  beforeCreate () {},
  mounted () {}
}
</script>

<style scoped>
  
</style>