<template>

	<div>

    <div class="headline blue-grey--text mb-3">
      <v-layout row wrap>
        <v-flex xs6>
          <span class="headline">Server/Gallery Jobs</span>
        </v-flex>
        <v-flex xs6 class="text-xs-right">
          <v-btn
            flat
            small
            color="primary"
            :loading="loadingJobs"
            @click="loadJobs(0)"
            :disabled="loadingJobs || jobsRefresh > 0"
            class="mt-2"
          >
            {{ actionText }}
            <v-icon right>cached</v-icon>
          </v-btn>
          <v-btn-toggle mandatory class="ml-3" v-model="jobsRefresh">
            <v-btn flat small value="0" :disabled="loadingJobs" @click="checkIntervals(0)">
              <span>Manual</span>
            </v-btn>
            <v-btn flat small value="30" :disabled="loadingJobs" @click="checkIntervals(30)">
              <span>30s</span>
              <v-icon small>access_time</v-icon>
            </v-btn>
            <v-btn flat small value="15" :disabled="loadingJobs" @click="checkIntervals(15)">
              <span>15s</span>
              <v-icon small>access_time</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-layout>
    </div>

    <v-progress-linear v-if="jobsRefresh > 0" :value="progress" height="2" color="grey" class="mb-0"></v-progress-linear>

    <hourly-jobs v-if="jobsByHour.datasets[0].data.length > 0" :data="jobsByHour" height="160" :options="chartOptions" class="mb-2"></hourly-jobs>

    <v-card class="mb-2">

      <v-list subheader>
        <v-subheader>Running</v-subheader>
        <v-data-iterator
          content-tag="v-layout"
          :loading="loadingJobs"
          row
          wrap
          :items="jobs.running"
          :no-data-text="noDataRunning"
          hide-actions
        >
          <v-flex
            slot="item"
            slot-scope="props"
            xs12
          >

              <v-list-tile :key="props.item.JobID" class="py-1">

                <v-list-tile-avatar tile>
                  <img :src="'data:image/jpeg;base64,' + props.item.Icon">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-container>
                    <v-layout row>
                      <v-flex xs6>
                       <v-list-tile-title class="light-blue--text text--darken-4">{{ props.item.AppName }}</v-list-tile-title>
                      </v-flex>
                      <v-flex xs2>
                        {{ humanStartTime(props.item.StartTime) }}
                      </v-flex>
                      <v-flex xs2>
                       {{ props.item.JobType }}
                      </v-flex>
                      <v-flex xs2>
                        {{ props.item.Status }}
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs6>
                        <v-list-tile-sub-title v-if="props.item.JobDesc != props.item.AppName">
                          {{ props.item.JobDesc }}
                        </v-list-tile-sub-title>
                      </v-flex>
                      <v-flex xs2>
                        <!-- Empty Space -->
                      </v-flex>
                      <v-flex xs2>
                        <v-list-tile-sub-title>
                          {{ props.item.User }}
                        </v-list-tile-sub-title>
                      </v-flex>
                      <v-flex xs2>
                        <v-list-tile-sub-title>
                          {{ runningHumanTime(props.item.StartTime,currentTime) }}
                        </v-list-tile-sub-title>
                      </v-flex>
                    </v-layout>
                </v-container>
                    
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon ripple loading class="grey--text">
                    <v-icon>cached</v-icon>
                  </v-btn>
                </v-list-tile-action>

              </v-list-tile>

              <v-divider v-if="(props.index + 1) < jobs.running.length"></v-divider>

          </v-flex>

        </v-data-iterator>

      </v-list>

    </v-card>

