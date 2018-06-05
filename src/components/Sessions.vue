<template>

	<div>

      <div class="headline blue-grey--text">
        <v-layout row wrap>
          <v-flex xs6>
            Gallery Activity
            <v-btn
              flat
              small
              color="primary"
              :loading="sessions.loading"
              @click="loadSessions"
              :disabled="sessions.loading || sessions.data.length == 0"
              v-if="sessions.data.length > 0"
            >
              {{ actionText }}
              <v-icon right>cached</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs6 class="body-2 text-xs-right">
             Most recent sessions from<v-btn flat small color="primary" :href="gallery" target="_blank" class="mx-0">{{ gallery }}</v-btn>
          </v-flex>
        </v-layout>
      </div>

      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 sm6 lg3>
            <v-card color="light-blue darken-2 white--text" class="elevation-6">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs8>
                    <div class="headline">Last Hour</div>
                    <div class="mt-2">{{ sessions.hour.moment }} <v-icon small class="white--text">arrow_forward</v-icon></div>
                  </v-flex>
                  <v-flex xs4 class="text-xs-center lime--text text--lighten-3">
                    <p class="display-2 my-0 py-0">{{ sessions.hour.users }}</p>users
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 lg3>
            <v-card color="light-blue darken-2 white--text" class="elevation-6">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs8>
                    <div class="headline">Today</div>
                    <div class="mt-2">{{ sessions.today.moment }} <v-icon small class="white--text">arrow_forward</v-icon></div>
                  </v-flex>
                  <v-flex xs4 class="text-xs-center lime--text text--lighten-3">
                    <p class="display-2 my-0 py-0">{{ sessions.today.users }}</p>users
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 lg3>
            <v-card color="light-blue darken-2 white--text" class="elevation-6">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs8>
                    <div class="headline">Since Yesterday</div>
                    <div class="mt-2">{{ sessions.yesterday.moment }} <v-icon small class="white--text">arrow_forward</v-icon></div>
                  </v-flex>
                  <v-flex xs4 class="text-xs-center lime--text text--lighten-3">
                    <p class="display-2 my-0 py-0">{{ sessions.yesterday.users }}</p>users
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 lg3>
            <v-card color="light-blue darken-2 white--text" class="elevation-6">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs6>
                    <div class="headline">Last 7 Days</div>
                    <div class="mt-2">{{ sessions.seven.moment }} <v-icon small class="white--text">arrow_forward</v-icon></div>
                  </v-flex>
                  <v-flex xs3 class="text-xs-center lime--text text--lighten-3 pb-3">
                    <p class="display-1 py-0 mb-0">{{ sessions.seven.users }}</p>users
                  </v-flex>
                  <v-flex xs3 class="text-xs-center lime--text text--lighten-3">
                    <p class="display-1 py-0 mb-0">{{ sessions.seven.sessions }}</p>sessions
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

    <v-divider class="mt-2"></v-divider>

    <div class="headline mt-5 ml-4 grey--text text--lighten-1" v-if="sessions.data.length == 0">
      {{ sessionText }}
      <v-btn
          color="primary"
          :loading="sessions.loading"
          @click="loadSessions"
          :disabled="sessions.loading"
          :flat="sessions.loading"
        >
          {{ actionText }}
          <v-icon right>cached</v-icon>
        </v-btn>
    </div>

    <v-container fluid grid-list-md v-if="sessions.data.length > 0">
<v-layout row wrap>
        <v-flex xs12 md3>
          <v-select
            clearable
              :items="studios"
              v-model="search"
              label="Studio"
              single-line
              prepend-icon="perm_media"
            ></v-select>
        </v-flex>
            <v-flex xs12 md3>
          <v-select
            clearable
            :items="roles"
              v-model="search"
              label="Role"
              single-line
              prepend-icon="lock_outline"
            ></v-select>
        </v-flex>
            <v-flex xs12 md2>
          <v-select
            :items="sorts"
              v-model="pagination.sortBy"
              label="Sort"
              single-line
              prepend-icon="sort"
            ></v-select>
        </v-flex>
            <v-flex xs12 md1>
          <v-select
            :items="sortOrders"
              v-model="pagination.descending"
              label="Order"
              single-line
            ></v-select>
        </v-flex>
            <v-flex xs12 md3>
          <v-text-field
          clearable
            prepend-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
            class="mb-3"
          ></v-text-field>
        </v-flex>
       </v-layout>
        <v-data-iterator
          content-tag="v-layout"
          :loading="sessions.loading"
          row
          wrap
          :items="sessions.data"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          no-data-text="Session data hasn't been loaded yet..."
          :search="search"
        >
          <v-flex
            slot="item"
            slot-scope="props"
            xs12
            sm6
            lg4
            xl3
          >
            <v-card class="grey lighten-2 elevation-4">
              <v-card-title class="grey--text text--darken-3 title">{{ props.item.Name }}</v-card-title>
              <v-divider></v-divider>
              <v-list dense>
