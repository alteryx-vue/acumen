<template>

	<div>

		<v-jumbotron
		    gradient="to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)"
		    src="/public/material2.jpg"
		    dark
		  >
			<v-container fill-height>
			  <v-layout align-center>
			    <v-flex>
			      <h3 class="display-3">Alteryx Acumen</h3>
			      <span class="title">Alteryx Acumen is a server admin tool that provides insights about Gallery users, jobs, content &amp; more</span>
			      <v-divider class="my-3"></v-divider>
			      <!-- <div class="title mb-3">This demo is connected to a public gallery running in Google Cloud</div> -->
			      <v-btn large color="primary" class="mx-0" to="/users">See more</v-btn>
			    </v-flex>
			  </v-layout>
			</v-container>
		</v-jumbotron>

		<v-expansion-panel>
			<v-expansion-panel-content value="true">
			  <div slot="header" class="headline">Background</div>
			  <v-card>
			    <v-card-text>
			    	Alteryx Acumen was a project submission at the inaugural <a href="https://www.alteryx.com/inspire-2018/" target="_blank">Alteryx Inspire</a> day-long hackthon, known as <a href="https://community.alteryx.com/t5/Inspire-2018-Buzz/Alteryx-BUILD-Details/td-p/155043" target="_blank">Alteryx BUILD</a>.  That being said, let's be perfectly clear:  Alteryx Acumen <strong>is not an official Alteryx Product</strong>.
			    	<!-- <v-divider class="my-2"></v-divider> -->
			    	<br><br>
			    	The project was developed specifically for Alteryx server/gallery administrators and aims to provide deeper insights into user activity, job execution, job schedules, gallery content and more.  The application is still a work in progress and, with amazing new features in 2018.3 around the corner, will likely not have much support going forward.  Alteryx truly is the best at listening to their customers and while our project became obsolete in almost 24 hours (sighs, laughter), we had a blast at the hackathon and learned countless lessons.
			    </v-card-text>
			  </v-card>
			</v-expansion-panel-content>
			<v-expansion-panel-content>
			  <div slot="header" class="headline">Architecture</div>
			  <v-card>
			    <v-card-text>
			    	<div class="subheading mb-2 amber--text text--darken-4">The Web Application</div>
			    	The [this] web application was developed using <a href="https://vuejs.org" target="_blank">Vue.js</a> and <a href="https://vuetifyjs.com" target="_blank">Vuetify</a>.  The app is serverless and can therefore be installed/run anywhere while easily connecting to any gallery when providing the proper <router-link to="/settings">Settings</router-link>.
			    	<v-divider class="my-3"></v-divider>
			    	<div class="subheading mb-2 amber--text text--darken-4">The Alteryx Gallery</div>
			    	The demo Alteryx Gallery at <a href="https://alteryxacumen.rocks/gallery" target="_blank">AlteryxAcumen.rocks/gallery</a> is running on a Windows Server 2012R on the <a href="https://cloud.google.com" target="_blank">Google Cloud Platform</a>.  The cloud VM is a 4vcpu x 16GB memory with a single 100GB solid state disk *
			    	<div class="mt-2 grey--text">* disk size not recommended for production environments</div>
			    	<v-divider class="my-3"></v-divider>
			    	<div class="subheading mb-2 amber--text text--darken-4">The Process Flow</div>
			    	The Gallery and Server's underlying Mongo Database is full of rich data - some of which seldom gets "floated" to the Gallery's UI.  That's where Alteryx Acumen comes in handy...
			    	<div class="my-2"></div>
			    	We began by developing and publishing the <a href="https://gallery.alteryx.com/#!app/Alteryx-MongoDB-API-App/5b1563a9826fd306ecb2a8ac" target="_blank">Alteryx MongoDB API App</a> to our demo gallery.  This Alteryx Application utilizes the MongoDB input tool and API Output to, you guessed it, "float" this rich data through the <a href="https://alteryxacumen.rocks/gallery/api-docs/" target="_blank">Gallery APIs</a> and into this web application.
			    	<div class="mt-2 subheader">A basic order of operations:</div>
			    	 <v-container class="mt-0 pt-0">
			    	 	<ol>
				    	 	<li>
				    	 		The web application calls <code>https://alteryxacumen.rocks/gallery/api/v1/workflows/{mongoAppId}/jobs/</code> to execute our MongoDB API App
				    	 	</li>
				    	 	<li>
				    	 		Using the returned <b>Job ID</b>, begin polling <code>https://alteryxacumen.rocks/gallery/api/v1/jobs/{jobId}/</code> until the job is complete. Usually ~ 2 seconds..
				    	 	</li>
				    	 	<li>
				    	 		When the job is complete, the data is available via the 'messages' array within the response.  From there, it's parsed and placed in our <a href="https://vuex.vuejs.org/" target="_blank">vuex</a> data store before being used to [re]render our UI components (update the application display)
				    	 	</li>
			    	 	</ol>
			    	 </v-container>
			    </v-card-text>
			  </v-card>
			</v-expansion-panel-content>
			<v-expansion-panel-content>
			  <div slot="header" class="headline">Sources</div>
			  <v-card>
			    <v-card-text>
			    	Help yourself to the source code on GitHub and be sure to check out the Alteryx Vue.js resources.
			    	  <div class="mt-3">
					    <v-btn outline color="black" href="https://github.com/alteryx-vue/acumen" target="_blank">Alteryx Acumen Project</v-btn>
					    <v-btn outline color="indigo" href="https://github.com/alteryx-vue" target="_blank">Alteryx Vue.js GitHub Org</v-btn>
					  </div>
			    </v-card-text>
			  </v-card>
			</v-expansion-panel-content>
			<v-expansion-panel-content>
			  <div slot="header" class="headline">Contact</div>
			  <v-card>
			    <v-card-text>


				<v-layout align-center row spacer>
		          <v-flex xs6>
		            <v-avatar
		              slot="activator"
		              size="48px"
		              class="mr-3"
		            >
		              <img
		                src="/public/taylor.png"
		                alt=""
		              >
		            </v-avatar>
		            <span class="grey--text text--darken-2"><strong>Taylor Cox</strong>&nbsp;&mdash;&nbsp;Developer, Blue Cross Blue Shield NC</span>
		          </v-flex>
		          <v-flex
		          	xs6
		            class="light-blue--text text--darken-3"
		            ellipsis
		          >
		            <a href="mailto:taylorcox.dev@gmail.com">taylorcox.dev@gmail.com</a>
		          </v-flex>
		        </v-layout>

			    	
			    </v-card-text>
			  </v-card>
			</v-expansion-panel-content>
		</v-expansion-panel>

	</div>

</template>

<script>
  export default {
    name: 'Overview',
    data () {
      return {
      }
    }
  }
</script>