<v-layout row wrap v-if="jobs.complete.length > 0">
  <v-flex xs12 md3 class="px-1">
    <v-select
      clearable
        :items="jobTypes"
        v-model="search"
        label="Job Type"
        single-line
      ></v-select>
  </v-flex>
  <v-flex xs12 md3 class="px-1">
    <v-select
      clearable
      :items="resultTypes"
        v-model="search"
        label="Result Type"
        single-line
      ></v-select>
  </v-flex>
  <v-flex xs12 md2 class="px-1">
    <v-select
      :items="sorts"
        v-model="pagination.sortBy"
        label="Sort"
        single-line
        prepend-icon="sort"
      ></v-select>
  </v-flex>
  <v-flex xs12 md1 class="px-1">
    <v-select
      :items="sortOrders"
        v-model="pagination.descending"
        label="Order"
        single-line
      ></v-select>
  </v-flex>
  <v-flex xs12 md3 class="px-1">
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

    <v-card>

      <v-list subheader>
        <v-subheader>Complete - <b>&nbsp;{{ jobs.total }}&nbsp;</b> jobs run today, showing the most recent {{ jobs.complete.length }}</v-subheader>
        <v-data-iterator
          content-tag="v-layout"
          :loading="loadingJobs"
          row
          wrap
          :items="jobs.complete"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          :no-data-text="noDataComplete"
          :search="search"
        >
          <v-flex
            slot="item"
            slot-scope="props"
            xs12
          >

              <v-list-tile :key="props.item.JobID" class="py-1">

                <v-list-tile-avatar tile>
                  <img :src="'data:image/jpeg;base64,' + props.item.Icon">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-container>
                    <v-layout row>
                      <v-flex xs6>
                       <v-list-tile-title class="light-blue--text text--darken-4">{{ props.item.AppName }}</v-btn></v-list-tile-title>
                      </v-flex>
                      <v-flex xs2>
                        {{ humanStartTime(props.item.StartTime) }}
                      </v-flex>
                      <v-flex xs2>
                       {{ props.item.JobType }}
                      </v-flex>
                      <v-flex xs2>
                        <v-icon v-if="props.item.ResultCode == '2'" color="red" size="20">error</v-icon>
                        <v-icon v-else color="green" size="20">check_circle</v-icon>
                        {{ props.item.Status }}
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs6>
                        <v-list-tile-sub-title v-if="props.item.JobDesc != props.item.AppName">
                          {{ props.item.JobDesc }}
                        </v-list-tile-sub-title>
                      </v-flex>
                      <v-flex xs2>
                        <!-- Empty Space -->
                      </v-flex>
                      <v-flex xs2>
                        <v-list-tile-sub-title>
                          {{ props.item.User }}
                        </v-list-tile-sub-title>
                      </v-flex>
                      <v-flex xs2>
                        <v-list-tile-sub-title>
                          {{ staticHumanTime(props.item.ExecutionTime) }}
                        </v-list-tile-sub-title>
                      </v-flex>
                    </v-layout>
                </v-container>
                    
                </v-list-tile-content>

                <v-list-tile-action>
                    <v-menu bottom left>
                      <v-btn slot="activator" icon>
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                      <v-list>
                        <v-list-tile @click="getResultDetails(props.item)">
                          <v-list-tile-title><v-icon color="grey" class="mr-2">description</v-icon>Log</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile :to="'/content/' + props.item.GalleryAppID">
                          <v-list-tile-title><v-icon color="grey" class="mr-2">exit_to_app</v-icon>App Info</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="getPackage(props.item.GalleryAppID, props.item.AppName)">
                          <v-list-tile-title><v-icon color="grey" class="mr-2">get_app</v-icon>Download</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                </v-list-tile-action>

              </v-list-tile>

              <v-divider></v-divider>

          </v-flex>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Sorry, no results for "{{ search }}" jobs..
          </v-alert>
        </v-data-iterator>

      </v-list>

    </v-card>

  <!-- result modal -->
  <v-layout row justify-center>
    <v-dialog 
      v-model="jobResult.show"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card>
        <v-toolbar card dark color="primary">
            <v-btn icon dark @click.native="jobResult.show = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ jobResult.for }}</v-toolbar-title>
        </v-toolbar>
        <v-card-title class="headline">Output Log</v-card-title>
        <v-card-text>

        <v-data-iterator
          content-tag="v-layout"
          row
          wrap
          :items="resultDetails"
          no-data-text="No log.."
          hide-actions
        >
          <v-flex
            slot="item"
            slot-scope="props"
            xs12
          >
          <v-list-tile class="py-1">
            <v-list-tile-content>
                  
                  <v-container>
                    <v-layout row>
                      <v-flex xs12>
                       <v-list-tile-title>{{ props.item }}</v-list-tile-title>
                      </v-flex>
                    </v-layout>
                  </v-container>

              </v-list-tile-content>

          </v-list-tile>

        </v-flex>
        <v-divider></v-divider>
      </v-data-iterator>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat="flat" @click.native="jobResult.show = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>


	</div>

</template>

