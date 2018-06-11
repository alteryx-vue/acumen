<template>

	<div>

      <div class="headline blue-grey--text">
        <v-layout row wrap>
          <v-flex xs6>
            Gallery Users
            <v-btn
              flat
              small
              color="primary"
              :loading="users.loading"
              @click="loadUsers"
              :disabled="users.loading || users.data.length == 0"
              v-if="users.data.length > 0"
            >
              {{ actionText }}
              <v-icon right>cached</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs6 class="body-2 text-xs-right">
             Gallery users from<v-btn flat small color="primary" :href="gallery" target="_blank" class="mx-0">{{ gallery }}</v-btn>
          </v-flex>
        </v-layout>
      </div>

    <v-container grid-list-md text-xs-center>
		<v-layout row wrap v-if="userRoles.labels.length > 0">
			<v-flex xs3>
				<v-card class="elevation-3 pa-3">
					<role-chart :data="userRoles" height="200" title="Users by Role"></role-chart>
				</v-card>
			</v-flex>
			<v-flex xs9>
				<v-card class="elevation-3 pa-3">
					<newbies-chart :data="newbies" height="200" title="New users by month (rolling year)"></newbies-chart>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>

    <div class="headline mt-5 ml-4 grey--text text--lighten-1" v-if="users.data.length == 0">
      {{ usersText }}
      <v-btn
          color="primary"
          :loading="users.loading"
          @click="loadUsers"
          :disabled="users.loading"
          :flat="users.loading"
        >
          {{ actionText }}
          <v-icon right>cached</v-icon>
        </v-btn>
    </div>

    <v-container fluid grid-list-md v-if="users.data.length > 0">
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
          :loading="users.loading"
          row
          wrap
          :items="users.data"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          no-data-text="User data hasn't been loaded yet..."
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
            <v-card class="grey lighten-2 elevation-1">
              <v-card-title class="grey--text text--darken-3 title">{{ props.item.Name }}</v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile class="grey--text text--darken-1">
                	<v-icon small class="mr-2">perm_media</v-icon>
                    <strong>{{ props.item.Studio }}</strong>
                </v-list-tile>
                <v-list-tile class="grey--text text--darken-2">
                  <v-layout row wrap align-center>
                  	<v-flex xs7>
                    	<v-icon class="mr-2">person_add</v-icon>
                    	<span class="body-1">{{ props.item.Joined | moment("MMMM Do, YYYY") }}</span>
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

import RoleChart from './charts/donut'
import NewbiesChart from './charts/line' 

  export default {
    name: 'Users',
    components: { RoleChart, NewbiesChart },
    data () {
      return {
        rowsPerPageItems: [4, 8, 12, 16, 20],
        pagination: {
          sortBy: 'Name',
          descending: false,
          rowsPerPage: 12
        },
        gallery: this.$store.state.gallery,
        search: '',
        studio: null,
        sorts: [{text: 'Name', value: 'Name'},
        		{text: 'Studio', value: 'Studio'},
        		{text: 'Join Date', value: 'Joined'}
        	],
        sortOrders: [{ text: 'Asc', value: false},
        			 { text: 'Desc', value: true}]
      }
    },
    computed: {
      users() {
        return {
          data: this.$store.state.users.data,
          loading: this.$store.state.users.loading
        }
      },
      studios() {
      	return this.$gallery.arrPairs(this.$gallery.tally(this.$store.state.users.data,'Studio')).filter(r => r.value > 1).map( r => { return r.name })
      },
      actionText() {
        return this.$store.state.users.data && this.$store.state.users.data.length > 0 ? 'refresh' : 'load users'
      },
      usersText() {
        return this.$store.state.users.loading ? 'Loading user data...' : 'User data currently empty...'
      },
      userRoles() {
    		  var agg = this.$gallery.tally(this.$store.state.users.data,'Role'),
    	    config = this.$gallery.divorce(agg),
    	    chartLabels = config.keys,
    	    chartData = config.vals,
    	    colorArr = []
    	    chartLabels.forEach(r => {
    	    	colorArr.push(this.roleColor(r))
    	    })
    	    var chartDatasets = [{ backgroundColor: colorArr,
    	          		  data: chartData,
    	        		}]
    		return { labels: chartLabels, datasets: chartDatasets }
      },
      roles() {
        return this.$gallery.divorce(this.$gallery.tally(this.$store.state.users.data,'Role')).keys
	    },
      newbies() {
  	    var newUsers = this.$store.state.users.data.filter(s => this.$moment(s.Joined).isSameOrAfter(this.$moment().startOf('month').subtract(11,'months'))),
  	    byMonth = newUsers.map( a => { 
  	    	return { 
  	    		joined: this.$moment(a.Joined).format("X"),
  	    		joinedLabel: this.$moment(a.Joined).format("MMM YYYY")
  	    	} 
  	    }),
  	    sorted = byMonth.sort((a, b) => a.joined - b.joined),
  	    agg = this.$gallery.tally(sorted, 'joinedLabel'),
  	    config = this.$gallery.divorce(agg),
  	    chartLabels = config.keys,
  	    chartData = config.vals,
  		  chartDatasets = [
  			   { label: 'New users', backgroundColor: 'rgba(63, 81, 181, 0.25)', borderColor: 'rgba(63, 81, 181, 0.8)', borderWidth: 1, data: chartData }
  		  ]
  		return { labels: chartLabels, datasets: chartDatasets }
	  }
    },
    methods: {
      loadUsers() {
        this.$gallery.getUsers()
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
      },
      roleColor(c) {
      	// console.log(c)
      	switch(c) {
      		case 'Curator':
      			return '#C62828'
      			break;
      		case 'Artisan':
      			return '#43A047'
      			break;
      		case 'Viewer':
      			return '#0277BD'
      			break;
      		default:
      			return '#BDBDBD'
      	}
      }
  	},
    mounted() {
      this.$gallery.getUsers()
    }
  }
</script>