<!--                 <v-list-tile class="blue--text text--darken-3">
                    <span class="subheader mx-0 px-0">last seen&nbsp;</span><strong>{{ props.item.LastActive | moment("from", "now") }}</strong>
                </v-list-tile> -->
                <v-list-tile class="grey--text text--darken-1">
                    <v-icon small class="mr-2">perm_media</v-icon>
                    <strong>{{ props.item.Studio }}</strong>
                </v-list-tile>

                <v-list-tile>
                  <v-layout row wrap align-center>
                    <v-flex xs7 class="blue--text text--darken-3">
                      <v-icon small class="mr-1 blue--text text--darken-3">timeline</v-icon>
                      <strong>{{ props.item.LastActive | moment("from", "now") }}</strong>
                    </v-flex>
                    <v-flex xs5 class="text-xs-right">
                      <v-icon small class="mr-1" :class="roleClass(props.item.Role)">{{ roleIcon(props.item.Role) }}</v-icon>
                      <span :class="roleClass(props.item.Role)">{{ props.item.Role }}</span>
                    </v-flex>
                  </v-layout>
                </v-list-tile>
                

              </v-list>
            </v-card>
          </v-flex>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Sorry, no results for "{{ search }}"
          </v-alert>
        </v-data-iterator>
      </v-container>

  </div>

</template>

<script>

// import SeshChart from './charts/line-chart'

  export default {
    name: 'Sessions',
    // components: { SeshChart },
    data () {
      return {
        rowsPerPageItems: [4, 8, 12, 16, 20],
        pagination: {
          sortBy: 'LastActive',
          descending: true,
          rowsPerPage: 12
        },
        search: '',
        studio: null,
        sorts: [{text: 'Last Seen', value: 'LastActive'},
                {text: 'Name', value: 'Name'},
                {text: 'Studio', value: 'Studio'},
                {text: 'Join Date', value: 'Joined'}
          ],
        sortOrders: [{ text: 'Asc', value: false},
               { text: 'Desc', value: true}],
        gallery: this.$store.state.gallery
      }
    },
    computed: {
      sessions() {
        return {
          data: this.$store.state.sessions.data,
          seven: {
            users: this.$store.state.sessions.data.length,
            sessions: this.$store.state.sessions.data.reduce((agg, cur) => {
              return cur.SessionCount + agg
            },0),
            moment: this.$moment().startOf('day').subtract(7,'days').format("MMM D [at] h:mma")
          },
          yesterday: {
            users: this.$store.state.sessions.data.filter((s) => this.$moment(s.LastActive).isSameOrAfter(this.$moment().startOf('day').subtract(1,'days')) ).length,
            moment: this.$moment().startOf('day').subtract(1,'days').format("ddd [at] h:mma")
          },
          today: {
            users: this.$store.state.sessions.data.filter((s) => this.$moment(s.LastActive).isSameOrAfter(this.$moment().startOf('day')) ).length,
            moment: this.$moment().startOf('day').format("h:mma")
          },
          hour: {
            users: this.$store.state.sessions.data.filter((s) => this.$moment(s.LastActive).isSameOrAfter(this.$moment().subtract(1,'hours')) ).length,
            moment: this.$moment().subtract(1,'hours').format("h:mma")
          },
          loading: this.$store.state.sessions.loading
        }
      },
      roles() {
        return this.$gallery.divorce(this.$gallery.tally(this.$store.state.sessions.data,'Role')).keys
      },
      studios() {
        return this.$gallery.arrPairs(this.$gallery.tally(this.$store.state.sessions.data,'Studio')).filter(r => r.value > 1).map( r => { return r.name })
      },
      actionText() {
        return this.$store.state.sessions.data && this.$store.state.sessions.data.length > 0 ? 'refresh' : 'load sessions'
      },
      sessionText() {
        return this.$store.state.sessions.loading ? 'Loading session data...' : 'Session data currently empty...'
      }
    },
    methods: {
      loadSessions() {
        this.$gallery.getSessions()
      },
      roleClass(c) {

        switch(c) {
          case 'Curator':
            return 'red--text text--darken-3'
            break;
          case 'Artisan':
            return 'green--text text--darken-1'
            break;
          case 'Viewer':
            return 'light-blue--text text--darken-3'
            break;
          default:
            return 'grey--text text--lighten-1'
        }
      },
      roleIcon(c) {

        switch(c) {
          case 'Curator':
            return 'vpn_key'
            break;
          case 'Artisan':
            return 'brush'
            break;
          case 'Viewer':
            return 'visibility'
            break;
          default:
            return 'public'
        }
      }
    },
    mounted() {
      this.$gallery.getSessions()
    }
  }
</script>