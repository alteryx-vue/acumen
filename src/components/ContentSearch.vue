<template>

	<div>

		<div class="headline">Search Gallery Content</div>

			<v-container>
				<v-layout row wrap>
					<v-flex xs12 sm6 md4>
						<v-text-field @input="searchGallery" v-model="query" solo label="Search"></v-text-field>
					</v-flex>
				</v-layout>
			</v-container>

	    <v-data-table
		    :headers="headers"
		    :items="results"
		    :loading="searching"
		    :rows-per-page-items="rowsPerPage"
		    :search="query"
		    class="elevation-1"
		  >
		  <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
			<template slot="items" slot-scope="props">
			  <td>{{ props.item.name }}</td>
			  <td>{{ props.item.type }}</td>
			  <td>{{ props.item.owner }}</td>
			  <td>{{ props.item.studio }}</td>
			  <td>{{ props.item.uploaded }}</td>
			  <td class="justify-center layout px-0">
	          <v-btn icon class="mx-0" :to="'/content/' + props.item.id">
	            <v-icon color="blue-grey">exit_to_app</v-icon>
	          </v-btn>
	          <v-btn icon class="mx-0" @click="getPackage(props.item.id, props.item.name)">
	            <v-icon color="blue">get_app</v-icon>
	          </v-btn>
	        </td>
			</template>
			<template slot="no-data">
			  <v-alert :value="query.length > 3 && !searching" color="error">
			    No results for "{{ query }}"
			  </v-alert>
			  <v-alert :value="query.length < 4 && !searching" color="info">
			    Minimum of 4 characters.&nbsp;&nbsp;&nbsp;&nbsp;Underscores do not play well.&nbsp;&nbsp;&nbsp;&nbsp;Result limit = 50.
			  </v-alert>
			</template>
	    </v-data-table>

	</div>

</template>

<script>

var moment = require('moment')

  export default {
    name: 'ContentSearch',
    data () {
      return {
      	query: '',
      	headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: true,
            value: 'name'
          },
          {
            text: 'Type',
            align: 'left',
            sortable: true,
            value: 'type'
          },
          {
            text: 'Owner',
            align: 'left',
            sortable: true,
            value: 'owner'
          },
          {
            text: 'Studio',
            align: 'left',
            sortable: true,
            value: 'studio'
          },
          {
            text: 'Uploaded',
            align: 'left',
            sortable: true,
            value: 'uploaded'
          }
        ],
        rowsPerPage: [10,25,{"text":"All","value":50}]
      }
    },
    computed: {
    	results() {

    		if (this.$store.state.searchResults && this.query.length > 3) {
	    		return this.$store.state.searchResults.map(r => {
							var res = []
							
							res.name = r.metaInfo.name
							res.id = r.id

							if (r.metaInfo.description == '') {
								res.description = 'No description..'
							} else {
								res.description = r.metaInfo.description
							}

							if (r.packageType == 0) {
				        		res.type = 'App'
				        	} else if (r.packageType == 1) {
				        		res.type = 'Workflow'
				        	} else if (r.packageType == 2) {
				        		res.type = 'Macro'
				        	} else if (r.packageType == 3) {
				        		res.type = 'Alteryx Package'
				        	} else {
				        		res.type = 'Other'
				        	}

				        	res.uploaded = moment(r.uploadDate).format('YYYY-MM-DD')
				        	res.owner = r.publishedVersionOwner.firstName + ' ' + r.publishedVersionOwner.lastName
				        	res.studio = r.subscriptionName

							return res

						})
    		} else {
    			return []
    		}
    	},
    	searching() {
    		return this.$store.state.searching
    	}
    },
    mounted() {
  		// do something
    },
    methods: {
        searchGallery() {

        	if (this.query.length > 3) {
        		this.$store.commit('updateSearching', true)
        		this.$gallery.searchGallery(this.query)
        	} else {
        		this.$store.commit('clearSearchResults')
        		this.$store.commit('updateSearching', false) // right?
        	}

        },
        getPackage(appId, appName) {
        	this.$gallery.getPackage(appId, appName)
      	},
    },
  }
</script>