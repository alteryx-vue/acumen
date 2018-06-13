<template>
	
	<div>
          <v-btn flat small color="primary" to="/content">
            <v-icon class="mr-2">arrow_back</v-icon>
            Content Search
          </v-btn>

	      <v-card>
	        <v-card-title primary-title>
	          <div>
	            <h3 class="headline mb-3">{{ package.metaInfo.name }}</h3>
	            <div v-if="package.metaInfo.description == ''">No content description...</div>
	            <div v-else>{{ package.metaInfo.description }}</div>

				<v-data-table
				    :items="packageDetails"
				    class="elevation-0 mt-4"
				    hide-actions
				    hide-headers
				  >
				    <template slot="items" slot-scope="props">

				      <td class="subheading"><v-icon color="blue-grey lighten-2" class="mr-4">{{ props.item.icon }}</v-icon>{{ props.item.name }}</td>
				      <td v-if="props.item.name == 'Package Type'">
                        {{ props.item.desc }}

                        <v-btn flat small @click="getPackage(package.id, package.metaInfo.name)" class="ml-5 blue--text"><v-icon small class="mr-2">get_app</v-icon>Download</v-btn>

                      </td>
                      <td v-else-if="props.item.descExtra" class="light-blue--text text--darken-4">
                          {{ props.item.desc }}<span class="ml-4 grey--text">{{ props.item.descExtra }}</span>
                      </td>
                      <td v-else class="blue--text text--darken-4">{{ props.item.desc }}</td>

				    </template>
				  </v-data-table>

	          </div>
	        </v-card-title>

	      </v-card>

	</div>

</template>

<script>

var moment = require('moment')

  export default {
    name: 'Content',
    data () {
      return {
      }
    },
    computed: {
        contentId () {
            return this.$route.params.id
        },
        package () {
        	return this.$store.state.package
        },
        packageDetails () {

        	var p = this.$store.state.package

        	if (p.packageType == 1) {
        		var pType = 'Workflow'
        	} else if (p.packageType == 2) {
        		var pType = 'App'
        	} else if (p.packageType == 3) {
        		var pType = 'Macro'
        	} else if (p.packageType == 0) {
        		var pType = 'Alteryx Package'
        	} else {
        		var pType = 'Other'
        	}

        	if (p.public) { 
        		var avail = 'Public'
                var lockIcon = 'lock_open'
        	} else {
        		var avail = 'Private'
                var lockIcon = 'lock'
        	}

        	if (p.isChained) {
        		var chained = 'Yes'
                var chainIcon = 'link'
        	} else {
        		var chained = 'No'
                var chainIcon = 'link_off'
        	}

            var uploaded = moment(p.uploadDate).format('YYYY-MM-DD')
            var uploadedHuman = moment(p.uploadDate).fromNow()
            var lastRun = moment(p.lastRunDate).format('YYYY-MM-DD h:mm a')
            var lastRunHuman = moment(p.lastRunDate).fromNow()

        	return [
        	{name: 'Package Type',desc: pType, icon: 'card_giftcard'},
        	{name: 'Filename',desc: p.fileName, icon: 'attach_file'},
        	{name: 'Version',desc: p.publishedVersionNumber, icon: 'perm_device_information'},
        	{name: 'Owner',desc: p.publishedVersionOwner.firstName + ' ' + p.publishedVersionOwner.lastName, descExtra: p.publishedVersionOwner.email, icon: 'person'},
        	{name: 'Studio',desc: p.subscriptionName, icon: 'wallpaper'},
        	{name: 'Availability',desc: avail, icon: lockIcon},
        	{name: 'Uploaded',desc: uploaded, descExtra: uploadedHuman, icon: 'cloud_upload'},
        	{name: 'Last Run',desc: lastRun, descExtra: lastRunHuman, icon: 'refresh'},
        	{name: 'Run Count',desc: p.runCount, icon: 'timeline'},
        	{name: 'Chained App?',desc: chained, icon: chainIcon},
          ]
        }
    },
    mounted() {
      this.$gallery.getPackageInfo(this.$route.params.id)
    },
    methods: {
    	getPackage(appId, appName) {
        	this.$gallery.getPackage(appId, appName)
      	},
    }
  }
</script>