<script>
  var moment = require('moment')
  var humanizeDuration = require('humanize-duration')
  import HourlyJobs from './charts/bar'

  export default {
    name: 'Jobs',
    components: { HourlyJobs },
    data () {
      return {
        mongoAppId: this.$store.state.mongodb.app,
        currentTime: null,
        startEd: humanizeDuration(12000),
        progressCount: 0,
        rowsPerPageItems: [15, 20, 25, 50],
        pagination: {
          sortBy: 'EndTime',
          descending: true,
          rowsPerPage: 20
        },
        search: '',
        sorts: [{text: 'Chronological', value: 'EndTime'},
                {text: 'App Name', value: 'AppName'},
                {text: 'User', value: 'User'},
                {text: 'Execution Time', value: 'ExecutionTime'}
          ],
        sortOrders: [{ text: 'Asc', value: false},
               { text: 'Desc', value: true}],
        jobTypes: ['Gallery Schedule','Controller Schedule','Manual','Validation'],
        resultTypes: ['Successful','Error','Corrupted'],
        jobResult: {
          show: false,
          for: null,
          user: null,
          runTime: null,
          startTime: null,
          endTime: null
        },
        chartOptions: {
          responsive: true, 
          maintainAspectRatio: false, 
          legend: { 
            display: false
          },
          title: {
            display: true,
            text: 'Jobs by Hour'
          },
          animation: {
            animateScale: true
          },
          scales: {
              xAxes: [{
                gridLines: { display: false },
                barPercentage: 0.25
              }],
          }
        }
      }
    },
    computed: {
      jobsByHour() {
        return {
          labels: ['12a', '1a', '2a', '3a', 
                   '4a', '5a', '6a', '7a',
                   '8a', '9a', '10a', '11a',
                   '12p', '1p','2p','3p',
                  '4p','5p','6p','7p',
                  '8p','9p','10p','11p'],
          datasets: [
            {
              label: 'Jobs',
              backgroundColor: 'rgba(239, 108, 0, .25)',
              borderColor: '#E65100',
              borderWidth: 1,
              borderSkipped: 'top',
              data: this.$store.state.jobs.hourly
            }
          ]
        }
      },
      jobs() {
        return {
          running: this.$store.state.jobs.data.filter((m) => m.GalleryAppID !== this.mongoAppId && m.Status == 'Running'),
          complete: this.$store.state.jobs.data.filter((m) => m.Status !== 'Running'),
          total: this.$store.state.jobs.total
        }
      },
      loadingJobs() {
        return this.$store.state.jobs.loading
      },
      noDataRunning() {
        return this.$store.state.jobs.loading ? 'Loading...' : 'Nothing currently running...'
      },
      noDataComplete() {
        return this.$store.state.jobs.loading ? 'Loading...' : 'No jobs yet today...'
      },
      jobsText() {
        return this.$store.state.jobs.loading ? 'Loading jobs...' : 'Jobs are not currently loaded...'
      },
      actionText() {
        return this.$store.state.jobs.data && this.$store.state.jobs.data.length > 0 ? 'refresh' : 'load jobs'
      },
      jobsRefresh: {
        get () {
          return this.$store.state.jobs.refreshrate
        },
        set (value) {
          this.$store.commit('updateRefreshRate', value)
        }
      },
      progress(){
        return (this.progressCount / (this.jobsRefresh * 4)) * 100
      },
      resultDetails(){
        if (this.$store.state.jobResult.log) {
          return this.$store.state.jobResult.log.replace('[','').replace(']','').replace('\"', '').split('__jSplit__')
        } else {
          return null
        }
      }
    },
    mounted() {
      // this.$gallery.getJobs()
      this.$store.state.jobs.data && this.$store.state.jobs.data.length > 0 ? console.log('Jobs already loaded') : this.$gallery.getJobs()
      this.currentTime = moment().valueOf()
      this.theMoment = setInterval(() => this.updateCurrentTime(), 1 * 1000)
      this.checkIntervals(parseInt(this.$store.state.jobs.refreshrate))
    },
    methods: {
      getPackage(appId, appName) {
        this.$gallery.getPackage(appId, appName)
      },
      loadJobs(x) {
        this.$gallery.getJobs()
        if (x > 0) { this.progressCount = 0 }
      },
      getResultDetails(job){
        // console.log('Getting results for ' + job)
        this.$gallery.getResult(job.JobID)
        this.jobResult.for = job.AppName
        this.jobResult.user = job.User
        this.jobResult.runTime = this.staticHumanTime(job.ExecutionTime)
        this.jobResult.startTime = this.humanStartTime(job.StartTime)
        this.jobResult.endTime = this.humanStartTime(job.EndTime)
        this.jobResult.show = true

      },
      runningHumanTime(fixed, current) {
        return humanizeDuration((current - moment(fixed).valueOf()), { round: true })
      },
      staticHumanTime(time) {
        return humanizeDuration(time * 1000, { round: true })
      },
      humanStartTime(t) {
        return moment(t).format('h:mm a')
      },
      updateCurrentTime() {
        this.currentTime = moment().valueOf()
      },
      checkIntervals(seconds) {
          var self = this
          var ms = seconds * 1000
          if (this.theRefresh) {
            window.clearInterval(this.theRefresh)
            if (ms > 0) {
              this.loadJobs(0)
              this.resetProgress()
              this.theRefresh = setInterval(() => this.loadJobs(1), ms)
            }
          } else {
            if (ms > 0) {
              this.loadJobs(0)
              this.resetProgress()
              this.theRefresh = setInterval(() => this.loadJobs(1), ms)
            }
          }
      },
      resetProgress() {
        var self = this
        if (this.theProgress) {
          window.clearInterval(this.theProgress)
        }
        this.progressCount = 0
        this.theProgress = setInterval(() => this.progressCount ++, 250)
      }
    },
    beforeRouteLeave (to, from , next) {
      window.clearInterval(this.theRefresh)
      window.clearInterval(this.theProgress)
      window.clearInterval(this.theMoment)
      next()
    }

  }
</script>